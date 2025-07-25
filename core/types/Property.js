import { mapValue } from "../tools.js";

export class Property {
	name    = "";
	type    = "property";
	options = {};

	constructor(name) {
		this.name = name;
	}

	addOption(name, parameters) {
		if (!parameters.length) {
			if (name[0] == "-") {
				this.options[name.substr(1)] = false;
			} else {
				this.options[name] = true;
			}
		} else if (parameters.includes(",")) {
			this.options[name] = parameters.split(/\s*,\s*/).map(mapValue);
		} else {
			this.options[name] = parameters;
		}
	}

	params() {
		return [];
	}

	name() {
		return this.type;
	}

	printOptions() {
		return JSON.stringify(this.options);
	}

	definition() {
		console.log("Property definition not implemented for type:", this.type);
	}
}