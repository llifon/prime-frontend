import Header from './components/Header.js'
import PrimeSubmission from './components/PrimeSubmission'

import { useState, useEffect } from 'react'

const App = () => {

  const [primeInputText, setPrimeInputText] = useState('')
  const [validationText, setValidationText] = useState('')

  // Fetch Task
  const fetchTask = async ({ number, pageNumber }) => {

    const res = await fetch(`http://localhost:8080/prime-range?from=2&to=${Math.floor(number)}&page=${pageNumber - 1}&size=80`)
    const data = await res.json()

    return data
  }

  const validateUserRequest = ({ primeInputText }) => {

    if (isNaN(primeInputText)) {
      return "Input is not a valid number"
    }

    if (primeInputText < 2) {
      return "Value must be >= 2 (the first primary number)"
    }

    return "" // No error message to show
  }

  const handleGenerateSubmit = (e) => {

    e.preventDefault()

    const validationOutput = validateUserRequest({ primeInputText: primeInputText })
    setValidationText(validationOutput)

    if (!validationOutput) {
      fetchTask({ number: primeInputText, pageNumber: 1 })
    }
    else {
      setPrimeInputText('')
    }
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

    </div>
  );
}

export default App;
