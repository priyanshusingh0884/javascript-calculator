const input = document.getElementById("input")
const numberButtons = document.querySelectorAll(".number")
const operatorButtons = document.querySelectorAll(".operator")
let firstNumber;
let operator;
let justCalculated = false;

function calculate(a, operator, b) {
    if (operator === "+") {
        return a + b
    }
    else if (operator === "-") {
        return a - b
    }
    else if (operator === "x") {
        return a * b
    }
    else if (operator === "/") {
        if (b === 0) {
            return "Cannot divide by 0"
        }
        return a / b
    }
    return "Invalid operator"
}

function resetCalculator() {
    input.value = ""
    firstNumber = undefined
    operator = undefined
    justCalculated = false
}


numberButtons.forEach(element => {
    element.addEventListener("click", () => {
        if (input.value === "Cannot divide by 0" ||
            input.value === "Invalid operator" ||
            input.value === "NaN") {
            resetCalculator()
        }

        if (element.textContent === ".") {
            if (input.value.includes(".")) {
                return
            }

            if (justCalculated) {
                input.value = "0."
                justCalculated = false
            }
            else if (input.value === "") {
                input.value += "0."
                justCalculated = false
            }
            else {
                input.value += "."
            }
            return
        }

        if (justCalculated) {
            input.value = element.textContent;
            justCalculated = false;
        }
        else {
            input.value += element.textContent;
        }
    })
});

operatorButtons.forEach(element => {
    element.addEventListener("click", () => {
        if (firstNumber === undefined) {
            firstNumber = Number(input.value)
            operator = element.textContent
            input.value = ""
        }
        else if (input.value === "") {
            operator = element.textContent
        }
        else {
            const secondNumber = Number(input.value)
            let result = calculate(firstNumber, operator, secondNumber)
            if (result === "Cannot divide by 0") {
                input.value = result
                return
            }
            justCalculated = false
            firstNumber = result
            operator = element.textContent
            input.value = ""

        }
    })
})


const equal = document.querySelector(".equal")
equal.addEventListener("click", () => {
    if (input.value === "") {
        return
    }
    const secondNumber = Number(input.value)
    if (firstNumber === undefined || operator === undefined) {
        return
    }
    let result = calculate(firstNumber, operator, secondNumber)
    if (result === "Cannot divide by 0") {
        input.value = result
        return
    }
    justCalculated = true;
    input.value = result
    firstNumber = undefined
    operator = undefined
})


const clear = document.querySelector(".clear")
clear.addEventListener("click", () => {
    resetCalculator()
})

const backspace = document.querySelector(".backspace")
backspace.addEventListener("click", () => {
    input.value = input.value.slice(0, -1)
})

const percentage = document.querySelector(".percentage")
percentage.addEventListener("click", () => {
    let result;
    if (operator === "+" || operator === "-") {
        result = firstNumber * Number(input.value) / 100
        input.value = result
    }
    else if (operator === "x" || operator === "/") {
        result = Number(input.value) / 100
        input.value = result
    }
    else {
        result = Number(input.value) / 100
        input.value = result
    }
    justCalculated = true;
})

document.addEventListener("keydown", (event) => {
    numberButtons.forEach(element => {
        if (event.key === element.textContent) {
            element.click()
        }
    });

    operatorButtons.forEach(element => {
        if (event.key === element.textContent || (event.key === "*" && element.textContent === "x")) {
            element.click()
        }
    });

    if (event.key === equal.textContent) {
        equal.click()
    }

    if (event.key === "Backspace") {
        event.preventDefault();
        backspace.click()
    }

    if (event.key === "Escape") {
        clear.click()
    }

    if (event.key === percentage.textContent) {
        percentage.click()
    }

    if (event.key === "Enter") {
        event.preventDefault();
        equal.click();
    }
});
