
import { useState, useEffect } from 'react'

const PrimeSubmission = ({ primeInputText, setPrimeInputText, submitInput, validationText }) => {

    const [buttonEnabled, setButtonEnabled] = useState(false)
    const [buttonStyle, setButtonStyle] = useState('generate-form-btn btn-block')

    // Track user input to determine whether or not the button should be enabled
    useEffect(() => {

        if (!primeInputText) {
            setButtonEnabled(false)
            return
        }

        if (!primeInputText.replace(/\s/g, '').length) {
            setButtonEnabled(false)
            return
        }

        setButtonEnabled(true)
    }, [primeInputText])

    // Track button state to apply correct enabled/disabled appearance
    useEffect(() => {
        setButtonStyle(buttonEnabled ? 'generate-form-btn btn-block' : 'generate-form-btn btn-block disabled-button')
    }, [buttonEnabled])


    return (
        <form className='prime-form' onSubmit={submitInput}>
            <div className='generate-form'>
                <input type='text' value={primeInputText} onChange={(e) => setPrimeInputText(e.target.value)} />
            </div>

            <input type='submit' value='Generate' className={buttonStyle} disabled={!buttonEnabled} />

            <label className={!validationText ? 'hidden' : 'prime-form-error'}>{validationText}</label>
        </form>
    )
}

PrimeSubmission.defaultProps = {
    initialValue: 100
}


export default PrimeSubmission


