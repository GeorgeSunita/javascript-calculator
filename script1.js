const currentInput = document.querySelector("#currentInput");
const previousInput = document.querySelector("#previousInput");
const decimalButton = document.querySelector(".decimal");

let prevNumber = null;
let currNumber = null;
let result = null;
let operator = "";

const keys = document.querySelector(".keys");
keys.addEventListener("click", (e) => {
  const { target } = e; //destructuring of event object

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
  }

  if (target.classList.contains("decimal")) {
    handleDecimal(target.value);
  }

  if (target.classList.contains("equal")) {
    handleEqual(target.value);
  }

  if (target.classList.contains("num")) {
    inputDigit(target.value);
  }
  if (target.classList.contains("all-clear")) {
    resetCalculator(target.value);
  }

  if (target.classList.contains("delete-button")) {
    deleteNum(target.value);
  }
});

const inputDigit = (number) => {
  currentInput.textContent += number;
  currNumber = parseFloat(currentInput.textContent);
  return currNumber;
};

const handleDecimal = (value) => {
  if (value === ".") {
    currentInput.textContent += ".";
    decimalButton.disabled = true;
    if (currentInput.textContent === ".") {
      currentInput.textContent = 0 + currentInput.textContent;
    }
  }
};
const handleOperator = (value) => {
  decimalButton.disabled = false;
  if (!prevNumber) {
    prevNumber = currNumber;
    currNumber = null;
  }
  previousInput.textContent = prevNumber + value;
  currentInput.textContent = "";
  if (!operator) {
    operator = value;
  } else {
    handleEqual();
  }
};
const handleEqual = (value) => {
  result = getResult(currNumber, prevNumber, operator);
  previousInput.textContent = parseFloat(result.toFixed(8));
  prevNumber = result;
  currNumber = null;
  currentInput.textContent = "";
};

const getResult = (currNumber, prevNumber, value) => {
  console.log(value);
  console.log(currNumber);
  console.log(prevNumber);
  if (value === "+") {
    return prevNumber + currNumber;
  } else if (value === "-") {
    return prevNumber - currNumber;
  } else if (value === "*") {
    return currNumber * prevNumber;
  } else if (value === "/") {
    if (currNumber === 0) {
      previousInput.textContent = "cannot divide by 0";
      return null;
    }
    return prevNumber / currNumber;
  }
  return prevNumber;
};

const resetCalculator = (value) => {
  prevNumber = null;
  currNumber = null;
  result = null;
  operator = "";
  currentInput.textContent = "";
  previousInput.textContent = "";
  decimalButton.disabled = false;
};

const deleteNum = () => {
  currentInput.textContent = currentInput.textContent.slice(0, -1);
  if (!currentInput.textContent.includes(".")) {
    decimalButton.disabled = false;
  }
};
