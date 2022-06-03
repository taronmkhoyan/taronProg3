

function generator(matLen, gr, grEat, Pred, Vict, alleat) {
	let matrix = [];
	for (let i = 0; i < matLen; i++) {
		matrix[i] = [];
		for (let j = 0; j < matLen; j++) {
			matrix[i][j] = 0;
		}
	}
	for (let i = 0; i < gr; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 1;
		}
	}
	for (let i = 0; i < grEat; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 2;
		}
	}
	for (let i = 0; i < Pred; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 3;
		}
	}
	for (let i = 0; i < Vict; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 4;
		}
	}
	
	for (let i = 0; i < alleat; i++) {
		let x = Math.floor(Math.random() * matLen);
		let y = Math.floor(Math.random() * matLen);
		if (matrix[x][y] == 0) {
			matrix[x][y] = 5;
		}
	}
	
	return matrix;
}

let side = 25;

var matrix = generator(30, 50, 30, 18, 3, 10);

var grassArr = [];
var grassEaterArr = [];
var PredatorArr = [];
var VictimArr = [];
var BombArr = [];


function setup() {
	frameRate(5);
	createCanvas(matrix[0].length * side, matrix.length * side);
	background('#acacac');

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				let gr = new Grass(x, y)
				grassArr.push(gr)
			}
			else if (matrix[y][x] == 2) {
				let grEat = new GrassEater(x, y)
				grassEaterArr.push(grEat)
			}
			else if (matrix[y][x] == 3) {
				let grPred = new Predator(x, y)
				PredatorArr.push(grPred)
			}
			else if (matrix[y][x] == 4) {
				let grVict = new Victim(x, y)
				VictimArr.push(grVict)
			}
			else if (matrix[y][x] == 5) {
				let bomb = new Bomb(x, y)
				BombArr.push(bomb)
			}

		}
	}


}


function draw() {

	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {

			if (matrix[y][x] == 1) {
				fill("green");
			} else if (matrix[y][x] == 2) {
				fill("yellow");
			}
			else if (matrix[y][x] == 0) {
				fill("#acacac");
			} else if (matrix[y][x] == 3) {
				fill("red")
			}
			else if (matrix[y][x] == 4) {
				fill("black")
			}
			else if (matrix[y][x] == 5) {
				fill("blue")
			}

			rect(x * side, y * side, side, side);


		}
	}
	for (var i in grassArr) {
		grassArr[i].mul();
	}

	for (let i in grassEaterArr) {
		grassEaterArr[i].eat()
	}

	for (let i in PredatorArr) {
		PredatorArr[i].eat()
	}

	for (let i in VictimArr) {
		VictimArr[i].move()
	}

	let count = VictimArr.length

	for (let i in PredatorArr) {
		PredatorArr[i].eatVict()
	}



	for (let j in BombArr) {
		if (count > VictimArr.length) {
			for (let h in BombArr) {
				BombArr[h].mul()
			}
		}
	}

	for (let j in BombArr) {
		if (count > VictimArr.length) {
			for (let f in Bomb) {
				BombArr[f].eat()
			}
		}
	}


}










