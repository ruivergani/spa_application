// get references to interactive elements
const theForm = document.getElementById('myForm');
const txtDrinkChoice = document.getElementsByName('drink'); // radio button (smoothie or milkshake)
const txtSizeChoice = document.getElementById('size'); // select option (size of the drink)
const txtIngredients = document.getElementsByName('ingredients'); // checkbox (at least 1)
const txtBaseSmoothie = document.getElementById('base-smoothie'); // select option
const txtBaseMilkshake = document.getElementById('base-milkshake'); // select option
const txtExtraOption = document.getElementsByName('extra'); // checkbox (can choose one or not)

// div to (hide/show)
const milkBases = document.getElementById("milk-bases"); 
const juiceBases = document.getElementById("juice-bases"); 
const extra = document.getElementById("extra-options"); 

//buttons
const btnAddOrder = document.getElementById('add-order');
const btnSaveFav = document.getElementById('save-favourite');
const btnOrderFav = document.getElementById('order-favourite');
const btnPlaceOrder = document.getElementById('place-order');

//output current drink details 
const outputDrinkType = document.getElementById('drink-type');
const outputDrinkSize = document.getElementById('drink-size');
const outputDrinkIngredients = document.getElementById('drink-ingredients');
const outputDrinkBase = document.getElementById('drink-base');
const outputDrinkExtra = document.getElementById('drink-extra');
const outputCurrentPrice = document.getElementById('current-drink-price');

// output full order details
const outputOrderDetails = document.getElementById('order-details'); // Display order details
const outputItemPrice = document.getElementById('item-price'); // Display item price
const outputSubtotalPrice = document.getElementById('subtotal-price'); // Total Price value
const outputFinalMessage = document.getElementById('final-message'); // Final message
const idNumber = document.getElementById('idNumber');

// variables global
var idNo = Math.ceil(Math.random()*10e7); // random number
idNumber.innerText = `${idNo}`;
var sizeCost = 0;
var extraCost = 0;
var currentDrinkCost = (sizeCost + extraCost); // currentDrinkPrice
var directory;
var orderItem= []; // each current drink
var order = []; // full order drink

// Functions

// window load function
window.addEventListener('load', initialise);
function initialise(){
    // initialise none - to avoid user's mistake
    milkBases.style.display = "none";
    juiceBases.style.display = "none";
    extra.style.display = "none";
    btnSaveFav.disabled = true;
    sizeCost = 2.95;
    extraCost = 0;
    currentDrinkCost = 0;
    currentDrinkCost = (sizeCost + extraCost);
    outputCurrentPrice.innerText = `£${(currentDrinkCost).toFixed(2)}`;
    // display current drink details below (default values)
    outputDrinkType.innerText = `Type: `;
    outputDrinkSize.innerText = `Size: ${txtSizeChoice.options[txtSizeChoice.selectedIndex].value.charAt(0).toUpperCase() + txtSizeChoice.options[txtSizeChoice.selectedIndex].value.slice(1)}`;
    outputDrinkBase.innerText = `Base: `;
}
// type select option
function checkDrinkChoice(){
    let checked = theForm.querySelector('input[name=drink]:checked');
    btnSaveFav.disabled = false;
    outputDrinkType.innerText = `Type: ${checked.value.charAt(0).toUpperCase() + checked.value.slice(1)}`; // display type of drink in output current drink
    // hide/show features
    if(this.value == "smoothie"){
        juiceBases.style.display = "block";
        milkBases.style.display = "none";
        extra.style.display = "none";
        var baseSmoothie = txtBaseSmoothie.options[txtBaseSmoothie.selectedIndex].value;
        outputDrinkBase.innerText = `Base: ${baseSmoothie.charAt(0).toUpperCase() + baseSmoothie.slice(1)} juice`;
        // because Extras does not exist in Smoothie option - set values to default again
        currentDrinkCost = 0;
        extraCost = 0;
        currentDrinkCost = (sizeCost + extraCost);
        outputCurrentPrice.innerText = `£${(currentDrinkCost).toFixed(2)}`;
    }
    else{
        milkBases.style.display = "block";
        juiceBases.style.display = "none";
        extra.style.display = "block";
        var baseMilkshake = txtBaseMilkshake.options[txtBaseMilkshake.selectedIndex].value;
        outputDrinkBase.innerText = `Base: ${baseMilkshake.charAt(0).toUpperCase() + baseMilkshake.slice(1)}`;
        outputDrinkExtra.innerText = `Extras: `;
    }
}
// size select option
function checkSizeChoice(){
    var size = txtSizeChoice.options[txtSizeChoice.selectedIndex].value; // size select value
    if(size == "small"){
        sizeCost = 2.45;
    }
    else if(size == "medium"){
        sizeCost = 2.95;
    }
    else{
        sizeCost = 3.45;
    }
    currentDrinkCost = (sizeCost + extraCost);
    outputCurrentPrice.innerText = `£${currentDrinkCost.toFixed(2)}`;
    outputDrinkSize.innerText = `Size: ${size.charAt(0).toUpperCase() + size.slice(1)}`;
}
// checkbox ingredients option
function checkIngredients(){
    let drinkIngredientsNodeList = theForm.querySelectorAll('input[name=ingredients]:checked'); 
    let arrayIngredients = Array.from(drinkIngredientsNodeList);
    let arrayItemIngredients = [];
    if(this.checked){
        for(let i = 0; i < arrayIngredients.length; i++){
            arrayItemIngredients += arrayIngredients[i].value;
        }
        outputDrinkIngredients.innerText = `${arrayItemIngredients}`;
    }
    else{
        for(let i = 0; i < arrayIngredients.length; i++){
            arrayItemIngredients += arrayIngredients[i].value;
        }
        outputDrinkIngredients.innerText = `${arrayItemIngredients}`;
    }
    
}
// checkbox extra option
function checkExtra(){
    if(this.checked){
        extraCost += 0.50;
    }
    else{
        extraCost -= 0.50;
    }
    currentDrinkCost = (sizeCost + extraCost);
    outputCurrentPrice.innerText = `£${(currentDrinkCost).toFixed(2)}`;
}
// select option base smoothie
function checkBaseSmoothie(){
    var baseSmoothie = txtBaseSmoothie.options[txtBaseSmoothie.selectedIndex].value;
    outputDrinkBase.innerText = `Base: ${baseSmoothie.charAt(0).toUpperCase() + baseSmoothie.slice(1)} juice`
}
// select option base milkshake
function checkBaseMilkshake(){
    var baseMilkshake = txtBaseMilkshake.options[txtBaseMilkshake.selectedIndex].value;
    outputDrinkBase.innerText = `Base: ${baseMilkshake.charAt(0).toUpperCase() + baseMilkshake.slice(1)}`
}

