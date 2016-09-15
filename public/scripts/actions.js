function goToDungeon() {

	//Выбыраем монстра для битвы
	var monsterId = (Math.random() * (2 - 0) + 0).toFixed(0);
	var monster = monsters[monsterId];

	console.log("Ваш противник " + monster.name + " с силой удара " + monster.dmg + " и здоровьем " + monster.hp);

	var intervalID = setInterval(function(){
		var dmg = monster.dmg;
		player.hp -= dmg;
		
		console.log("Вам нанесли урон: " + dmg.toFixed(0));

		var playerDmg = player.dmg;
		monster.hp -= playerDmg;

		console.log("Вы нанесли урон: " + playerDmg.toFixed(0));

		if (player.hp <= 0) {
			player.reload();
			console.log("Вы умерли. Игра начата заново!");
			return clearInterval(intervalID);
		}

		if (monster.hp <= 0) {
			clearInterval(intervalID);
			var gold = Math.random() * (player.level * 20 - (player.level * 10)) + (player.level * 10);
			player.money += gold;
			console.log("Вы получили золото: " + gold.toFixed(1));
			var exp = 55;
			player.exp += exp;
			console.log("Вы получили опыт: " + exp)
		}
	}, 100)
};	

function heal() {
	if (player.money >= 15) {
		player.money -= 15;
		player.hp += 10;
		if (player.hp > player.maxHp) {
			player.hp = player.maxHp;
		}
	}
};




