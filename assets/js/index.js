let _;(function () {
  const getResult = document.getElementById("getResult");
  const date = new Date();
  let year, month, day, age, seconds, minutes, hours, days, months, years;
  let result = {
    year: "--",
    months: "--",
    day: "--"
  }
  function getAge() {
    const yearInput = document.getElementById("year");
    const yearsResult = document.getElementById("years");
    const monthInput = document.getElementById("month");
    const monthsResult = document.getElementById("months");
    const dayInput = document.getElementById("day");
    const daysResult = document.getElementById("days");
    const inputs = Array.from(document.querySelectorAll(".input"));
    function notEmpty() {
      inputs.forEach(input => {
      if (input.value.trim().length == 0) {
        input.ariaInvalid = true;
        input.nextElementSibling.innerHTML = "This field is required";
        input.parentElement.classList.add("err");
      } else if (isNaN(parseInt(input.value))) {
        input.ariaInvalid = true;
        input.nextElementSibling.innerHTML = "Please enter number";
        input.parentElement.classList.add("err");
      } else {
        input.ariaInvalid = false;
        input.nextElementSibling.innerHTML = "This field is required";
        input.parentElement.classList.remove("err");
      }
      });
      if (!inputs.some(input => input.parentElement.classList.contains("err"))) return true;
    }
    function isYear() {
      if (parseInt(yearInput.value) < date.getFullYear()) return true;
    }
    function isMonth() {
      if (parseInt(monthInput.value) >= 1 && parseInt(monthInput.value) <= 12) return true;
    }
    function isDay() {
      if (parseInt(dayInput.value) >= 1 && parseInt(dayInput.value) <= 31 && parseInt(monthInput.value) != 4) return true;
      if (parseInt(dayInput.value) >= 1 && parseInt(dayInput.value) <= 30 && parseInt(monthInput.value) == 4) return true;
    }
    function showResult() {
      for (let i =0; i <= result.year; i++) {
        setTimeout(function () {
          yearsResult.innerHTML = i.toString().length == 2 ? i : `0${i}`;
        }, Math.floor((1000 / result.year) * i));
      }
      for (let i =0; i <= result.month; i++) {
        setTimeout(function () {
          monthsResult.innerHTML = i.toString().length == 2 ? i : `0${i}`;
        }, Math.floor((1000 / result.month) * i));
      }
      for (let i =0; i <= result.day; i++) {
        setTimeout(function () {
          daysResult.innerHTML = i.toString().length == 2 ? i : `0${i}`;
        }, Math.floor((1000 / result.day) * i));
      }
    }
    if (notEmpty()) {
      if (isYear()) {
        yearInput.ariaInvalid = false;
        yearInput.nextElementSibling.innerHTML = "This field is required";
        yearInput.parentElement.classList.remove("err");
        year = parseInt(yearInput.value);
      } else {
        yearInput.ariaInvalid = true;
        yearInput.nextElementSibling.innerHTML = "Must be in the past";
        yearInput.parentElement.classList.add("err");
      }
      if (isMonth()) {
        monthInput.ariaInvalid = false;
        monthInput.nextElementSibling.innerHTML = "This field is required";
        monthInput.parentElement.classList.remove("err");
        month = parseInt(monthInput.value);
      } else {
        monthInput.ariaInvalid = true;
        monthInput.nextElementSibling.innerHTML = "Must be a valid month";
        monthInput.parentElement.classList.add("err");
      }
      if (isDay()) {
        dayInput.ariaInvalid = false;
        dayInput.nextElementSibling.innerHTML = "This field is required";
        dayInput.parentElement.classList.remove("err");
        day = parseInt(dayInput.value);
      } else {
        dayInput.ariaInvalid = true;
        dayInput.nextElementSibling.innerHTML = "Must be a valid day";
        dayInput.parentElement.classList.add("err");
      }
      if (year != undefined && month != undefined && day != undefined && inputs.every(inp => !inp.parentElement.classList.contains("err") ? true : false)) {
        age = date.getTime() - new Date(`${month}/${day}/${year}`).getTime();
        seconds = Math.floor(age / 1000);
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);
        months = Math.floor(days / 30.4375);
        years = Math.floor(months / 12);
        result.year = years;
        result.month = Math.floor(months % 12);
        result.day = Math.floor(days % 30.4375);
      } else {
        return false;
      }
    }
    showResult();
  }



  getResult.addEventListener("click", getAge);
})();
