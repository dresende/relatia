import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class String extends Property {
	type    = "string";
	size    = 50;
	options = {
		default : "",
	};

	constructor(name, size) {
		super(name);

		this.size = size;
	}

	params() {
		return [ this.size ];
	}

	size() {
		return this.size;
	}

	name() {
		return `${this.type}(${this.size})`;
	}
	
	definition() {
		return `${escapeId(this.name)} ${this.options.fixed ? "CHAR" : "VARCHAR"}(${this.size}) ${this.options.null ? "NULL" : "NOT NULL"} DEFAULT ${escape(this.options.null && (this.options.default == "" || this.options.default == "null") ? null : this.options.default)}`;
	}
}