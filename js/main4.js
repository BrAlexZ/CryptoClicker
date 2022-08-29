function togglePlay() {
	var myAudio = document.getElementById("myAudio");myAudio.volume = 0.1;
	return myAudio.paused ? myAudio.play() : myAudio.pause(); 
};

function play() {
	var audio = document.getElementById('audio');
	audio.volume = 0.01;
	audio.currentTime = 0;
	audio.play();
	
};

function info() {
			Swal.fire({
			title: "Difficulty Info", 
			html: "The difference between each level of difficulty is the price of each upgrade and asset. On each difficulty level the assets will produce less coins and the upgrades will be less valuable.",  
			confirmButtonText: "Understood!",
			confirmButtonColor: "#249D9F" ,		
		}).then((result) => {
			setTimeout(() => { document.getElementById('footer').style.display = "block"; }, 500);
		});
			document.getElementById('footer').style.display = "none";

	var audio1 = document.getElementById('audio1');
		audio1.volume = 0.05;
		audio1.play();
};

function Tokens() {
			Swal.fire({
			title: "Tokens", 
			html: "Tokens are the currency of the game, with Tokens you can buy assets, upgrades and collect achievements! Tokens can be earned by clicking the coin or automatically by assets.",  
			confirmButtonText: "Understood!",
			confirmButtonColor: "#249D9F" ,			
		}).then((result) => {
			setTimeout(() => { document.getElementById('footer').style.display = "block"; }, 500);
		});
			document.getElementById('footer').style.display = "none";

	var audio1 = document.getElementById('audio1');
		audio1.volume = 0.05;
		audio1.play();
};

function Assets() {
			Swal.fire({
			title: "Assets", 
			html: "The assets are the fastest way to make Tokens! With the previously collected Tokens you can buy assets like Miners, Earners etc. which continuously generate Tokens each asset has its own cost and produce its own amount of Tokens.",  
			confirmButtonText: "Understood!",
			confirmButtonColor: "#249D9F" ,			
		}).then((result) => {
			setTimeout(() => { document.getElementById('footer').style.display = "block"; }, 500);
		});
			document.getElementById('footer').style.display = "none";

	var audio1 = document.getElementById('audio1');
		audio1.volume = 0.05;
		audio1.play();
};

function Upgrades() {
			Swal.fire({
			title: "Upgrades", 
			html: "Upgrades will come progressively in the game automatically, they are used for boosting already owned assets or by increasing the amount of Tokens you get each click. ",  
			confirmButtonText: "Understood!",
			confirmButtonColor: "#249D9F" ,			
		}).then((result) => {
			setTimeout(() => { document.getElementById('footer').style.display = "block"; }, 500);
		});
			document.getElementById('footer').style.display = "none";

	var audio1 = document.getElementById('audio1');
		audio1.volume = 0.05;
		audio1.play();
};

function Achievements() {
			Swal.fire({
			title: "Achievements", 
			html: "The goal of the game is to collect as many achievements as you can. Achievements will automatically appear at the bottom of the screen when a certain requisition is completed. You will get achievements by buying assets, clicking or upgrading.",  
			confirmButtonText: "Understood!",
			confirmButtonColor: "#249D9F" ,			
		}).then((result) => {
			setTimeout(() => { document.getElementById('footer').style.display = "block"; }, 500);
		});
			document.getElementById('footer').style.display = "none";

	var audio1 = document.getElementById('audio1');
		audio1.volume = 0.05;
		audio1.play();
};

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
		3,
		7,
		20
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
			display.updateUpgrades();
		}
	}
}

var upgrade = {
	name: [
		"Stone Pickaxe (Upgrade)",
		"Iron Pickace (Upgrade)",
		"Double Click (Upgrade)"
	],
	description: [
		"Miners are twice as efficent",
		"Miners are twice as efficent",
		"One click now gives 2x Tokens!"
	],
	image: [
		"stone_pickaxe.png",
		"iron_pickaxe.png",
		"click.png"
	],
	type: [
		"building",
		"building",
		"click"
	],
	cost:[
		600,
		2500,
		100
	],
	buildingIndex: [
		0,
		0,
		-1
	],
	requirement: [
		5,
		20,
		50
	],
	bonus: [
		2,
		2,
		2
	],
	purchased: [false, false, false],
	
	purchase: function(index){
		if (!this.purchased[index] && game.score >= this.cost[index]){
			if(this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]){
				game.score -= this.cost[index];
				building.income[this.buildingIndex[index]] *= this.bonus[index];
				this.purchased[index] = true;
				
				display.updateUpgrades();
				display.updateScore();
			} else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
				game.score -= this.cost[index];
				game.clickValue *= this.bonus[index];
				this.purchased[index] = true;
				
				display.updateUpgrades();
				display.updateScore();
			}
		}
	}
}

var achievement = {
	name: [
		"Good Miner (Achievement)",
		"Pro Miner (Achievement)",
		"Pro Earner (Achievement)",
		"Pro Investor (Achievement)",
		"Super Trader (Achievement)",
		"Fingertastic (Achievement)",
		"Fingredible (Achievement)",
		"A Humble Start (Achievement)",
		"Good progress (Achievement)"
		
	],
	description: [
		"Buy 3 miners",
		"Buy 10 miners",
		"Buy 8 earners",
		"Buy 5 investors",
		"Buy 3 traders",
		"Click the Token 1 time",
		"Click the Token 1000 time",
		"Gain 250 Token",
		"Gain 2500 Token"
		
	],
	image: [
		"stone2_pickaxe.png",
		"achi_22.png",
		"pro.webp",
		"123.jpg",
		"321.png",
		"earner_achievement.gif",
		"fing.webp",
		"first_click.gif",
		"achievement_2.gif"
		
	],
	type: [
		"building",
		"building",
		"building",
		"building",
		"building",
		"click",
		"click",
		"score",
		"score"
		
	],
	requirement: [
		3,
		10,
		8,
		5,
		3,
		1,
		1000,
		250,
		2500
		
	],
	objectIndex:[
		0,
		0,
		1,
		2,
		3,
		-1,
		-1,
		-1,
		-1
	],
	
	awarded: [false, false, false, false, false, false, false, false, false],
	
	earn: function(index) {
		this.awarded[index] = true;
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
	},
	
	updateUpgrades: function(){
		document.getElementById("upgradeContainer").innerHTML = "";
		for(i = 0; i < upgrade.name.length; i++){
			if(!upgrade.purchased[i]){
				if(upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){	
					document.getElementById("upgradeContainer").innerHTML += '<img src="img/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' Tokens)" onclick="upgrade.purchase('+i+')">';
				} else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]){
					document.getElementById("upgradeContainer").innerHTML += '<img src="img/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10; '+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' Tokens)" onclick="upgrade.purchase('+i+')">';
				}
			}
		}
	},
	
	updateAchievements: function(){
		document.getElementById("achievementContainer").innerHTML = "";
		for (i = 0; i < achievement.name.length; i++){
			if (achievement.awarded[i]){
				document.getElementById("achievementContainer").innerHTML += '<img src="img/'+achievement.image[i]+'" title="'+achievement.name[i]+' &#10; '+achievement.description[i]+'">';
			}
		}
	}
}

function saveGame() {
	
	var gameSave = {
		score: game.score,
		totalScore: game.totalScore,
		totalClicks: game.totalClicks,
		clickValue: game.clickValue,
		version: game.version,
		buildingCount: building.count,
		buildingIncome: building.income,
		buildingCost: building.cost,
		upgradePurchased: upgrade.purchased,
		achievementAwarded: achievement.awarded
	};
	localStorage.setItem("gameSave", JSON.stringify(gameSave));
	
		var audio1 = document.getElementById('audio1');
		audio1.volume = 0.05;
		audio1.currentTime = 0;
		audio1.play();
			
}

function loadGame(){
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));
	if (localStorage.getItem("gameSave") !== null){
		if(typeof savedGame.score !== "undefined") game.score = savedGame.score;
		if(typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
		if(typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
		if(typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
		/*if(typeof savedGame.buildingCount !== "undefined") game.buildingCount = savedGame.buildingCount;
		if(typeof savedGame.buildingIncome !== "undefined") game.buildingIncome = savedGame.buildingIncome;
		if(typeof savedGame.buildingCost !== "undefined") game.buildingCost = savedGame.buildingCost;*/
		if(typeof savedGame.buildingCount !== "undefined"){
			for(i = 0; i < savedGame.buildingCount.length; i++){
				building.count[i] = savedGame.buildingCount[i]; //For new buildings
			}
		}
		if(typeof savedGame.buildingIncome !== "undefined"){
			for(i = 0; i < savedGame.buildingIncome.length; i++){
				building.income[i] = savedGame.buildingIncome[i]; //For new buildings
			}
		}
		if(typeof savedGame.buildingCost !== "undefined"){
			for(i = 0; i < savedGame.buildingCost.length; i++){
				building.cost[i] = savedGame.buildingCost[i]; //For new buildings
			}
		}
		if(typeof savedGame.upgradePurchased !== "undefined"){
			for(i = 0; i < savedGame.upgradePurchased.length; i++){
				upgrade.purchased[i] = savedGame.upgradePurchased[i]; //For new buildings
			}
		}
		if(typeof savedGame.upgradeAwarded !== "undefined"){
			for(i = 0; i < savedGame.upgradeAwarded.length; i++){
				achievement.awarded[i] = savedGame.upgradeAwarded[i]; //For new buildings
			}
		}
	}
}

function resetGame(){
	Swal.fire({
	  title: 'Are you sure?',
	  text: "You won't be able to revert this!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: "#249D9F",
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Yes reset it!'
	}).then((result) => {
		setTimeout(() => { document.getElementById('footer').style.display = "block"; }, 500);
	  if (result.isConfirmed) {
		var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
	  }
	})
	document.getElementById('footer').style.display = "none";
}

function fadeOut(element, duration, finalOpacity, callback){
	let opacity = 1;
	
	let elementFadingInterval = window.setInterval(function(){
		opacity -= 40 / duration;
		
		if (opacity <= finalOpacity){
			clearInterval(elementFadingInterval);
			callback();
		}
		
		element.style.opacity = opacity;
	}, 10);
}

function randomNumber(min, max){
	return Math.round(Math.random()* (min - max) + min);
}

function createNumberOnClicker(event) {
	let clicker = document.getElementById("clicker");//select the clicker
	
	let clickerOffset = clicker.getBoundingClientRect();//position of click - dont work bra
	let position = {
		x: event.pageX = /*clickerOffset.left + */356 + randomNumber(-130,130),
		y: event.pageY = /*clickerOffset.top + */ 286 + randomNumber(-90,90)
	}
	
	let element = document.createElement("div");//create number
	element.textContent = "+" + game.clickValue;
	element.classList.add("number", "unselectable");
	element.style.left = position.x + "px";
	element.style.top = position.y + "px";
	
	clicker.appendChild(element);//add the number
	
	let movementInterval = window.setInterval(function(){//makes the div go to top
		if(typeof element == "undefined" && element == null) clearInterval(movementInterval);
		
		position.y--;
		element.style.top = position.y + "px";
	}, 10);
	
	fadeOut(element, 5000, 0.1, function(){//Fade out
		element.remove();
	});
}

document.getElementById("clicker").addEventListener("click", function(event) {
	game.totalClicks++;
	game.addToScore(game.clickValue);
	
	createNumberOnClicker(event);
}, false);	

setInterval (function(){
	for (i = 0; i < achievement.name.length; i++){
		if (achievement.type[i] == "score" && game.totalScore >= achievement.requirement[i]) achievement.earn(i);
		else if (achievement.type[i] == "click" && game.totalClicks >= achievement.requirement[i]) achievement.earn(i);
		else if (achievement.type[i] == "building" && building.count[achievement.objectIndex[i]] >= achievement.requirement[i]) achievement.earn(i);
	}
	
	game.score += game.getScorePerSecond();
	game.totalScore += game.getScorePerSecond();
	display.updateScore();
	display.updateAchievements();
}, 1000); //1000ms = 1s

setInterval(function() {
	display.updateScore();
	display.updateUpgrades();
	display.updateShop();
}, 2000);

setInterval (function(){
    saveGame();
}, 30000); //30000ms = 30s

document.addEventListener("keydown", function(event){ // block ctrl + s and save game
    if(event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);

window.onload = function() {
	loadGame();
	display.updateScore();
	display.updateUpgrades();
	display.updateAchievements();
	display.updateShop();
}
	
					
				