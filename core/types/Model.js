import { mapValue, escapeId } from "../tools.js";
import { Types }              from "./Types.js";

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

		if (property.type === "reference" && !this.#depends.includes(property.model) && property.model !== this.name && property.options.loop !== true && property.options.deprecated !== true) {
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

	definition({ models = {}, references = true }) {
		const table_commands = [];

		if (!("id" in this.properties)) {
			const id = new Types.number("id", 11);
			id.addOption("unsigned");

			this.addProperty("id", id);
		}

		// id
		table_commands.push(`${this.properties.id.definition({ no_default: true })} PRIMARY KEY AUTO_INCREMENT`);
		// if ("id" in this.properties) {
			
		// } else {
		// 	table_commands.push(`${escapeId("id")} INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT`);
		// }

		// columns
		for (const name in this.properties) {
			if (name === "id") continue;

			table_commands.push(this.properties[name].definition({ models }));
		}

		// references
		if (references) {
			for (const name in this.properties) {
				const property = this.properties[name];

				if (property.type == "reference") {
					table_commands.push(property.reference_definition());
				}
			}
		}

		this.options.map(option => {
			switch (option.name) {
				case "index":
					try {
						const command = (option.value.some(name => this.properties[name].spatial) ? "SPATIAL " : "") + "INDEX";

						table_commands.push(`${command} (${option.value.map(escapeId).join(", ")})`);
					} catch (err) {
						console.log(this.name, this.properties);

						throw err;
					}
					break;
				case "unique":
					table_commands.push(`UNIQUE (${option.value.map(escapeId).join(", ")})`);
					break;
				case "fts":
					table_commands.push(`FULLTEXT (${option.value.map(escapeId).join(", ")})`);
					break;
			}
		});

		return `CREATE TABLE ${escapeId(this.name)} (\n\t${table_commands.join(",\n\t")}\n)`;
	}
}