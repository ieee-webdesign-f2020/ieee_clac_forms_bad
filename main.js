const inputField = document.getElementById('form');
const submitButt = document.getElementById('submit');
const resetButt = document.getElementById('reset');
inputField.value = null;

function calculate() {
    userInput = inputField.value;
    console.log(userInput);
    var firstNum;
    var secondNum;
    var firstNumIndex;
    var operator;
    for (var i = 0; i < userInput.length; i++) {
        if (userInput[i] === ' ') {
            console.log(userInput.slice(0, i));
            firstNum = userInput.slice(0, i);
            firstNumIndex = i;
            break;
        }
    }
    var validOperator = true;
    if (firstNum) {
        operator = userInput[firstNumIndex + 1];
        switch (operator) {
            case '+':
                console.log("plus");
                break;
            case '-':
                console.log("minus");
                break;
            case 'x':
                console.log("times");
                break;
            case '/':
                console.log("divide");
                break;
            default:
                alert("Invalid operator. Shame on you.");
                validOperator = false;
        }
    }
    if (validOperator) {
        if (userInput[firstNumIndex + 2] !== ' ') {
            alert("Missing space after operator.");
        }
        else {
            var newStartIndex = firstNumIndex + 3;
            if (userInput[newStartIndex] === ' ') {
                alert("Too many spaces after operator.");
            }
            else {
                for (var i = userInput[newStartIndex]; i < userInput.length; i++) {
                    if (userInput[i] === ' ') {
                        console.log(userInput.slice(newStartIndex, userInput.length));
                        secondNum = userInput.slice(newStartIndex, userInput.length);
                        break;
                    }
                }
            }
        }
    }
    if (firstNum && secondNum) {
        var result;
        var num1 = parseInt(firstNum);
        var num2 = parseInt(secondNum);
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case 'x':
                result = num1 * num2;
                break;
            case '/':
                if (num2 === 0) {
                    alert("Cannot divide by zero.")
                }
                else {
                    result = num1 / num2;
                }
                break;
        }
        alert("Your answer is " + result);
    }
}

function reset() {
    inputField.value = null;
}

submitButt.addEventListener('click', calculate);
resetButt.addEventListener('click', reset);