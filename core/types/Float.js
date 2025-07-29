import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class Float extends Property {
	type    = "float";
	options = {
		default : 0,
	};

	constructor(name) {
		super(name);
	}

	params() {
		return [];
	}

	name() {
		return this.type;
	}
	
	definition() {
		return `${escapeId(this.name)} FLOAT ${this.options.null ? "NULL" : "NOT NULL"} DEFAULT ${escape(this.options.default)}`;
	}
}