//  1.çözüm

function createCurrencyElements(elements, root, inputName){
    for(let i =0; i< elements.length; i++){
        const currencyKeyDiv   = document.createElement("div");
        const currencyKeyInput = document.createElement("input");
        currencyKeyInput.setAttribute("type", "radio");
        currencyKeyInput.setAttribute("name", inputName);
        currencyKeyInput.setAttribute("id", inputName + elements[i]);
        currencyKeyInput.setAttribute("value", elements[i]);

        const currencyKeyLabel = document.createElement("label");
        currencyKeyLabel.setAttribute("for", inputName + elements[i]);
        currencyKeyLabel.textContent = elements[i];

        currencyKeyDiv.appendChild(currencyKeyInput);
        currencyKeyDiv.appendChild(currencyKeyLabel);
        root.appendChild(currencyKeyDiv);
    }
}


//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";


// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";

const getBaseData = async function(fromTargetValue,toTargetValue,amount){   
    const response =  await fetch(`https://api.exchangeratesapi.io/latest?base=${fromTargetValue}`);  
    const responseJSON = await response.json();

     const resultForOne = responseJSON.rates[toTargetValue];
     const result = amount * resultForOne;
     const currencyResult = document.querySelector("#currency-result");
     currencyResult.innerHTML = amount + " " + fromTargetValue + " = " + result + " " + toTargetValue; }    

       const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){
    
    const fromTarget = document.querySelector("input[name='currency_from']:checked");
    const fromTargetValue =  document.querySelector("input[name='currency_from']:checked").value;
    
    const toTarget   = document.querySelector("input[name='currency_to']:checked")
    const toTargetValue = document.querySelector("input[name='currency_to']:checked").value;
    
    const amount     = document.querySelector("input[name='amount']").value;
    if (fromTargetValue == toTargetValue) {
        myFunction( "Please Make A Different Choice!")
        currencyResult.innerHTML = " "
         
      }else if  (isNaN(amount)) {
        const amount     = document.querySelector("input[name='amount']").value;
         myFunction("The Entry Must Be a Number! "); 
        currencyResult.innerHTML = " "
      }
           
       
    getBaseData(fromTargetValue, toTargetValue, amount)
    }
    
       
        
    );

    const getData = async function(){
        const response =  await fetch("https://api.exchangeratesapi.io/latest?base=USD"); 
        const responseJSON = await response.json();
        const allCurrencies = Object.keys(responseJSON.rates);  
       
        createCurrencyElements(allCurrencies, parentEl, fromInputName);  
        createCurrencyElements(allCurrencies, parentToEl, toInputName);
    };



getData();
    

function myFunction(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  document.querySelector("#snackbar").innerHTML = message;
 }
