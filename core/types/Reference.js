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
		this.uid   = ((model.substr(0, 58) + "_k") + Math.random().toString().substr(2, 10)).substr(0, 64);
	}

	name() {
		return `${this.type}(${this.model}.${this.id})`;
	}

	definition({ models = {}, alias }) {
		const other_model = models?.get(this.model);

		if (other_model && this.id in other_model.properties) {
			const clone = other_model.properties[this.id].clone();

			clone.name         = this.name;

			if (this.options.null) {
				clone.options.null    = true;
				clone.options.default = null;
			}

			return clone.definition();
		}

		return `${escapeId(this.name)} INT(11) UNSIGNED ${this.options.null ? "NULL DEFAULT NULL" : "NOT NULL"}`;
	}

	reference_definition() {
		return `CONSTRAINT ${escapeId(this.uid)} FOREIGN KEY (${escapeId(this.name)}) REFERENCES ${escapeId(this.model)}(${escapeId(this.id)})`;
	}
}