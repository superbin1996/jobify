import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { BadRequestError, NotFoundError } from "../errors/index.js"
import Job from "../models/Job.js"
import checkPermissions from "../utils/checkPermissions.js"
import moment from "moment"

// Async funcs because it will connect with db
const createJob = async (request, response) => {
  const { position, company } = request.body
  if (!position || !company) {
    throw new BadRequestError(`Please provide all values`)
  }
  // userId is defined in auth.js
  request.body.createdBy = request.user.userId
  const job = await Job.create(request.body)
  response.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (request, response) => {
  const { search, status, jobType, sort } = request.query
  const queryObject = {
    createdBy: request.user.userId
  }

  if (status && status !== 'all') {
    queryObject.status = status
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }

  // no await
  let result = Job.find(queryObject)

  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }
  if (sort === 'latest') {
    result = result.sort('-updatedAt')
  }
  if (sort === 'oldest') {
    result = result.sort('updatedAt')
  }

  const page = Number(request.query.page) || 1
  const limit = Number(request.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  response.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
    numOfPages,
  })
}

const updateJob = async (request, response) => {
  const { id: jobId } = request.params
  const { company, position } = request.body
  if (!company || !position) {
    throw new BadRequestError(`Please provide all values`)
  }
  const job = await Job.findOne({ _id: jobId })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  // check permissions
  checkPermissions(request.user, job.createdBy)

  const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, request.body, {
    new: true,
    runValidators: true,
  })

  response.status(StatusCodes.OK).json({ updatedJob })
}

const deleteJob = async (request, response) => {
  const { id: jobId } = request.params
  const job = await Job.findOne({ _id: jobId })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }

  // check permissions
  checkPermissions(request.user, job.createdBy)

  await job.remove()

  response.status(StatusCodes.OK).json({ msg: `Success! Job removed` })
}

const showStats = async (request, response) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(request.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(request.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$updatedAt',
          },
          month: {
            $month: '$updatedAt',
          }
        },
        count: { $sum: 1 },
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])

  monthlyApplications = monthlyApplications.map(item => {
    const { _id: { year, month }, count } = item
    const date = moment().month(month - 1).year(year).format('MMM Y')
    return {
      date,
      count
    }
  }).reverse()

  response.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }