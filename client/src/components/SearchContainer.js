import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters,
  } = useAppContext()

  const handleSearch = (e) => {
    if (isLoading) return
    handleChange({ name: e.target.name, value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <FormRow
            type='text'
            labelText={'search'}
            name='search'
            value={search}
            handleChange={handleSearch}
          ></FormRow>
          <FormRowSelect
            type='text'
            labelText={'type'}
            name='searchType'
            value={searchType}
            list={['all', ...jobTypeOptions]}
            handleChange={handleSearch}
          ></FormRowSelect>
          <FormRowSelect
            type='text'
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            list={['all', ...statusOptions]}
            handleChange={handleSearch}
          ></FormRowSelect>
          <FormRowSelect
            type='text'
            labelText={'sort'}
            name='sort'
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          ></FormRowSelect>
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer