import { Types, Alias } from "./Types.js";

export class Type {
	name       = "";
	properties = {};
	options    = {};

	constructor(name, options = {}) {
		this.name    = name;
		this.options = options;
	}

	addProperty(name, property) {
		this.properties[name] = property;

		if (name == "type") {
			Alias[this.name] = () => {
				const type = new (Types[property.type])(this.name, ...property.params());

				for (const name in property.options) {
					type.addOption(name, property.options[name]);
				}

				return type;
			};
		}
	}

	type() {
		return "type";
	}
}