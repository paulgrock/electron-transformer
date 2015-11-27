import slugify from 'underscore.string/slugify';

export default {
	"slugify": {
		name: "Slugify",
		method: function(str) {
			return slugify(str);
		}
	}
}
