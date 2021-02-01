
import * as ALL from 'react-icons/fa'

const Pagination = ({ pageNumber, setPageNumber, totalPages, submitInput  }) => {

    const changePage = (e, change) => {
        
        const shift = parseInt(change)
        if (shift < 0 && pageNumber <= 1)
        {
            return
        }

        if (shift > 0 && pageNumber >= totalPages)
        {
            return
        }

        setPageNumber(pageNumber + shift)
        submitInput(e, pageNumber + shift) // hacky since useState set isn't immediately triggering
    }

    return (
        <form className='prime-form' onSubmit={submitInput} >

            <div className='pagination-control'>
                <ALL.FaArrowLeft style={{ color: 'grey', cursor: 'pointer', margin: '10px' }} onClick={(e) => changePage(e, -1)} />
                <label >Page </label>
                <input type='text' width="100" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} />
                <label >of {totalPages}</label>
                <ALL.FaArrowRight style={{ color: 'grey', cursor: 'pointer', margin: '10px' }} onClick={(e) => changePage(e, 1)} />
            </div>

        </form>

    )
}

export default Pagination
