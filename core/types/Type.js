import { Types, Alias } from "./Types.js";

export class Type {
	#name       = "";
	#properties = {};
	#options    = {};

	constructor(name, options = {}) {
		this.#name    = name;
		this.#options = options;
	}

	addProperty(name, property) {
		this.#properties[name] = property;

		if (name == "type") {
			Alias[this.#name] = () => {
				return new (Types[property.type])(...property.params());
			};
		}
	}

	type() {
		return "type";
	}
}