// get references to interactive elements
const theForm = document.getElementById('myForm');
const txtDrinkChoice = document.getElementsByName('drink'); // radio button (smoothie or milkshake)
const txtSizeChoice = document.getElementById('size'); // select option (size of the drink)
const txtIngredients = document.getElementsByName('ingredients'); // checkbox (at least 1)
const txtBaseSmoothie = document.getElementById('base-smoothie'); // select option
const txtBaseMilkshake = document.getElementById('base-milkshake'); // select option
const txtExtraOption = document.getElementsByName('extra'); // checkbox (can choose one or not)

//buttons
const btnAddOrder = document.getElementById('add-order');
const btnSaveFav = document.getElementById('save-favourite');
const btnOrderFav = document.getElementById('order-favourite');
const btnPlaceOrder = document.getElementById('place-order');

//output area
const outputDrinkType = document.getElementById('drink-type');
const outputDrinkSize = document.getElementById('drink-size');
const outputDrinkIngredients = document.getElementById('drink-ingredients');
const outputDrinkBase = document.getElementById('drink-base');
const outputDrinkExtra = document.getElementById('drink-extra');


const outputCurrentPrice = document.getElementById('current-drink-price');
const outputOrderDetails = document.getElementById('order-details'); // Display order details
const outputItemPrice = document.getElementById('item-price'); // Display item price
const outputSubtotalPrice = document.getElementById('subtotal-price'); // Total Price value
const outputFinalMessage = document.getElementById('final-message'); // Final message
const idNumber = document.getElementById('idNumber');

// generate random id number
let idNo = Math.ceil(Math.random()*10e7);
idNumber.innerText = `${idNo}`;

// variables
let sizeCost = 0;
let extraCost = 0;


// functions
function checkDrinkChoice(){
    let checked = theForm.querySelector('input[name=drink]:checked');
    outputDrinkType.innerText = `Type: ${checked.value.charAt(0).toUpperCase() + checked.value.slice(1)}`;
    if(this.value == "smoothie"){
        console.log("you choose smoothie");
        // must select bases (apple juice or orange juice only - one only)
    }
    else{
        console.log("you choose milkshake");
        // must select one of the bases (whole milk, semi-skimmed milk, coconut milk or oat milk - one only)
        // can also add extra options (50p each)
    }
}
function checkSizeChoice(){
    let size = txtSizeChoice.options[txtSizeChoice.selectedIndex].value; // size select value
    if(size == "small"){
        sizeCost = 2.45;
    }
    else if(size == "medium"){
        sizeCost = 2.95;
    }
    else{
        sizeCost = 3.45;
    }
    outputCurrentPrice.innerText = `£${(sizeCost + extraCost).toFixed(2)}`;
    outputDrinkSize.innerText = `Size: ${txtSizeChoice.options[txtSizeChoice.selectedIndex].value.charAt(0).toUpperCase() + txtSizeChoice.options[txtSizeChoice.selectedIndex].value.slice(1)}`;
}
function checkIngredients(){
    if(this.checked){
        outputDrinkIngredients.innerText += ` ${this.value.charAt(0).toUpperCase() + this.value.slice(1)}`;
    }
    else{
        // remove text from the ingredients
    }
    
    
}
function checkBaseSmoothie(){
    console.log("Check Smoothie");
}
function checkBaseMilkshake(){
    console.log("Check base milkshake");
}
function checkExtra(){
    if(this.checked){
        extraCost += 0.50;
    }
    else{
        extraCost -= 0.50;
    }
    outputCurrentPrice.innerText = `£${(sizeCost + extraCost).toFixed(2)}`;
}
function initialise(){ // When the window loads
    sizeCost = 2.95;
    extraCost = 0;
    let checked = theForm.querySelector('input[name=drink]:checked');
    outputCurrentPrice.innerText = `£${(sizeCost + extraCost).toFixed(2)}`;
    outputDrinkSize.innerText = `Size: ${txtSizeChoice.options[txtSizeChoice.selectedIndex].value.charAt(0).toUpperCase() + txtSizeChoice.options[txtSizeChoice.selectedIndex].value.slice(1)}`;
    outputDrinkType.innerText = `Type: ${checked.value.charAt(0).toUpperCase() + checked.value.slice(1)}`;
}
function PlaceOrder(Event){
    if(theForm.checkValidity()){
        Event.preventDefault();
        outputFinalMessage.innerText = `Your order has been received, thumbs up from the restaurant!`;
        theForm.reset();
    }
}
function addOrder(Event){
    if(theForm.checkValidity()){
        Event.preventDefault();
        console.log("Added to Order.");
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
window.addEventListener('load', initialise);// executed when the window loads

// listen to events
btnAddOrder.addEventListener('click', addOrder);
btnSaveFav.addEventListener('click', saveFavourite);
btnOrderFav.addEventListener('click', orderFavourite);
btnPlaceOrder.addEventListener('click', PlaceOrder); // button place order


