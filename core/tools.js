export const mapValue = (value) => {
	if (value.match(/^[oxb]?\d+$/)) {
		return +value;
	}

	if (value === "true" || value === "false") {
		return value === "true";
	}

	return value.trim();
};

export function escape(val, stringifyObjects) {
	if (val === undefined || val === null) return "NULL";

	switch (val_type(val)) {
		case "boolean": return (val) ? "true" : "false";
		case "number":  return val + "";
		case "buffer":  return bufferToString(val);
		case "array":   return arrayToList(val);
		case "date":    return dateToString(val);
		case "object":
			if (!stringifyObjects) return objectToValues(val);

			val = val.toString();
			break;
	}

	return "'" + val.replace(/[\0\n\r\b\t\\\'\"\x1a]/g, (s) => {
		switch (s) {
			case "\0":   return "\\0";
			case "\n":   return "\\n";
			case "\r":   return "\\r";
			case "\b":   return "\\b";
			case "\t":   return "\\t";
			case "\x1a": return "\\Z";
			default:     return "\\"+s;
		}
	}) + "'";
}

export function escapeId(val, forbidQualified) {
	if (Array.isArray(val)) {
		return val.map((el) => (escapeId(el, forbidQualified))).join(", ");
	}

	if (forbidQualified) {
		return "`" + val.replace(/`/g, "``") + "`";
	}

	return "`" + val.replace(/`/g, "``").replace(/\./g, "`.`") + "`";
}

function val_type(val) {
	if (Buffer.isBuffer(val)) return "buffer";
	if (Array.isArray(val))   return "array";
	if (val instanceof Date)  return "date";

	return (typeof val);
}

function objectToValues(object) {
	return Object.keys(object).filter(
		(key) => (typeof object[key] != "function")
	).map(
		(key) => (`${escapeId(key)} = ${escape(object[key], true)}`)
	);
}

function dateToString(date) {
	const dt = new Date(date);

	return pad(dt.getUTCFullYear(), 4) + "-" +
	       pad(dt.getUTCMonth() + 1, 2) + "-" +
	       pad(dt.getUTCDate(), 2) + " " +
	       pad(dt.getUTCHours(), 2) + ":" +
	       pad(dt.getUTCMinutes(), 2) + ":" +
	       pad(dt.getUTCSeconds(), 2) + "." +
	       pad(dt.getUTCMilliseconds(), 3);
}

function arrayToList(array, tz) {
	const sql = [];

	array.map((el) => {
		sql.push(Array.isArray(el) ? `(${arrayToList(el, tz)})` : escape(el, true, tz));
	});

	return sql.join(", ");
}

function bufferToString(buffer) {
	return "X'" + buffer.toString("hex") + "'";
}

function pad(str, len) {
	str = str.toString();

	while (str.length < len) {
		str = "0" + str;
	}

	return str;
}
