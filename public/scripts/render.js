setInterval(function() {
	$("#name").html(player.name);
	$("#level").html(player.level);
	$("#exp").html(player.exp);
	$("#hp").html(player.hp.toFixed(1));
	$("#sp").html(player.sp);
	$("#money").html(player.money.toFixed(1));
	$("#item").html(player.item);
	$("#nextlvlexp").html(player.nextLvlExp);
	$("#maxhp").html(player.maxHp);
	$("#dmg").html(player.dmg);
	$("#items").html()
	player.checkLvl();
},500);
