class Input {
    callbacks = {};
    character = null;

    constructor(character) {
        this.character = character;
    }

    bind(name, callback, parameters) {
        if (typeof callback !== "function")
            return;

        this.callbacks[name] = {
            "callback": callback,
            "parameters": parameters
        };
    }

    trigger(name, parameters = null) {
        if(!(name in this.callbacks))
            return;

        if (parameters == null)
            this.callbacks[name].callback(this.callbacks[name].parameters);
        else
            this.callbacks[name].callback(parameters);
    }
}

export default Input;