function addOrder(Event){
    if(theForm.checkValidity()){
        Event.preventDefault(); //prevent refreshing and sending to server
        // collect all values into an array
        let drinkType = theForm.querySelector('input[name=drink]:checked');
        let drinkSize = txtSizeChoice.options[txtSizeChoice.selectedIndex].value;
        let drinkIngredientsNodeList = theForm.querySelectorAll('input[name=ingredients]:checked'); 
        let arrayIngredients = Array.from(drinkIngredientsNodeList);
        let drinkJuiceBase = txtBaseSmoothie.options[txtBaseSmoothie.selectedIndex].value;
        let drinkMilkBase = txtBaseMilkshake.options[txtBaseMilkshake.selectedIndex].value;
        let drinkExtraNodeList = theForm.querySelectorAll('input[name=extra]:checked');
        let arrayExtra = Array.from(drinkExtraNodeList);
        if(drinkType.value == "smoothie"){ // validation depending on drink type
            orderItem = [drinkType, drinkSize, arrayIngredients, drinkJuiceBase, currentDrinkCost];
        }
        else{
            orderItem = [drinkType, drinkSize, arrayIngredients, drinkMilkBase, arrayExtra, currentDrinkCost];
        }
        console.log(orderItem);
        
        //order = [orderItem, orderItem];
        //console.log(order);
         
    }
}
function PlaceOrder(Event){
    if(theForm.checkValidity()){
        Event.preventDefault();
        outputFinalMessage.innerText = `Your order has been received, thumbs up from the restaurant!`;
        theForm.reset();
        initialise(); // call initialise 
    }
}
function saveFavourite(Event){
    if(theForm.checkValidity()){
        Event.preventDefault();
        console.log("Save Favourite");
    } 
}
function orderFavourite(Event){
    if(theForm.checkValidity()){
        Event.preventDefault();
        console.log("Order Favourite");
    }
}

// add events to listen for checkbox, selection, input and radio buttons
txtDrinkChoice.forEach(item =>
    item.addEventListener("change", checkDrinkChoice));
txtSizeChoice.addEventListener("change", checkSizeChoice);
txtIngredients.forEach(item => 
    item.addEventListener("change", checkIngredients));
txtBaseSmoothie.addEventListener("change", checkBaseSmoothie);
txtBaseMilkshake.addEventListener("change", checkBaseMilkshake);
txtExtraOption.forEach(item =>
    item.addEventListener("change", checkExtra));

// listen to events
btnAddOrder.addEventListener('click', addOrder);
btnSaveFav.addEventListener('click', saveFavourite);
btnOrderFav.addEventListener('click', orderFavourite);
btnPlaceOrder.addEventListener('click', PlaceOrder); // button place order
