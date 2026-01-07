import { Property } from "./Property.js";
import { escape, escapeId } from "../tools.js";

export class Point extends Property {
	type    = "point";
	spatial = true;
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
		return `${escapeId(this.name)} POINT ${this.options.null ? "NULL" : "NOT NULL"}`;
	}
}