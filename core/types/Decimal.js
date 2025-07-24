import { Property } from "./Property.js";

export class Decimal extends Property {
	type = "decimal";

	#digits   = 1;
	#decimals = 0;
	
	constructor(digits = 1, decimals = 0) {
		super();

		this.#digits   = digits;
		this.#decimals = decimals;
	}

	params() {
		return [ this.#digits, this.#decimals ];
	}

	name() {
		return `${this.type}(${this.#digits}, ${this.#decimals})`;
	}
}