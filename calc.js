const btns = document.querySelectorAll(".btn");
const screen = document.querySelector(".screen");
const deletee = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const overScreen = document.querySelector(".over-screen");
const operators = document.querySelectorAll(".operators");
const equal = document.querySelector(".equality");
const dot = document.querySelector(".dot");
let prevNum = "";
let curNum = "";
let curOper = "";
let prevOper = ""
let dotUsed = 0;

function add(a, b) {
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if (b == "0") return "Can't divide by 0";
    return a/b;
}
function operate(a, b, operator){
    return operator(a,b);
}
function display(a){
    console.log("dupa" +a.length)
    // if (a.length > 14){
    //     a = +a;
    //     a = +a.toFixed(10);
    // } 
    let pom = 14
    
    if (pom - a.toString().length < 0){
        let dupa = a.toString().length-pom;
    screen.innerText = a.toFixed(16-dupa);}
    else {screen.innerText = a;}
}
function displayOver(a){
    // if (a.length > 13){
    //     a = +a;
    //     a = +a.toFixed(10);
    // } 
    let pom = 14
    if (pom - a.length < 0){
    overScreen.innerText = a.substring(0,a.length);}
    overScreen.innerText=a;
    dotUsed = 0;
}

function dupa() {
    prevOper = overScreen.innerText[overScreen.innerText.length -1];
        // console.log(overScreen.innerText[overScreen.innerText.length -1])
        // prevNum=curNum;
        // displayOver(prevNum + element.innerText);
        if (prevOper=="+" || prevOper==undefined) {
            displayOver(add(+prevNum, +curNum) + curOper); 
            // overScreen.innerText="";
            prevNum = add(+prevNum, +curNum);
            curNum = "";
            display(curNum);
        }
        else if (prevOper=="-") {
            displayOver(subtract(+prevNum, +curNum) + curOper); 
            // overScreen.innerText="";
            prevNum = subtract(+prevNum, +curNum);
            curNum = "";
            display(curNum);

        }
        else if (prevOper=="*") {
            displayOver(multiply(+prevNum, +curNum) + curOper); 
            // overScreen.innerText="";
            prevNum = multiply(+prevNum, +curNum);
            curNum = "";
            display(curNum);

        }
        else if (prevOper=="/") {
            
            if (prevNum != "") {
                displayOver(divide(+prevNum, +curNum) + curOper); 
                // overScreen.innerText="";
                prevNum = divide(+prevNum, +curNum);
                curNum = "";
                display(curNum);}
            else {
                displayOver(curNum);
                prevNum = curNum;
                curNum = "";
                display(curNum);}
            }
}

function equalSign() {
    if (curOper=="+") {
        display(add(+prevNum, +curNum)); 
        overScreen.innerText="";
        prevNum = screen.innerText;
        curNum ="";
    }
    else if (curOper=="-") {
        display(subtract(+prevNum, +curNum)); 
        overScreen.innerText="";
        prevNum = screen.innerText;
        curNum ="";

    }
    else if (curOper=="*") {
        display(multiply(+prevNum, +curNum)); 
        overScreen.innerText="";
        prevNum = screen.innerText;
        curNum ="";

    }
    else if (curOper=="/") {
        display(divide(+prevNum, +curNum)); 
        overScreen.innerText="";
        prevNum= screen.innerText;
        curNum ="";

    };
}

btns.forEach(button => {
    button.addEventListener('click', ()=> {
        if (curNum.length<14){
        curNum+=button.innerText;}
        display(curNum); }); //after clicking a given button, it displays it on the screen
})

clear.addEventListener('click', ()=>{curNum=""; prevNum=""; curOper = ""; prevOper = ""; dotUsed = 0; screen.innerText = curNum; overScreen.innerText = prevNum}); // clears the screen
deletee.addEventListener('click', () => {curNum=curNum.substring(0,curNum.length-1); display(curNum);}); //deletes the digit most on the right

operators.forEach(element => {
    element.addEventListener('click', ()=>{
        curOper = element.innerText;
        dupa();
})
})

equal.addEventListener('click', () => {
    equalSign();
})

dot.addEventListener('click', () => {
    if (curNum.toString().length<14 && dotUsed==0){
    curNum+='.';
    dotUsed++;}
    display(curNum); })


document.addEventListener('keydown', element => {
    console.log(element.code)
  if (Number.isInteger(+element.code.substring(6, element.code.length))){ //element.code returns "Numpad" and after that the name of a key, so I gotta know if it is a number
    if (curNum.toString().length<14){
        curNum+=element.code.substring(6, element.code.length);
        }
        display(curNum);
  }
  else if (element.code.substring(6, element.code.length) == "Multiply"){
      curOper = "*";
      dupa();
  }
  else if (element.code.substring(6, element.code.length) == "Subtract"){
      curOper = "-";
      dupa();
  }
  else if (element.code.substring(6, element.code.length) == "Add"){
      curOper = "+";
      dupa();
  }
  else if (element.code.substring(6, element.code.length) == "Divide"){
      curOper = "/";
      dupa();
  }
  else if (element.code.substring(6, element.code.length) == "Enter"){
    equalSign();

    }
  else if(element.code.substring(6, element.code.length)== "Decimal") {
    if (curNum.toString().length<14  && dotUsed==0){
        curNum+=element.code.substring(6, element.code.length);
        dotUsed++;
        }
        display(curNum);
  }
  else if(element.code == "Backspace") {
    curNum=curNum.substring(0,curNum.length-1); display(curNum);
  }
})

//|| element.code.substring(6, element.code.length)=="+" || element.code.substring(6, element.code.length) == "-" || element.code.substring(6, element.code.length)=="/") {