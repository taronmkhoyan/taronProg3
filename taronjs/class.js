class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 7;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.multiply >= 10) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 1
            let gr = new Grass(newX, newY)
            grassArr.push(gr)
            this.multiply = 0
        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell ){
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2
            let gr = new GrassEater(newX, newY)
            grassEaterArr.push(gr)
            this.energy = 8
        }
    }

    move(){
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if(newCell && this.energy >= 0){
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }else{
            this.die()
        }
    }

    eat(){
        let emptyCells = this.chooseCell(1)
        let newCell = random(emptyCells)
        if(newCell){
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if(this.energy >= 13){
                this.mul()
            }
            
        }else{
            this.move()
        }
    }


    die(){
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

}


class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 3;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.multiply >= 10) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 5
            let bomb = new Bomb(newX, newY)
            BombArr.push(bomb)
        }
    }

    eat(){
        let emptyCells = this.chooseCell(1)
        let newCell = random(emptyCells)
        if(newCell){
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    
                }
            }
            for(var j in GrassEaterArr){
                if(newX == GrassEaterArr[i].x && newY == GrassEaterArr[i].y){
                    GrassEaterArr.splice(i,1);
                    break;
                }
            }
            if(this.energy >= 13){
                this.mul()
            }
            
        }else{
            this.move()
        }
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
    }
}


class Predator {
    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.multiply = 8;
        this.energy = 35;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let gr = new Predator(newX, newY)
            PredatorArr.push(gr)
            this.energy = 8
        }
    }

    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell && this.energy >= 0) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }


    //predator(red) eats yellow
    eat() {
        let emptyCells = this.chooseCell(2)
        let newCell = random(emptyCells)
        if (newCell) {
            this.energy++
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            // if (this.energy >= 13) {
            //    this.mul()
            // }
        } else {
            this.move()
        }
    }

    //predator eats black
     eatVict() {
     let emptyCells = this.chooseCell(4)
     let newCell = random(emptyCells)
         if (newCell) {
             this.energy++
             let newX = newCell[0]
             let newY = newCell[1]
             matrix[newY][newX] = matrix[this.y][this.x]
             matrix[this.y][this.x] = 0
             this.x = newX
             this.y = newY
             for (var i in VictimArr) {
                 if (newX == VictimArr[i].x && newY == VictimArr[i].y) {
                     VictimArr.splice(i, 1);
                     for(let i = 0; i <= matrix.length; i++){
                     let newX1 = newCell[0]
                     let newY1 = newCell[1]
                     matrix[newX1][newY1] = 5
                     let bomb = new Bomb(newX1, newY1)
                     BombArr.push(bomb)
                     }
                     break;
                 }
                 else {
                     this.move()
                 }
             }
         }
     }

    die() {
        matrix[this.y][this.x] = 0
        for (var i in PredatorArr) {
            if (this.x == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1);
                break;
            }
        }
    }

}

class Victim {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    mul() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 4
            let vict = new Victim(newX, newY)
            VictimArr.push(vict)
            
        }
    }

    move() {
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } 
    }
}








































