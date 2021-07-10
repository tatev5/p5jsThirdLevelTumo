let Main = require('./Main')
module.exports = class Hospital extends Main {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 20;
    
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
    };
    chooseCell(character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0]
            var y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found
    };
    mul() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)];
        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];
            let hospital = new Hospital(x, y)
            matrix[y][x] = 7
            hosArr.push(hospital)
            this.energy = 20
        }
    }
    eat() {
        let found = this.chooseCell(8);
        let exact = found[Math.floor(Math.random() * found.length)];
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (var i = 0; i < personArr.length; i++) {
                if (x == personArr[i].x && y == personArr[i].y) {
                    personArr.splice(i, 8)
                }
            }
            matrix[y][x] = 7;
            matrix[this.y][this.x] = 0
            this.x = x;
            this.y = y;
            if (this.energy > 30) {
                this.mul();
            }

        } else {
            this.move()
        }
    };
    move() {
        let found = this.chooseCell(0);
        let exact = found[Math.floor(Math.random() * found.length)];
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 7;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die()
            } else {
                this.energy--
                if (this.energy < 0) {
                    this.die()
                }
            }
        }
    };
    die() {
        for (var i = 0; i < hosArr.length; i++) {
            if (hosArr[i].x == this.x && hosArr[i].y == this.y) {
                hosArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0

    }

}