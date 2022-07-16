'use strict'
//SELECTION
const inputYourDate = document.querySelector('.input__birth__date')
const displayYourDate = document.querySelector('.birth__date')
const inputFutureDate = document.querySelector('.input__future__date')
const displayFutureAge = document.querySelector('.future__age')
const currentAge = document.querySelector('.current__age')
const futureYear = document.querySelector('.future__year')
const alertBirth = document.querySelector('.alert__birth__date')
const alertFuture = document.querySelector('.alert__future__date')
const futurePassed = document.querySelector('.future__day')
const birthPassed = document.querySelector('.birth__day')
const check = document.querySelector('.cbirth')
const checkf = document.querySelector('.cfuture')
const form = document.getElementById('form')

class Age {
  #curDate = new Date()
  #birthDay

  constructor() {
    form.addEventListener('submit', this._checkResults.bind(this))
    inputYourDate.addEventListener('change', this._checkValid.bind(this))
    inputFutureDate.addEventListener(
      'change',
      this._checkValidFuture.bind(this)
    )
    this._daysBetweenDate(new Date(2022, 6, 15), new Date(2022, 6, 17))
  }

  _intlDate(date) {
    const options = {
      weekday: 'short',
      day: 'numeric',
      year: 'numeric',
      month: 'short',
    }
    const formDate = new Intl.DateTimeFormat('en-EN', options).format(date)
    return formDate
  }
  _checkValid() {
    if (
      this._dateIsValid(new Date(inputYourDate.value)) &&
      new Date(inputYourDate.value).getFullYear() < this.#curDate.getFullYear()
    ) {
      check.classList.add('check__valid__true')
      check.classList.remove('check__valid__false')
    } else {
      check.classList.remove('check__valid__true')
      check.classList.add('check__valid__false')
    }
  }
  _checkValidFuture() {
    if (
      this._dateIsValid(new Date(inputFutureDate.value)) &&
      new Date(inputFutureDate.value).getFullYear() >
        this.#curDate.getFullYear()
    ) {
      checkf.classList.add('check__valid__true')
      checkf.classList.remove('check__valid__false')
    } else {
      checkf.classList.remove('check__valid__true')
      checkf.classList.add('check__valid__false')
    }
  }

  _dateIsValid(date) {
    return date instanceof Date && !isNaN(date)
  }

  _calcAge() {
    if (this._dateIsValid(new Date(inputYourDate.value))) {
      const birthDate = new Date(inputYourDate.value)
      this.#birthDay = birthDate

      if (birthDate.getFullYear() >= this.#curDate.getFullYear())
        alertBirth.classList.remove('alert__error__hide')
      alertBirth.textContent = `Error birth year must be below ${this.#curDate.getFullYear()}🤦‍♂️`

      if (this.#curDate.getFullYear() <= birthDate.getFullYear()) return

      const yourAge = Math.abs(
        this.#curDate.getFullYear() - birthDate.getFullYear()
      )

      currentAge.textContent = `${yourAge} ${
        yourAge > 1 ? 'Yrs old' : 'Yr old'
      }`
      birthPassed.textContent = this._daysBetweenDate(this.#curDate, birthDate)
      alertBirth.classList.add('alert__error__hide')
      displayYourDate.textContent = `${this._intlDate(this.#birthDay)}`
    }
  }

  _calcFutureAge() {
    if (this._dateIsValid(new Date(inputFutureDate.value))) {
      const futurDate = new Date(inputFutureDate.value)

      if (futurDate.getFullYear() > this.#curDate.getFullYear()) {
        futureYear.textContent = `in ${futurDate.getFullYear()}`
        const futureAge = Math.abs(
          futurDate.getFullYear() - this.#birthDay.getFullYear()
        )
        displayFutureAge.textContent = `${futureAge} ${
          futureAge > 1 ? 'Yrs old' : 'Yr old'
        }`
        alertFuture.classList.add('alert__error__hide')
        futurePassed.textContent = this._daysBetweenDate(
          futurDate,
          this.#birthDay
        )
      } else {
        alertFuture.classList.remove('alert__error__hide')
        alertFuture.textContent = `Error the future year must be high than ${this.#curDate.getFullYear()}🤦‍♂️`
      }
    }
  }
  _daysBetweenDate(date1, date2) {
    const month = Math.trunc(
      Math.abs(
        date2.getMonth() -
          date1.getMonth() +
          12 * (date2.getFullYear() - date1.getFullYear())
      )
    )
    const days = Math.trunc(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)))
    const hours = Math.trunc(Math.abs((date1 - date2) / (1000 * 60 * 60)))
    // const secs = Math.trunc(Math.abs((date1 - date2) / (1000 * 60)))

    return `${month} ${month > 1 ? 'Months' : 'Month'} - ${days} ${
      days > 1 ? 'Days' : 'Day'
    } - ${hours} HOURS      ⚡LIVED`
  }

  _checkResults(e) {
    e.preventDefault()
    this._calcAge()
    this._calcFutureAge()
  }
}

const myApp = new Age()
