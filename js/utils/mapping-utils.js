class Mapping {

    constructor(){
        this.id = 1;
        this.map = {};
    }

    size(){
        return Object.keys(this.map).length;
    }

    addIfNotFind(name){
        if (!this.map[name]) {
            this.map[name] = this.id++;
        }
    }

    searchByName(name){
        return this.map[name];
    }

    searchByValue(value){

        for (var i in this.map) {
            if (this.map[i] == value) {
                return i;
            }
        }

        return "";
    }
}
