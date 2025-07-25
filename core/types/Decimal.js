import { Property } from "./Property.js";
import { escapeId, escape } from "../tools.js";

export class Decimal extends Property {
	type     = "decimal";
	digits   = 1;
	decimals = 0;
	options  = {
		default : 0,
	}
	
	constructor(name, digits = 1, decimals = 0) {
		super(name);

		this.digits   = digits;
		this.decimals = decimals;
	}

	params() {
		return [ this.digits, this.decimals ];
	}

	digits() {
		return this.digits;
	}

	decimals() {
		return this.decimals;
	}

	name() {
		return `${this.type}(${this.digits}, ${this.decimals})`;
	}
	
	definition() {
		return `${escapeId(this.name)} DECIMAL(${this.digits},${this.decimals})${this.options.unsigned ? " UNSIGNED" : ""} ${this.options.null ? "NULL" : "NOT NULL"} DEFAULT ${escape(this.options.default)}`;
	}
}