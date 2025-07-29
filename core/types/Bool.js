import { Property } from "./Property.js";
import { escapeId } from "../tools.js";

export class Bool extends Property {
	type = "bool";
	
	constructor(name) {
		super(name);
	}

	definition() {
		return `${escapeId(this.name)} TINYINT(1) UNSIGNED ${this.options.null ? "NULL" : "NOT NULL"} DEFAULT ${!!this.options.default ? 1 : 0}`;
	}
}