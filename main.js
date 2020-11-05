const inputField = document.getElementById('form');
const submitButt = document.getElementById('submit');
const resetButt = document.getElementById('reset');
const resultText = document.getElementById('result');
inputField.value = null;

function isNumber(input) { 
    for (var i = 0; i < 10; i++) {
        //console.log("Testing if "+input+" is the number "+i);
        if (i === parseInt(input)) {
            return true;
        }
    }
    return false;
}
function isOperator(input) {
    switch (input) {
        case '+':
            return true;
        case '-':
            return true;
        case 'x':
            return true;
        case '/':
            return true;
        default:
            return false;
    }
}
function reset() {
    inputField.value = null;
    resultText.innerHTML = "";
}

// Returns false if last element in array is a number.
// Returns true if array has no elements or if last element is an operator.
function expectingNumber(array) { 
    if (array.length > 0) {
        if (!isOperator(array[array.length - 1])) {
            return false;
        }
    }
    return true;
}
// Prints useful messages.
function debugLastNum(array) {
    var q = "Is last nums element a number? ";
    if (array.length === 0) {
        return q + "No, nums is empty.";
    }
    else if (expectingNumber(array)) {
        return q + "No, last element is operator " + array[array.length - 1];
    }
    else {
        return q + "Yes, last element is number " + array[array.length - 1];
    }
}

function calculate() {
    userInput = inputField.value + ' ';
    console.log("User input: "+userInput);
    var nums = new Array;
    var tempNum = "";
    for (var i = 0; i < userInput.length; i++) {
        console.log(">>Reached character " + userInput[i]);
        if (isNumber(userInput[i])) {
            console.log(debugLastNum(nums));
            if (expectingNumber(nums)) {
                tempNum += userInput[i];
                console.log("updated tempnum: " + tempNum);
            }
            else {
                alert("ERROR: Expecting operator.");
                reset();
                break;
            }
        }
        else {
            if (tempNum.length > 0) {
                console.log("Pushing tempNum to nums.");
                nums.push(tempNum);
                console.log(nums);
                tempNum = "";
            } 
            else {
                console.log("tempNum empty. Not pushing anything to nums.");
            }

            if (isOperator(userInput[i])) {
                console.log(debugLastNum(nums));
                if (!expectingNumber(nums)) {
                    console.log("Pushing operator to nums.");
                    console.log(nums);
                    nums.push(userInput[i]);
                    
                }
                else {
                    alert("ERROR: Expecting number.");
                    reset();
                    break;
                }
            }
            else if (userInput[i] === ' ') {
                console.log(debugLastNum(nums));
            }
            else {
                alert("ERROR: Invalid character detected.");
                reset();
                break;
            }
        }
    }
    if (nums.length > 1) {
        for (var i = 0; i < nums.length; i++) {
            var pos = i;
            var calc = 0;
            if (nums[i] === 'x') {
                calc = Number([i - 1]) * Number(nums[i  + 1]);
                console.log(nums[i - 1] + " x " + nums[i  + 1] + " is " + calc);
                nums.splice(i, 2);
                nums[pos - 1] = calc;
                console.log(nums);
                i = 0;
            }
            else if (nums[i] === '/') {
                calc = Number(nums[i - 1]) / Number(nums[i  + 1]);
                console.log(nums[i - 1] + " / " + nums[i  + 1] + " is " + calc);
                nums.splice(i, 2);
                nums[pos - 1] = calc;
                console.log(nums);
                i = 0;
            }
        }
    
        for (var i = 0; i < nums.length; i++) {
            var pos = i;
            var calc = 0;
            if (nums[i] === '+') {
                calc = Number(nums[i - 1]) + Number(nums[i  + 1]);
                console.log(nums[i - 1] + " + " + nums[i  + 1] + " is " + calc);
                nums.splice(i, 2);
                nums[pos - 1] = calc;
                console.log(nums);
                i = 0;
            }
            else if (nums[i] === '-') {
                calc = Number(nums[i - 1]) - Number(nums[i  + 1]);
                console.log(nums[i - 1] + " - " + nums[i  + 1] + " is " + calc);
                nums.splice(i, 2);
                nums[pos - 1] = calc;
                console.log(nums);
                i = 0;
            }
        }
        resultText.innerHTML = "Your result is: " + nums[0];
    }
    else {
        alert("ERROR: Not enough numbers.");
        reset();
    }
}
submitButt.addEventListener('click', calculate);
resetButt.addEventListener('click', reset);