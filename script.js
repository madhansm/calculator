let numberButtons = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let displayBox = document.getElementById('displayBox');
let resultBox = document.getElementById('resultBox');
let equals = document.getElementById('equals');
let plusMinus = document.getElementById('plusMinus');
let allClear = document.getElementById('ac');
let decimal = document.getElementById('decimal');
let displayOperator = document.getElementById('operatorBox');

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
        case '+':
            rN += (+displayNum);
            break;
        case '-': //have to fix minus bug
            rN -= (+displayNum);
            break;
        case '*':
            rN *= (+displayNum);
            break;
        case '/':
            rN /= (+displayNum);
            break;
        case '%':
            rN = (rN * (+displayNum))/100;
            break;
    }
    return rN;
}

function clickOperator() {
    console.log(operatorPressedPast);
    operatorPressedPresent = this.id;
    

    if (resultNum === '') {
        resultNum = (+displayNum);
        operatorPressedPast = this.id;        
    } else if (displayNum === '') {
        operatorPressedPast = operatorPressedPresent;

    } else {
        
        resultNum = calculate(resultNum);
        operatorPressedPast = operatorPressedPresent;
    }

    displayOperator.innerHTML='';
    displayOperator.append(operatorPressedPast);

    displayBox.innerHTML='';
    displayNum = '';
    
    resultBox.innerHTML='';
    resultBox.append(resultNum);
    
}

function clickedEqual() {//have to fix no resultbox equal
    if (resultNum === '' || operatorPressedPast == undefined) {
        console.log(operatorPressedPast);
        resultNum = displayNum;
        displayBox.innerHTML='';
        displayNum = '';
        resultBox.innerHTML = '';
        resultBox.append(resultNum);
    } else {
        resultNum = calculate(resultNum);
        displayBox.innerHTML = '';
        displayNum = '';

        resultBox.innerHTML = '';
        resultBox.append(resultNum);
    }
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

    displayOperator.innerHTML='';    
}

function insertDecimal() { //have to fix empty decimal str pass
    let tempArray = displayNum.split('');
    let decimalCheck = tempArray.some(function(item){
        if(item === '.'){
            console.log('not');
            return true;
        } else {
            return false;

        }
    })
    if(!decimalCheck) {
        console.log('here');
        displayNum += '.';
        displayBox.innerHTML = '';
        displayBox.append(displayNum);
        console.log(displayNum);
    }
}

operators.forEach(operator => operator.addEventListener('click', clickOperator));

numberButtons.forEach(buttons => buttons.addEventListener('click', clickNum));

equals.addEventListener('click', clickedEqual);

plusMinus.addEventListener('click',makeNegative);

allClear.addEventListener('click', clearAll);

decimal.addEventListener('click', insertDecimal);