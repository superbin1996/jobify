// Async funcs because it will connect with db
const createJob = async (request, response)=>{
  response.send(`create job`)
}

const deleteJob = async (request, response)=>{
  response.send(`delete job`)
}

const getAllJobs = async (request, response)=>{
  response.send(`get all jobs`)
}

const updateJob = async (request, response)=>{
  response.send(`update job`)
}

const showStats = async (request, response)=>{
  response.send(`show stats`)
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}