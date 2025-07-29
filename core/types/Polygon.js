import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class Polygon extends Property {
	type    = "polygon";
	options = {
		default : "",
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
		return `${escapeId(this.name)} POLYGON ${this.options.null ? "NULL DEFAULT NULL" : `NOT NULL DEFAULT ${escape(this.options.default)}`}`;
	}
}