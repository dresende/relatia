import { Property } from "./Property.js";
import { escapeId } from "../tools.js";

export class Reference extends Property {
	type    = "reference";
	model   = "";
	id      = "";
	options = {
		null : true, // optional, not mandatory
	};
	
	constructor(name, model, id = "id") {
		super(name);

		this.model = model;
		this.id    = id;
	}

	name() {
		return `${this.type}(${this.model}.${this.id})`;
	}

	definition() {
		return `${escapeId(this.name)} INT(11) UNSIGNED ${this.options.null ? "NULL DEFAULT NULL" : "NOT NULL"}`;
	}

	reference_definition() {
		return `FOREIGN KEY (${escapeId(this.name)}) REFERENCES ${escapeId(this.model)}(${escapeId(this.id)})`;
	}
}