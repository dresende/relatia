import { Property } from "./Property.js";
import { escapeId, escape } from "../tools.js";

export class Text extends Property {
	type    = "text";
	options = {};
	
	constructor(name) {
		super(name);
	}

	definition() {
		return `${escapeId(this.name)} ${this.options.long ? "LONG" : ""}TEXT ${this.options.null ? `NULL DEFAULT ${"default" in this.options ? escape(this.options.default) : "NULL"}` : `NOT NULL DEFAULT ${escape(this.options.default || "")}`}`;
	}
}