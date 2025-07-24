import { mapValue } from "../tools.js";

export class Property {
	#options = {};

	type = "property";

	addOption(name, parameters) {
		if (!parameters.length) {
			if (name[0] == "-") {
				this.#options[name.substr(1)] = false;
			} else {
				this.#options[name] = true;
			}
		} else if (parameters.includes(",")) {
			this.#options[name] = parameters.split(/\s*,\s*/).map(mapValue);
		} else {
			this.#options[name] = parameters;
		}
	}

	options(name) {
		return (typeof name != "undefined" ? this.#options[name] ?? null : this.#options);
	}

	params() {
		return [];
	}

	name() {
		return this.type;
	}

	printOptions() {
		return JSON.stringify(this.#options);
	}
}