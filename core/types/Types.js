import { Property }  from "./Property.js";
import { Model }     from "./Model.js";
import { Type }      from "./Type.js";
import { Reference } from "./Reference.js";
import { String }    from "./String.js";
import { Date }    from "./Date.js";
import { Decimal }    from "./Decimal.js";
import { Bool }    from "./Bool.js";

export const Types = {
	type      : Type,
	model     : Model,

	reference : Reference,
	string    : String,
	date      : Date,
	bool      : Bool,
	decimal   : Decimal,
	property  : Property,
};

export const Alias = {};
