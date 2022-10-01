import { FormRow, FormRowSelect, Alert} from '../../components/index.js'
import { useAppContext } from '../../context/appContext.js'
import Wrapper from '../../assets/wrappers/DashboardFormPage.js'

const AddJob = () => {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    statusOptions,
    handleChange, 
    clearValues,
    createJob,
    isEditing,
    editJob,
  } = useAppContext()

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if(isEditing){
      editJob()
      return
    }
    createJob()
  }

  return (
    <Wrapper>
      {/* position */}
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert></Alert>}
        <div className='form-center'>
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job type */}
          <FormRowSelect 
            name='status' 
            labelText='job type'
            handleChange={handleJobInput} 
            list={statusOptions}
          />
          {/* job status */}

          <div className="btn-container">
            <button className='btn btn-block-submit-btn' type='submit' onClick={handleSubmit}>
              submit
            </button>
            <button className='btn btn-block-submit-btn' onClick={(e)=>{e.preventDefault();clearValues()}}>
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob