import { mapValue, escapeId } from "../tools.js";

export class Model {
	name       = "";
	properties = {};
	options    = [];  // options are repeatable, so we use an array
	#depends   = [];

	constructor(name, options = []) {
		this.name    = name;
		this.options = options;
	}

	addProperty(name, property) {
		this.properties[name] = property;

		if (property.type === "reference" && !this.#depends.includes(property.model)) {
			this.addDependency(property.model);
		}
	}

	addOption(name, parameters) {
		if (!parameters.length) {
			if (name[0] == "-") {
				this.#addOption(name.substr(1), false);
			} else {
				this.#addOption(name, true);
			}
		} else if (parameters.includes(",")) {
			this.#addOption(name, parameters.split(/\s*,\s*/).map(mapValue));
		} else {
			this.#addOption(name, parameters);
		}
	}

	#addOption(name, value) {
		if ([ "unique", "index", "fts" ].includes(name) && !Array.isArray(value)) {
			value = [ value ];
		}

		this.options.push({ name, value });
	}

	type() {
		return "model";
	}

	dependencies() {
		return this.#depends;
	}

	addDependency(model) {
		this.#depends.push(model);
	}

	removeDependency(model) {
		this.#depends = this.#depends.filter(dep => dep !== model);
	}

	definition() {
		const table_commands = [];

		// id
		table_commands.push(`${escapeId("id")} INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT`);

		// columns
		for (const name in this.properties) {
			table_commands.push(this.properties[name].definition());
		}

		// references
		for (const name in this.properties) {
			const property = this.properties[name];

			if (property.type == "reference") {
				table_commands.push(property.reference_definition());
			}
		}

		this.options.map(option => {
			switch (option.name) {
				case "index":
				case "unique":
					table_commands.push(`${option.name.toUpperCase()} (${option.value.map(escapeId).join(", ")})`);
					break;
				case "fts":
					table_commands.push(`FULLTEXT (${option.value.map(escapeId).join(", ")})`);
					break;
			}
		});

		return `CREATE TABLE ${escapeId(this.name)} (\n\t${table_commands.join(",\n\t")}\n)`;
	}
}