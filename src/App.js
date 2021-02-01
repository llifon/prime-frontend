import Header from './components/Header.js'
import PrimeSubmission from './components/PrimeSubmission'
import Pagination from './components/Pagination.js'
import Table from './components/Table.js'

import { useState, useEffect } from 'react'

const App = () => {

  const [primeNumbers, setPrimeNumbers] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [maxPages, setMaxPages] = useState(1)
  const [primeInputText, setPrimeInputText] = useState('')
  const [recentPrimeInput, setRecentPrimeInput] = useState('')
  const [validationText, setValidationText] = useState('')
  const [maxPrime, setMaxPrime] = useState(1)

  useEffect( async() => {
    // Fetch data from the server
    const maxFetch = async () => {

      const res = await fetch(`http://localhost:8080/max`)
      const data = await res.json()
      setMaxPrime(data.max)
      return data.max
    }

    maxFetch()
  }, [])

  // Fetch data from the server
  const serverFetch = async ({ number, pageNumber }) => {

    const res = await fetch(`http://localhost:8080/prime-range?from=2&to=${Math.floor(number)}&page=${pageNumber - 1}&size=80`)
    const data = await res.json()

    setRecentPrimeInput(number)
    setPrimeNumbers(data.primeNumbers)
    setMaxPages(data.pagination.totalPages)

    return data
  }



  // Validate the user's number request
  const validateUserRequest = ({ primeInputText }) => {

    if (isNaN(primeInputText)) {
      return "Input is not a valid number"
    }

    if (primeInputText < 2) {
      return "Value must be >= 2 (the first primary number)"
    }

    if (primeInputText > maxPrime)
    {
      return "This service only supports prime up-to " + maxPrime
    }

    return "" // No error message to show
  }

  // The FORM submit behaviour for the 'generate' button
  const handleGenerateSubmit = (e) => {

    e.preventDefault()

    const validationOutput = validateUserRequest({ primeInputText: primeInputText })
    setValidationText(validationOutput)

    if (!validationOutput) {
      setRecentPrimeInput(primeInputText)
      setPageNumber(1)
      serverFetch({ number: primeInputText, pageNumber: 1 })
    }
    else {
      setPrimeInputText('')
    }
  }

  // The FORM submit behaviour for the 'PAGE' input
  const handlePageNumberSubmit = (e, customPageNumber) => {

    e.preventDefault()

    if (!customPageNumber) {
      customPageNumber = pageNumber
    }

    serverFetch({ number: recentPrimeInput, pageNumber: customPageNumber })
  }


  // The useState update action for page - blocks bad input
  const setPageNumberAction = (e) => {

    const number = parseInt(e)
    if (number === 0 || number > maxPages) {
      return
    }

    setPageNumber(e)
  }


  return (
    <div className="container">

      <Header
        title="Prime Generator"
        description="Need to know about all the prime numbers which exist upto a given number? Great, just enter a number into the box below and we'll take care of finding them..." />

      <PrimeSubmission
        validationText={validationText}
        submitInput={handleGenerateSubmit}
        setPrimeInputText={setPrimeInputText}
        primeInputText={primeInputText} />

      {primeNumbers.length > 0 &&
        <>
          <Table
            primeNumbers={primeNumbers}
            colourPatterns={['#c9c9c9', '#f2f2f2']} />

          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumberAction}
            totalPages={maxPages}
            submitInput={handlePageNumberSubmit} />
        </>
      }

    </div>
  );
}

export default App;
