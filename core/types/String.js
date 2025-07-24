import { Property } from "./Property.js";

export class String extends Property {
	type = "string";

	#size = 50;
	
	constructor(size) {
		super();

		this.#size = size;
	}

	params() {
		return [ this.#size ];
	}

	name() {
		return `${this.type}(${this.#size})`;
	}
}