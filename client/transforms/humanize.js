import humanize from 'underscore.string/humanize';

export default {
	"humanize": {
		name: "Humanize",
		method: function(str) {
			return humanize(str);
		}
	}
}
