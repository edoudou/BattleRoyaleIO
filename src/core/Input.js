class Input {
    callbacks = [];

    bind(name, callback, parameters) {
        if (typeof callback !== "function")
            return;

        this.callbacks[name] = {
            "callback": callback,
            "parameters": parameters
        };
    }

    trigger(name) {
        if(!(name in this.callbacks))
            return;

        this.callbacks[name].callback(this.callbacks[name].parameters);
    }
}

export default Input;