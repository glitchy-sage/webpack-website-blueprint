class Counter {

    #value;

    constructor(){
        this.#value=0;
    }

    get value() {
        return this.#value;
    }

    incrementCounter() {
        this.#value++;
    }

}

export default Counter;