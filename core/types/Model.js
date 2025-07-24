import { mapValue } from "../tools.js";

export class Model {
	#name       = "";
	#properties = {};
	#options    = []; // options are repeatable, so we use an array

	constructor(name, options = []) {
		this.#name    = name;
		this.#options = options;
	}

	addProperty(name, property) {
		this.#properties[name] = property;
	}

	addOption(name, parameters) {
		if (!parameters.length) {
			if (name[0] == "-") {
				this.#addOption(name.substr(1), false);
			} else {
				this.#addOption(name, true);
			}
		} else if (parameters.includes(",")) {
			this.#addOption(name, parameters.split(/\s*,\s*/).map(mapValue));
		} else {
			this.#addOption(name, parameters);
		}
	}

	#addOption(name, value) {
		if ([ "unique", "index" ].includes(name) && !Array.isArray(value)) {
			value = [ value ];
		}

		this.#options.push({ name, value });
	}

	name() {
		return this.#name;
	}

	type() {
		return "model";
	}

	options(name) {
		return (name in this.#options ? this.#options[name] : this.#options);
	}

	properties(name) {
		return (name in this.#properties ? this.#properties[name] : this.#properties);
	}

	depends() {
		return Object.keys(this.#properties).filter(name => this.#properties[name].type === "reference").map(name => this.#properties[name].model());
	}
}