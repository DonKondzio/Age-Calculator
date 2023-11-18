const allInputs = document.querySelectorAll(".input");
const dayInput = document.querySelector(".input-day");
const monthInput = document.querySelector(".input-month");
const yearInput = document.querySelector(".input-year");
const arrowBtn = document.querySelector(".arrow-btn");
const yearsNumberSpan = document.querySelector(".years-number");
const monthsNumberSpan = document.querySelector(".months-number");
const daysNumberSpan = document.querySelector(".days-number");

let date;
let birthDate;
let maxDayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const handleCalc = () => {
  displayAge();
  if (checkIfNotEmpty()) {
    checkLeapYear();
    checkMonth();
    setDate();
    if (checkIfInThePast()) {
      calcAge();
    }
  }
};

const checkIfNotEmpty = () => {
  let flag = true;
  allInputs.forEach((input) => {
    if (!input.value) {
      input.parentElement.classList.add("error");
      input.nextElementSibling.textContent = "This field is required";
      flag = false;
    } else {
      input.parentElement.classList.remove("error");
    }
  });
  return flag;
};

const checkLeapYear = () => {
  if (yearInput.value % 4 === 0) {
    maxDayArr[1] = 29;
  } else {
    maxDayArr[1] = 28;
  }
};

const checkMonth = () => {
  monthInput.parentElement.classList.remove("error");

  if (+monthInput.value >= 1 && +monthInput.value <= 12) {
    return;
  } else {
    monthInput.parentElement.classList.add("error");
    monthInput.nextElementSibling.textContent = "Must be a valid month";
  }
};

const checkDay = () => {
  dayInput.parentElement.classList.remove("error");
  let maxDayValue = maxDayArr[+monthInput.value - 1];
  if (!maxDayValue) maxDayValue = 31;

  if (+dayInput.value >= 1 && +dayInput.value <= maxDayValue) {
    return;
  } else {
    dayInput.parentElement.classList.add("error");
    dayInput.nextElementSibling.textContent = "Must be a valid day";
  }
};

const setDate = () => {
  date = new Date();
};

const checkIfInThePast = () => {
  if (date.getFullYear() < yearInput.value) {
    yearInput.parentElement.classList.add("error");
    yearInput.nextElementSibling.textContent = "Must be in the past";
    console.log(date.getFullYear());
    console.log(yearInput.value);
  } else if (
    date.getFullYear() == yearInput.value &&
    date.getMonth() + 1 < monthInput.value
  ) {
    monthInput.parentElement.classList.add("error");
    monthInput.nextElementSibling.textContent = "Must be in the past";
  } else if (
    date.getFullYear() == yearInput.value &&
    date.getMonth() + 1 == monthInput.value &&
    date.getDate() <= dayInput.value
  ) {
    dayInput.parentElement.classList.add("error");
    dayInput.nextElementSibling.textContent = "Must be in the past";
  } else {
    return true;
  }
};

const calcAge = () => {
  birthDate = new Date(
    `${yearInput.value}-${monthInput.value}-${dayInput.value}`
  );

  const fullDaysNum = Math.floor(Math.abs(date - birthDate) / 1000 / 3600 / 24);
  const yearsNumber = Math.floor(fullDaysNum / 365.25);
  let monthsNumber = Math.floor((fullDaysNum - yearsNumber * 365.25) / 30.4375);
  let daysNumber = Math.floor(
    fullDaysNum - yearsNumber * 365.25 - monthsNumber * 30.4375
  );
  displayAge(yearsNumber, monthsNumber, daysNumber);
};

const displayAge = (years = "--", months = "--", days = "--") => {
  yearsNumberSpan.textContent = years;
  monthsNumberSpan.textContent = months;
  daysNumberSpan.textContent = days;
};

const forceTwoDigits = (e) => {
  if (e.target.value.length === 1)
    e.target.value = e.target.value.padStart(2, "0");
};

arrowBtn.addEventListener("click", handleCalc);

monthInput.addEventListener("change", forceTwoDigits);
dayInput.addEventListener("change", forceTwoDigits);
