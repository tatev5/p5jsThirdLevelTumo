let Main = require('./Main')
module.exports= class Person  extends Main{
    constructor(x, y, index, multiply) {
        super(x, y, index, multiply);
        this.multiplay = 0;
    }
 
    mul() {
        this.multiplay++;
        var found = this.chooseCell(0)
        var exact = found[Math.floor(Math.random() * found.length)];
        if (exact && this.multiplay > 6) {
            let x = exact[0]
            let y = exact[1]
            let person = new Person(x, y,1)
            personArr.push(person)
            this.multiplay = 0
    
        }
    }


}