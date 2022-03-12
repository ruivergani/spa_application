// get references to interactive elements
var theForm = document.getElementById('myForm');
var txtDrinkChoice = document.getElementsByName('drink'); // radio button (smoothie or milkshake)
var txtSizeChoice = document.getElementById('size'); // select option (size of the drink)
var txtIngredients = document.querySelectorAll('input[name=ingredients]');  // checkbox (at least 1)
var txtBaseSmoothie = document.getElementById('base-smoothie'); // select option
var txtBaseMilkshake = document.getElementById('base-milkshake'); // select option
var txtExtra = document.querySelectorAll('input[name=extra]'); // checkbox (can choose one or not)

// div to (hide/show)
var milkBases = document.getElementById("milk-bases"); 
var juiceBases = document.getElementById("juice-bases"); 
var extra = document.getElementById("extra-options"); 

//buttons
var btnAddOrder = document.getElementById('add-order');
var btnSaveFav = document.getElementById('save-favourite');
var btnOrderFav = document.getElementById('order-favourite');
var btnPlaceOrder = document.getElementById('place-order');

//output current drink details 
var outputDrinkType = document.getElementById('drink-type');
var outputDrinkSize = document.getElementById('drink-size');
var outputDrinkIngredients = document.getElementById('drink-ingredients');
var outputDrinkBase = document.getElementById('drink-base');
var outputDrinkExtra = document.getElementById('drink-extra');
var outputCurrentPrice = document.getElementById('current-drink-price');

// output full order details
var outputOrderDetails = document.getElementById('order-details'); // Display order details
var outputItemPrice = document.getElementById('item-price'); // Display item price
var outputSubtotalPrice = document.getElementById('subtotal-price'); // Total Price value
var outputFinalMessage = document.getElementById('final-message'); // Final message
var idNumber = document.getElementById('idNumber');

// variables global
var idNo = Math.ceil(Math.random()*10e7); // random number
idNumber.innerText = `${idNo}`;
var sizeCost = 0;
var extraCost = 0;
var currentDrinkCost = (sizeCost + extraCost); // currentDrinkPrice
var directory;


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
        // SET DEFAULT VALUES AGAIN BASED ON SMOOTHIE OPTION
        currentDrinkCost = 0;
        extraCost = 0;
        currentDrinkCost = (sizeCost + extraCost);
        outputCurrentPrice.innerText = `£${(currentDrinkCost).toFixed(2)}`;
        outputDrinkExtra.innerText = "";
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
// checkboxes ingredients
var listArrayIngredients = [];
for(var checkbox of txtIngredients){
    checkbox.addEventListener('click', function(){
        if(this.checked == true){
            listArrayIngredients.push(this.value);
            outputDrinkIngredients.innerHTML = listArrayIngredients.join(' / ');
        }
        else{
            // REMOVE VALUE FROM ARRAY WHEN IT IS UNCHECKED
            listArrayIngredients = listArrayIngredients.filter(e => e !== this.value);
            outputDrinkIngredients.innerHTML = listArrayIngredients.join(' / ');
        } 
    })
}
// checkboxes extras
var listArrayExtras = [];
var text = '<p>Extras: </p>';
for(var checkboxExtra of txtExtra){
    checkboxExtra.addEventListener('click', function(){
        if(this.checked == true){
            extraCost += 0.50;
            listArrayExtras.push(this.value);
            outputDrinkExtra.innerHTML = text + listArrayExtras.join(' / ');
        }
        else{
            extraCost -= 0.50;
            //REMOVE VALUE FROM ARRAY WHEN IT IS UNCHECKED
            listArrayExtras = listArrayExtras.filter(e => e !== this.value);
            outputDrinkExtra.innerHTML = text + listArrayExtras.join(' / ');
        }
        currentDrinkCost = (sizeCost + extraCost);
        outputCurrentPrice.innerText = `£${(currentDrinkCost).toFixed(2)}`;
    })
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

var orderItem= []; // each current drink
var order = []; // full order drink

function addOrder(Event){
    if(theForm.checkValidity()){
        Event.preventDefault(); //prevent refreshing and sending to server
        // collect all values into an array
        var drinkType = theForm.querySelector('input[name=drink]:checked');
        var drinkSize = txtSizeChoice.options[txtSizeChoice.selectedIndex].value;
        var stringIngredients = listArrayIngredients.toString(); // CONVERT TO STRING TO SHOW
        var drinkJuiceBase = txtBaseSmoothie.options[txtBaseSmoothie.selectedIndex].value;
        var drinkMilkBase = txtBaseMilkshake.options[txtBaseMilkshake.selectedIndex].value;
        var stringExtras = listArrayExtras.toString(); // CONVERT TO STRING TO SHOW
        var subtotalPrice = 0;


        // VALIDATION DEPEDING ON DRINK TYPE
        if(drinkType.value == "smoothie"){
            orderItem = [drinkType.value, drinkSize, stringIngredients, drinkJuiceBase, "no extras", currentDrinkCost];
        }
        else{
            orderItem = [drinkType.value, drinkSize, stringIngredients, drinkMilkBase, stringExtras, currentDrinkCost];
        }
        // ADD TO THE ORDER ARRAY (END)
        order.push(orderItem);
        // SUM VALUES TO THE ORDER ARRAY
        for(item in order){
           subtotalPrice += currentDrinkCost;
        }
        var idNo = Math.ceil(Math.random()*10e7); // RESET ORDER NUMBER
        outputOrderDetails.innerText += `ORDER: ${idNo} \n ${orderItem[0].charAt(0).toUpperCase() + orderItem[0].slice(1)}: ${orderItem[1]} size with ${orderItem[2]}, base made of: ${orderItem[3]} and ${orderItem[4]}. \n \n`;
        outputItemPrice.innerText += `£${currentDrinkCost.toFixed(2)} \n \n \n \n \n`;
        outputSubtotalPrice.innerText = `£${subtotalPrice.toFixed(2)}`;

        console.log(orderItem); // item order
        console.log(order); // order ()
        
    
       // display order details
       // console.log(order[0][0]); 
       // console.log(order[0][1]); 
       // arrayIngredients.forEach(element => console.log(element.value));
       // console.log(order[0][3]); 
       // arrayExtra.forEach(element => console.log(element.value));
       // console.log(order[0][5]);
    }
}
function PlaceOrder(Event){
    if(theForm.checkValidity()){
        Event.preventDefault();
        outputFinalMessage.innerText = `Your order has been received, thumbs up from the restaurant!`;
        // theForm.reset();
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
txtBaseSmoothie.addEventListener("change", checkBaseSmoothie);
txtBaseMilkshake.addEventListener("change", checkBaseMilkshake);

// listen to events
btnAddOrder.addEventListener('click', addOrder);
btnSaveFav.addEventListener('click', saveFavourite);
btnOrderFav.addEventListener('click', orderFavourite);
btnPlaceOrder.addEventListener('click', PlaceOrder); // button place order
