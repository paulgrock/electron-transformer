import slugify from 'underscore.string/slugify';

const transformList = {
	slugify: {
		name: "Slugify",
		method: function(name) {
			return slugify(name);
		}
	},
	"upper-case": {
		name: "Upper Case",
		method: function(name) {
			return name.toUpperCase();
		}
	},
	"lower-case": {
		name: "Lower Case",
		method: function(name) {
			return name.toLowerCase();
		}
	}
};

export default transformList;
