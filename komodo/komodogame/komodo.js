




class World {
    constructor() {
        this.rooms = []
        this.turns = 0
    }
    add(rm) {
        this.rooms.push(rm)
    } 
    get(nam) {
        let chili
        this.rooms.forEach((rm) => {if (rm.name == nam) {chili = rm}})
        return chili
    }
    ver() {
        let nameArr = this.rooms.map((rm)=>{
            return rm.name.trim().toLowerCase()
        })
        if (this.hasDuplicates(nameArr)) {
            console.warn("There are two rooms with the same name!")
        }
    }
    hasDuplicates(array) {
        return (new Set(array)).size !== array.length;
    }
}

class Room {
    constructor(name, desc, contents, dirs, features) {
        this.name = name
        this.desc = desc
        this.contents = contents
        this.dirs = dirs
        this.features = features
    }
}

bob = new World()
golly = new Room("attic ", "b", "c", "d", "e")
golly1 = new Room("Attic", "b", "c", "d", "e")
bob.add(golly)
bob.add(golly1)
bob.ver()
