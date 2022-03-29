var game = {
	score: 0,
	totalScore: 0,
	totalClicks: 0,
	clickValue: 1,
	version: 0.000,
	
	addToScore: function(amount){
		this.score += amount;
		this.totalScore += amount;
		display.updateScore();
	},
	
	getScorePerSecond: function() {
		var ScorePerSecond = 0;
		for (i = 0; i < building.name.length; i++){
			ScorePerSecond += building.income[i] * building.count[i];
		}
		return ScorePerSecond;
	}
}

var building = {
	name: [
		"Miner",
		"Earner",
		"Investor",
		"Trader"
	],
	image: [
		"miner.gif",
		"earnertest.gif",
		"investor.gif",
		"trader.gif"
	],
	count: [0, 0, 0, 0],
	income: [
		1,
		5,
		60,
		250
	],
	cost: [
		20,
		150,
		2000,
		10000
	],
	
	purchase: function(index) {
		if (game.score >= this.cost[index]) {
			game.score -= this.cost[index];
			this.count[index]++;
			this.cost[index] = Math.ceil(this.cost[index] * 1.20);
			display.updateScore();
			display.updateShop();
		}
	}
}

var display = {
	updateScore: function(){
		document.getElementById("score").innerHTML = game.score;
		document.getElementById("ScorePerSecond").innerHTML = game.getScorePerSecond();
		document.title = game.score + " Tokens - Crypto Clicker";
	},
	
	updateShop: function(){
		document.getElementById("shopContainer").innerHTML = "";
		for (i = 0; i < building.name.length; i++){
			document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="img/'+building.image[i]+'"></td><td id="NameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> Tokens</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
		}
	}
}

function saveGame() {
	var gameSave = {
		score: game.score,
		totalScore: game.totalScore,
		totalClicks: game.totalClicks,
		clickValue: gameclickValue,
		version: game.version,
		buildingCount: building.count,
		buildingIncome: building.income,
		buildingCost: building.cost
	};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null){
		if(typeof savedGame.score !== "undefined") game.score = savedGame.score;
		if(typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
		if(typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
		if(typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
		if(typeof savedGame.buildingCount !== "undefined"){
			for(i = 0; i < savedGame.buildingCount.length; i++){
				building.count[i] = savedGame.buildingCount[i]; //For new buildings
			}
		}
		if(typeof savedGame.buildingIncome !== "undefined"){
			for(i = 0; i < savedGame.buildingIncome.length; i++){
				building.Income[i] = savedGame.buildingIncome[i]; //For new buildings
			}
		}
		if(typeof savedGame.buildingCost !== "undefined"){
			for(i = 0; i < savedGame.buildingCost.length; i++){
				building.Cost[i] = savedGame.buildingCost[i]; //For new buildings
			}
		}
	}
}

function resetGame(){
    if(confirm("Are you sure you want to reset you game!?")){
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function() {
	loadGame();
	display.updateScore();
	display.updateShop();
}

setInterval (function(){
	game.score += game.getScorePerSecond();
	game.totalScore += game.getScorePerSecond();
	display.updateScore();
}, 1000); //1000ms = 1s

setInterval (function(){
    saveGame();
}, 30000); //30000ms = 30s

document.addEventListener("keydown", function(event){ // block ctrl + s and save game
    if(event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);
				
					
					
					
					
	
	
