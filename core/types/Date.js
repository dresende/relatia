import { Property } from "./Property.js";
import { escapeId } from "../tools.js";

export class Date extends Property {
	type    = "date";
	options = {
		null : true,
	};
	
	constructor(name) {
		super(name);
	}
	
	definition() {
		if (this.options.auto) {
			this.options.null    = false;
			this.options.default = "CURRENT_TIMESTAMP";
		}

		if (this.options.time === false) {
			return `${escapeId(this.name)} DATE ${this.options.null ? "NULL DEFAULT NULL" : "NOT NULL"}`;
		}

		return `${escapeId(this.name)} DATETIME ${this.options.null ? "NULL" : "NOT NULL"}${this.options.default ? ` DEFAULT ${this.options.default}` : ""}`;
	}
}