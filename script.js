let num1= null
let operator =null
let num2 = null;
let displayValue = "";
const display = document.querySelector("#display p");

function operate(num1, num2, operator){
    if(operator == '+'){
        return add(num1, num2)
    }
    if(operator == '-'){
        return subtract(num1, num2)
    }
    if(operator == '*'){
        return multiply(num1, num2)
    }
    if(operator == '/'){
        return divide(num1, num2)
    }
}

drawCalc();


const numbers = document.querySelectorAll(".number");
for(let num of numbers){
    num.addEventListener("click", ()=>{
        displayValue += +num.textContent;
        display.textContent = displayValue
        console.log(displayValue);
    })
}
const operators = document.querySelectorAll(".operator");
for(let op of operators){
    op.addEventListener("click", ()=>{
        if(num1 === null){
            num1 = +displayValue;
            displayValue = ""
            operator = op.textContent;

        }
        else{
            num2 = +displayValue;
            let result = calculateNDisplayResult();
            num1 = result; 
            operator = op.textContent;

        }
    })

}
const equal = document.querySelector("#equal");
equal.addEventListener("click", ()=>{
    calculateNDisplayResult();
})
const ac = document.querySelector("#all-clear")
ac.addEventListener("click", ()=>{
    num1 = null
    num2 = null
    operator = null
    displayValue = ""
    display.textContent = "0";
})

const decimal = document.querySelector("#decimal")
decimal.addEventListener("click", ()=>{
    if(displayValue.includes(".")){
        return;
    }
    displayValue += ".";
    display.textContent = displayValue
})

function calculateNDisplayResult() {
    if(operator == null){
        displayValue = ""
        return;
    }
    num2 = +displayValue;

    console.log(num2, operator)
    if(num2 == '0' && operator == '/'){
        displayValue = ""
        display.textContent = "Mathematically impossible"
        return;
    }
    let result = operate(num1, num2, operator);
    display.textContent = result;
    displayValue = "";
    num1 = null
    operator = null;
    //should num1 be equal to null
    num2 = null;
    return result;
}
const backspace = document.querySelector("#backspace")
backspace.addEventListener("click", ()=>{
    displayValue = displayValue.slice(0,-1);
    display.textContent = displayValue;
})
const ce = document.querySelector("#ce")
ce.addEventListener("click", ()=>{
    displayValue = "";
    display.textContent = displayValue;
})
function drawCalc() {
    const numArea = document.querySelector("#num-area");
    createButton("?", "num-column", numArea);
    createButton("CE", "num-column", numArea, "ce");
    createButton("<-", "num-column", numArea, "backspace");

    for (let i = 9; i >= 0; i--) {
        createButton(i, ["num-column", "number"], numArea);

    }
    createButton('.', ["num-column","spl-operator"], numArea, "decimal");
    createButton('=', ["num-column", "spl-operator"], numArea, "equal");
    const opArea = document.querySelector("#operator-area");

    createButton('AC', "op-column", opArea, "all-clear");

    createButton('+', ["op-column","operator"], opArea);
    createButton('-', ["op-column","operator"], opArea);
    createButton('*', ["op-column", "operator"], opArea);
    createButton('/', ["op-column", "operator"], opArea);
}

function createButton(text, cls, area, id = null) {
    const button = document.createElement("button");
    button.textContent = text;
    if(Array.isArray(cls)){
        button.classList.add(...cls);
    }
    else{
        button.classList.add(cls);
    }
    if(id != null){
        button.id = id;
    }
    area.appendChild(button);
}

function add(a, b){
    return a + b
}

function subtract(a, b){
    return a - b
}

function multiply(a, b){
    return a * b
}

function divide(a, b){
    return a / b
}

