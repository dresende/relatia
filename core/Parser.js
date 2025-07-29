import { readFile } from "node:fs/promises";
import * as Types   from "./types/Types.js";
import { mapValue } from "./tools.js";

export class Parser {
	#blocks = {
		models      : {},
		types       : {},
		populations : {},
	}

	types() {
		return Object.values(this.#blocks.types);
	}

	models() {
		return Object.values(this.#blocks.models);
	}

	populations() {
		return Object.values(this.#blocks.populations);
	}

	async parseFile(filename) {
		return await this.parseData(await readFile(filename));
	}

	async parseData(data) {
		const lines = data.toString().split(/\r?\n/).map(line => line.replace(/\/\/.*$/, "").trimEnd());
		let   block = null;
		let   type  = "";

		for (const line of lines) {
			if (!line.length) continue;

			if (line.startsWith("\t")) {
				// previous block
				if (!block) continue;

				this.#addProperty(block, line.trim());
			} else {
				if (block !== null) {
					this.#blocks[`${type}s`][block.name] = block;
				}

				// new block
				block = this.#getBlock(line);
				type  = block.type();
			}
		}

		if (block !== null) {
			this.#blocks[`${type}s`][block.name] = block;
		}

		return this;
	}

	#getBlock(header) {
		const parts = header.split(/\s+/);
		const type  = parts[0].substring(1).toLowerCase();
		const name  = parts[1];

		if (type in Types.Types) {
			return new (Types.Types[type])(name);
		}

		throw new Error(`Unknown block type '${type}'`);
	}

	#addProperty(block, line) {
		const name = line.split(/\s+/, 1)[0];

		if (name.includes("(")) {
			const parameters = [ ... line.matchAll(/(?<name>[\w\-]+)(\((?<options>[^\)]+)\))?/g) ];

			for (const { groups } of parameters) {
				block.addOption(groups.name, groups.options || "");
			}
			return;
		}

		const definition      = line.substring(name.length).trim();
		const parameters      = [ ... definition.matchAll(/(?<name>[\w\-]+)(\((?<options>[^\)]+)\))?/g) ];
		const first_parameter = parameters.shift();
		const type            = first_parameter.groups.name.toLowerCase();
		const options         = this.#parseOptionValue(first_parameter.groups.options || "");
		let   property        = null;

		if (type in Types.Types) {
			property = new (Types.Types[type])(name, ...options);
		} else if (type in Types.Alias) {
			property = Types.Alias[type](name, ...options);
		} else {
			property = new (Types.Types.property)(name, ...options);
		}

		for (const { groups } of parameters) {
			property.addOption(groups.name, groups.options || "");
		}

		block.addProperty(name, property);
	}

	#parseOptionValue(value, alwaysArray = false) {
		if (value.includes(",")) {
			return value.split(/\s*,\s*/).map(mapValue);
		} else {
			return [ mapValue(value) ];
		}
	}
}