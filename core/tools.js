export const mapValue = (value) => {
	if (value.match(/^[oxb]?\d+$/)) {
		return +value;
	}

	if (value === "true" || value === "false") {
		return value === "true";
	}

	return value.trim();
};