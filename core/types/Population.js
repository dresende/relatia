import { mapValue, escapeId } from "../tools.js";
import { Types }              from "./Types.js";

export class Population {
	name       = "";
	properties = {};
	options    = [];

	constructor(name, options = []) {
		this.name    = name;
		this.options = options;
	}

	addProperty(name, property) {
		this.properties[name] = property;
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
		if ([ "unique", "index", "fts" ].includes(name) && !Array.isArray(value)) {
			value = [ value ];
		}

		this.options.push({ name, value });
	}

	type() {
		return "population";
	}
}