import { Type }      from "./Type.js";
import { Model }     from "./Model.js";
import { Property }  from "./Property.js";

import { Reference } from "./Reference.js";

import { Decimal }   from "./Decimal.js";
import { Float }     from "./Float.js";
import { Number }    from "./Number.js";
import { Point }     from "./Point.js";

import { String }    from "./String.js";
import { Text }      from "./Text.js";
import { JSON }      from "./JSON.js";
import { Binary }    from "./Binary.js";

import { Date }      from "./Date.js";
import { Bool }      from "./Bool.js";
import { Enum }      from "./Enum.js";

export const Types = {
	type      : Type,
	model     : Model,
	property  : Property,

	reference : Reference,

	decimal   : Decimal,
	float     : Float,
	number    : Number,
	point     : Point,

	string    : String,
	text      : Text,
	json      : JSON,
	binary    : Binary,
	
	date      : Date,
	bool      : Bool,
	enum      : Enum,
};

export const Alias = {};
