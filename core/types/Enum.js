import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class Enum extends Property {
	type    = "enum";
	values  = [];

	constructor(name, ...values) {
		super(name);

		this.values = values;
	}

	params() {
		return [ this.values ];
	}

	values() {
		return this.values;
	}

	name() {
		return `${this.type}(${this.values.join(",")})`;
	}
	
	definition() {
		return `${escapeId(this.name)} ENUM(${this.values.map(value => escape("" + value)).join(",")}) ${"default" in this.options ? "NOT NULL DEFAULT " + escape("" + this.options.default) : "NULL DEFAULT NULL"}`;
	}
}