import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class JSON extends Property {
	type    = "json";
	options = {};

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
		return `${escapeId(this.name)} JSON ${this.options.null ? `NULL DEFAULT ${"default" in this.options ? escape(this.options.default) : "NULL"}` : `NOT NULL DEFAULT ${escape(this.options.default || "")}`}`;
	}
}