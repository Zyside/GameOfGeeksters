var player = {
	name : "Принц Скурпя",
	level : 1,
	hp : 100,
	sp : 100,
	exp : 0,
	dmg : 5,
	money : 100,
	maxHp : 100,
	nextLvlExp : 100,

	reload : function() {
		this.name = "Name";
		this.level = 1;
		this.hp = 100;
		this.sp = 100;
		this.dmg = 5;
		this.exp = 0;
		this.money = 100;
		this.nextLvlExp = 100;
		this.maxHp = 100;
	},
	
	checkLvl : function() {
		if (this.exp > this.nextLvlExp) {
			this.nextLvlExp = this.nextLvlExp + (this.level * 6);
			this.level += 1;
			this.exp -= 100;
			this.maxHp += 20;
			this.dmg = this.dmg + this.level;
		}
	},

	items : []
};
