let numberButtons = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let displayBox = document.getElementById('displayBox');
let resultBox = document.getElementById('resultBox');
let equals = document.querySelector('.equals');
let plusMinus = document.querySelector('.plusMinus');
let allClear = document.querySelector('.ac');
let decimal = document.getElementById('decimal');
let displayOperator = document.getElementById('operatorBox');

let displayNum = '', resultNum = '';
let operatorPressedPast = '', operatorPressedPresent = '';

let buttonAnimation = document.querySelectorAll('button')

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
        case '-':
            rN = rN - +displayNum;
            break;
        case '*':
            rN *= (+displayNum);
            break;
        case '/':
            if (+displayNum === 0) alert ("Oops! Cannot divide by 0");
            else rN /= (+displayNum);
            break;
        case '%':
            rN = (rN * (+displayNum))/100;
            break;
    }
    rN = Math.floor(rN*1000)/1000;
    return rN;
}

function clickOperator() {
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

function clickedEqual() {
    if (resultNum === '' || operatorPressedPast == undefined) {
        resultNum = displayNum;
        displayBox.innerHTML='';
        displayNum = '';
        resultBox.innerHTML = '';
        resultBox.append(resultNum);
    } else {
        resultNum = calculate(+resultNum);
        displayBox.innerHTML = '';
        displayNum = '';
        resultBox.innerHTML = '';
        resultBox.append(resultNum);
    }
}

function makeNegative() {
    if (displayNum === '') {
        displayNum = resultNum.toString();
        resultNum = '';
        resultBox.append(resultNum);
    }
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

function insertDecimal() { 
    let tempArray = displayNum.split('');
    let decimalCheck = tempArray.some(function(item){
        if(item === '.'){
            return true;
        } else {
            return false;
        }
    })
    if(!decimalCheck) {
        if (displayNum === '') {displayNum += '0.';}
        else {displayNum += '.';}
        displayBox.innerHTML = '';
        displayBox.append(displayNum);
    }
}

function animateButton() {
    this.classList.add('animate');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('animate');
}

operators.forEach(operator => operator.addEventListener('click', clickOperator));
numberButtons.forEach(buttons => buttons.addEventListener('click', clickNum));
equals.addEventListener('click', clickedEqual);
plusMinus.addEventListener('click',makeNegative);
allClear.addEventListener('click', clearAll);
decimal.addEventListener('click', insertDecimal);
buttonAnimation.forEach(button => button.addEventListener('click', animateButton));
buttonAnimation.forEach(button => button.addEventListener('transitionend', removeTransition));

