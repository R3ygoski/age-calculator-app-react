import DateInput from './components/DateInput';
import ArrowIcon from './assets/images/icon-arrow.svg'
import { useState } from 'react';
import Result from './components/Result';

let dayResult = '--'
let monthResult = '--'
let yearResult = '--'

const month31Days = ['1', '3', '5', '7', '8', '10', '12']
const month30Days = ['4', '6', '9', '11']

const february = '2'

const submitHandler = (event) => {
  event.preventDefault()
}

export default function App() {

  // States
  const [dayValue, setDayValue] = useState('')
  const [monthValue, setMonthValue] = useState('')
  const [yearValue, setYearValue] = useState('')
  
  // Error States
  const [dayError, setDayError] = useState('')
  const [monthError, setMonthError] = useState('')
  const [yearError, setYearError] = useState('')

  // Date Validation
  const dayChecker = () => {
    let isValid

    if (dayValue.length===0){
      setDayError('Must not be empty')
      isValid = false
    } else if (dayValue.length>2 || dayValue > 31 || dayValue < 1){
      setDayError('Must be a valid date')
      isValid = false
    } else {
      setDayError('')
      isValid = true
    }

    return isValid
  }
  const monthChecker = () => {
    let isValid

    if (monthValue.length===0){
      setMonthError('Must not be empty')
      isValid = false
    } else if (monthValue > 12 || monthValue < 1){
      setMonthError('Must be a valid date')
      isValid = false
    } else {
      setMonthError('')
      isValid = true
    }

    return isValid
  }
  const yearChecker = () => {
    let isValid

    if (yearValue.length===0){
      setYearError('Must not be empty')
      isValid = false
    } else if (yearValue > new Date().getFullYear()){
      setYearError('Must be in the past')
      isValid = false
    } else if (yearValue == new Date().getFullYear() && monthValue > new Date().getMonth() + 1 || yearValue == new Date().getFullYear() && monthValue == new Date().getMonth() + 1 && dayValue > new Date().getDate()) {
      setYearError('Must be in the past')
      setMonthError('Must be in the past')
      setDayError('Must be in the past')
      isValid = false
    } else if (yearValue < 1) {
      setYearError('Must be a valid date')
      isValid = false
    } else {
      setYearError('')
      isValid = true
    }

    return isValid
  }
  const dayMonthChecker = () => {
    let isValid = true

    if (monthValue === february){
      if (dayValue === '30' || dayValue === '31' || (dayValue === '29' && yearValue % 4 !== 0)) {
        setDayError('Must be a valid date')
        isValid = false
      }
    } else if (month31Days.includes(monthValue) && dayValue > 31){
      setDayError('Must be a valid date')
      isValid = false
    } else if (month30Days.includes(monthValue) && dayValue > 30){
      setDayError('Must be a valid date')
      isValid = false
    } else {
      setDayError('')
      isValid = true
    }

    return isValid
  }
  
  // Error Handler
  const errorHandler = () => {
    if (dayChecker() && monthChecker() && yearChecker() && dayMonthChecker()) {
      return true
    } else {
      return false
    }
  }

  // Click Handler
  const clickHandler = () => {
    if (errorHandler()) {
    const currentDay = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
  
    dayResult = currentDay - Number(dayValue)
    monthResult = currentMonth - Number(monthValue)
    yearResult = currentYear - Number(yearValue)
    if (dayResult < 0){
      dayResult += 30
      monthResult -= 1
    }
    if (monthResult < 0){
      monthResult += 12
      yearResult -= 1
    }
    setDayValue('')
    setMonthValue('')
    setYearValue('')
    }
  }

  return (
    <main className="card">
      <form className="card__form">
        <DateInput dateType="day" 
        state={dayValue} setState={setDayValue} 
        err={dayError} setErr={setDayError}/>

        <DateInput dateType="month" 
        state={monthValue} setState={setMonthValue} 
        err={monthError} setErr={setMonthError}/>

        <DateInput dateType="year" 
        state={yearValue} setState={setYearValue} 
        err={yearError} setErr={setYearError}/>

        <button type="submit" onClick={(e) => {submitHandler(e);clickHandler()}}>
          <img src={ArrowIcon} alt="Arrow Icon"/>
        </button>
      </form>
      <section className='card__date'>
        <Result result={yearResult} 
        singular={'year'} plural={'years'}/>

        <Result result={monthResult} 
        singular={'month'} plural={'months'}/>

        <Result result={dayResult} 
        singular={'day'} plural={'days'}/>
      </section>
    </main>
  )
}