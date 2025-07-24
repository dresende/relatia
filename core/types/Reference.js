import { Property } from "./Property.js";

export class Reference extends Property {
	type = "reference";

	#model = "";
	#id    = "";
	
	constructor(model, id = "id") {
		super();

		this.#model = model;
		this.#id    = id;
	}

	name() {
		return `${this.type}(${this.#model}.${this.#id})`;
	}

	model() {
		return this.#model;
	}
}