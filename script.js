let numberButtons = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let displayBox = document.getElementById('displayBox');
let resultBox = document.getElementById('resultBox');
let equals = document.getElementById('equals');
let plusMinus = document.getElementById('plusMinus');
let allClear = document.getElementById('ac');

let displayNum = '';
let operatorPressedPast, operatorPressedPresent = '';

let resultNum = '';

function clickNum() {
    let tempNum = this.textContent;
    displayNum += tempNum;
    
    displayBox.innerHTML='';
    displayBox.append(displayNum);

}

function calculate(rN) {

    switch (operatorPressedPast) {
        case 'sum':
            rN += +displayNum;
            break;
        case 'subtract':
            rN -= +displayNum;
            break;
        case 'multiply':
            rN *= +displayNum;
            break;
        case 'divide':
            rN /= +displayNum;
            break;
        case 'percent':
            rN = (rN * +displayNum)/100;
            break;
    }
    return rN;
}

function clickOperator() {
    operatorPressedPresent = this.id;
    if (resultNum === '') {
        resultNum = +displayNum;
        operatorPressedPast = this.id;        
    } else {
        
        resultNum = calculate(resultNum);
        operatorPressedPast = operatorPressedPresent;
    }

    displayBox.innerHTML='';
    displayNum = '';
    
    resultBox.innerHTML='';
    resultBox.append(resultNum);
    
}

function clickedEqual() {
    resultNum = calculate(resultNum);
    displayBox.innerHTML='';
    displayNum = '';
    
    resultBox.innerHTML='';
    resultBox.append(resultNum);
}

function makeNegative() {
    if (displayNum === '') displayNum = resultNum.toString();
    resultNum = '';
    let displayArray = displayNum.split('');
    
    if (displayArray[0] === '-') {
        displayArray.shift();
        
    } else {
        displayArray.unshift('-');
    }
    displayNum = displayArray.join('');
    displayBox.innerHTML='';
    displayBox.append(displayNum);
}

function clearAll() {
    displayBox.innerHTML='';
    displayNum = '';
    
    resultBox.innerHTML='';
    resultNum = '';
}

operators.forEach(operator => operator.addEventListener('click', clickOperator));

numberButtons.forEach(buttons => buttons.addEventListener('click', clickNum));

equals.addEventListener('click', clickedEqual);

plusMinus.addEventListener('click',makeNegative);

allClear.addEventListener('click', clearAll);