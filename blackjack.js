//Plans (Erase when finished), Put 3 cat pictures, and do the 1 of 3 when they win. 
//Upload to website (freelance), make a new section called Games (And put sassy blackjack with a twist)


var dealerSums = 0;  /*Intializing everything */
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 


var hiddenCard;
var deck;

var canHit = true; //allows the player (you) while yourSum <= 21


window.onload = function(){  //Function for loading on webpage

    builtDeck();
    shuffleDeck();
    startGame();


}

function builtDeck(){  //Building the function for the deck cards

    let values = ["A", "2", "3", "4", " 5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];  //legend = ["C = Club", "C = Diamond", "Heart", "Spade"];
    deck = [];  //Intializing the array

    for(let i = 0; i < types.length; i++){  

        for(let j = 0; j < values.length; j++){  //Nested for loop
            deck.push(values[j] + "-" + types[i]);  //A-C -> K-C -> A-D -> K-D
        }
    }
    console.log(deck);  //Outputing to the console

}


function shuffleDeck(){ /*Shuffles cards for us upon every game*/

    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length); //Gives a number from (0-1) * 52 -> (0-51.999)
        let temp = deck[i];  
        deck[i] = deck[j];  
        deck[j] = temp;                                    
    }

    console.log(deck); //Prints out output

}

function startGame() {  //Pretty self-explainatory starts game

hiddenCard = deck.pop(); //Removes card from the end of the array
dealerSums += getValue(hiddenCard);
dealerAceCount += checkAce(hiddenCard); //Checks for Aces

// console.log(hiddenCard);
// console.log(dealerSums);

//Dealer Cards
while(dealerSums < 17) { //While their card is less than 17
    //<img> tag ESSENTIALLY THIS GOES THROUGH HTML AND ADDS CARDS
    let cardImg = document.createElement("img");
    let card = deck.pop();  
    cardImg.src = "./cards/" + card + ".png"; //Sorts through src files
    dealerSums += getValue(card); //Incremented dealer sum.
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);

}
    console.log(dealerSums);

        //Your cards
    for(let i = 0; i < 2; i++){  //<img> tag ESSENTIALLY THIS GOES THROUGH HTML AND ADDS CARDS
        let cardImg = document.createElement("img");
        let card = deck.pop();  
        cardImg.src = "./cards/" + card + ".png"; //Sorts through src files
        yourSum += getValue(card); //Incremented dealer sum.
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit); //Hitting enable (Player click)
    document.getElementById("stay").addEventListener("click", stay); //Stay Enabled (Player click)

}


function hit(){  //Hit function

    if(!canHit){  //If you can't hit then it returns immediately.
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();  
    cardImg.src = "./cards/" + card + ".png"; //Sorts through src files
    yourSum += getValue(card); //Incremented dealer sum.
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21 ){ // A, J, L -> 11 or 1 + 10 + 10, choses better
    canHit = false



    }
}


function stay(){  //Stay function 

    dealerSums = reduceAce(dealerSums, dealerAceCount);  //ReduceAce function below
    yourSum = reduceAce(yourSum, yourAceCount); 

    canHit = false;  //User shouldn't be able to hit if they stay
    document.getElementById("hidden").src = "./cards/" + hiddenCard + ".png";

    let message = "";

    if (yourSum > 21){ //If you bust

        message = "Get Powned (Respectfully)";
    }

    else if(dealerSums > 21 ) {

        message = "You win!";   //Winning on technicality, even if you get 21
    }

    //both you and dealer <= 21

    else if(yourSum == dealerSums) {

        message = "Tie! (Me Personally I wouldn't let that slide)";

    }

    else if(yourSum > dealerSums){

        message = "You win, nice job! (Finally)";

        //  //Pulls from kitten picture randomizer below
        //  document.getElementById("kitten-link").innerHTIML = getRandomKittenLink();
        //  document.getElementById("kitten-link").style.display = "block"; //Shows the links for cute cats

    }

    else if (yourSum < dealerSums) {

        message = "You Lose! (What a surpise...)";
    }

    document.getElementById("dealer-sum").innerText = dealerSums;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;  //Populates messages in game


}

function getValue(card){  //Get method for card (Checks + Sorts for Non-Number Values)

    let data = card.split("-");  //Splits cards by the dash in HTML Console "4-C -> [4, C]"
    let value = data[0];

    if(isNaN(value)){   //If the int value does not exist or empty
        if(value == "A"){  //Setting value for Ace as 11
            return 11;

        }

        return 10;  //If not it returns 10 (Queen, Jack, King)
    }

    return parseInt(value); //else whatever value the number is outputs
}


function checkAce(card){
    if(card[0] == "A"){ //Outputs duality of Ace also = 1 with function in stargame
        return 1;  

    }

    return 0;  //If not ace then it just returns false (0)
}



function reduceAce(playerSum, playerAceCount){ //Checks if Ace would be better as 1 or 11

    while (playerSum > 21 && playerAceCount > 0){ //While player val > than 21 &
        playerSum -+ 10;                              //Ace count is > 0
        playerAceCount -= 1;  //Reduces total sum in your favour with Aces
    }
    return playerSum;
}

// function getRandomKittenLink(){

//     const cuteKittenLinks = [
//         '<a href="https://images.app.goo.gl/UzEEB4cnxaja7DJF9" target="_blank">Cute Kitten 1</a>',
//         '<a href="https://images.app.goo.gl/VTHArQA5LkXbTDNr6"" target="_blank">Cute Kitten 2</a>',
//         '<a href="https://images.app.goo.gl/Bf54HVqN4FLbG9Qj7" target="_blank">Cute Kitten 3</a>'
    
//     ];

//     const randomIndex = Math.floor(Math.random() * cuteKittenLinks.length) //Defining as random array index

//     return kittenLinks[randomIndex];
//}