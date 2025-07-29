import { Property } from "./Property.js";
import { escapeId, escape } from "../tools.js";

export class Number extends Property {
	type     = "number";
	digits   = 1;
	options  = {
		default : 0,
	}
	
	constructor(name, digits = 1) {
		super(name);

		this.digits = digits;
	}

	params() {
		return [ this.digits ];
	}

	digits() {
		return this.digits;
	}

	name() {
		return `${this.type}(${this.digits})`;
	}
	
	definition({ no_default = false } = {}) {
		let type = "INT";

		if (this.digits > 11) {
			type = "BIGINT";
		} else if (this.digits == 1) {
			type = "TINYINT";
		} else if (this.digits <= 3) {
			type = "SMALLINT";
		}

		if (typeof this.options.default != "number" && +this.options.default > 0) {
			this.options.default = +this.options.default;
		}

		return `${escapeId(this.name)} ${type}(${this.digits})${this.options.unsigned ? " UNSIGNED" : ""} ${this.options.null ? "NULL" : "NOT NULL"}${!no_default ? ` DEFAULT ${escape(this.options.default)}` : ""}`;
	}
}