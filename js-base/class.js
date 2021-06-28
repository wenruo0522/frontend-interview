
class Student {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    sayHi() {
        console.log(`name: ${this.name}, age: ${this.age}`)
    }
}

const baby = new Student('baby', 23)
console.log(baby.name)  //  baby
console.log(baby.age) //  23
baby.sayHi()  //  name: baby, age: 23

//  父类
class People {
    constructor(name) {
        this.name = name
    }

    eat() {
        console.log(`${this.name} eat something`)
    }
}

//  子类
class Teacher extends People {
    constructor(name, subject) {
        super(name)
        this.subject = subject
    }

    teach() {
        console.log(`${this.name} teach ${this.subject}`)
    }
}

const MissYang = new Teacher('Miss Yang', 'physics')
console.log(MissYang.name)  //  Miss Yang
console.log(MissYang.subject)  //  physics
MissYang.eat()  //  Miss Yang eat something
MissYang.teach()  //  Miss Yang teach physics

// 子类
class Staff extends People {
    constructor(name, gender) {
        super(name)
        this.gender = gender
    }

    basic() {
        console.log(`name: ${this.name}, gender: ${this.gender}`)
    }
}

const roomCleaner = new Staff('bob', 'male')
console.log(roomCleaner.name)   //  bob
console.log(roomCleaner.gender)  //  male
roomCleaner.eat()  //  bob eat something
roomCleaner.basic()  //  name: bob, gender: male

console.log(roomCleaner.__proto__ === Staff.prototype)  //  true
console.log(Staff.prototype.__proto__ === People.prototype)  //  true
console.log(People.prototype.__proto__ === Object.prototype)  //  true