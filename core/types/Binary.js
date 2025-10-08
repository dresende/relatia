import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class Binary extends Property {
	type    = "binary";
	options = {
		null : true,
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
		return `${escapeId(this.name)} LONGBLOB ${this.options.null ? "NULL" : "NOT NULL"}`;
	}
}