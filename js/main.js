// get references to interactive elements
const theForm = document.getElementById('myForm');
const txtDrinkChoice = document.getElementsByName('drink'); // radio button (smoothie or milkshake)
const txtSizeChoice = document.getElementById('size'); // select option (size of the drink)
const txtIngredients = document.getElementsByName('ingredients'); // checkbox (at least 1)
const txtBaseSmoothie = document.getElementById('base-smoothie'); // select option
const txtBaseMilkshake = document.getElementById('base-milkshake'); // select option
const txtExtraOption = document.getElementsByName('extra');


// add events to listen for
txtDrinkChoice.forEach(item =>
    item.addEventListener("change", checkDrinkChoice));
txtSizeChoice.addEventListener("change", checkSizeChoice);
txtIngredients.forEach(item => 
    item.addEventListener("change", checkIngredients));
txtBaseSmoothie.addEventListener("change", checkBaseSmoothie);
txtBaseMilkshake.addEventListener("change", checkBaseMilkshake);

// validate the checkbox > 1
// $('div.checkbox-group.required :checkbox:checked').length > 0

//buttons
const btnAddOrder = document.getElementById('add-order');
const btnSaveFav = document.getElementById('save-favourite');
const btnOrderFav = document.getElementById('order-favourite');
const btnPlaceOrder = document.getElementById('place-order');

//output area
const outputDrinkDetails = document.getElementById('drink-details'); //Small smoothie: banana, strawberries with apple juice.
const outputCurrentPrice = document.getElementById('current-drink-price');

const outputOrderDetails = document.getElementById('order-details'); // Display order details
const outputItemPrice = document.getElementById('item-price'); // Display item price

const outputSubtotalPrice = document.getElementById('subtotal-price'); // Total Price value
const outputFinalMessage = document.getElementById('final-message'); // Final message

const idNumber = document.getElementById('idNumber');
// generate random id number
let idNo = Math.ceil(Math.random()*10e7);
idNumber.innerText = `${idNo}`;


// read input

// output values

// perform functions
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



window.addEventListener('load', initialise);// executed when the window loads

// listen to events
btnAddOrder.addEventListener('click', addOrder);
btnSaveFav.addEventListener('click', saveFavourite);
btnOrderFav.addEventListener('click', orderFavourite);
btnPlaceOrder.addEventListener('click', PlaceOrder); // button place order


