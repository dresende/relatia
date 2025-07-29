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

	definition({ models = {}, alias }) {
		const other_model = models?.get(this.model);

		if (other_model && this.id in other_model.properties) {
			const clone = other_model.properties[this.id].clone();

			clone.name         = this.name;
			clone.options.null = this.options.null;

			delete clone.options.default;

			return clone.definition({ no_default: true });
		}

		return `${escapeId(this.name)} INT(11) UNSIGNED ${this.options.null ? "NULL DEFAULT NULL" : "NOT NULL"}`;
	}

	reference_definition() {
		return `FOREIGN KEY (${escapeId(this.name)}) REFERENCES ${escapeId(this.model)}(${escapeId(this.id)})`;
	}
}