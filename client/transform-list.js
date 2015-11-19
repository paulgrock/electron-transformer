import slugify from 'underscore.string/slugify';

const transformList = {
	"slugify": {
		name: "Slugify",
		method: function(str) {
			return slugify(str);
		}
	},
	"upper-case": {
		name: "Upper Case",
		method: function(str) {
			return str.toUpperCase();
		}
	},
	"lower-case": {
		name: "Lower Case",
		method: function(str) {
			return str.toLowerCase();
		}
	},
	"remove-characters": {
		name: "Remove Characters",
		method: function(str, args) {
			var strArray = str.split('');
			if (args.from === "start") {
				return str.slice(args.amount);
			}
			strArray.length = strArray.length - args.amount;
			return strArray.join('')
		}
	}
};

export default transformList;
