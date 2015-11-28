export default {
	"replace-characters": {
		name: "Replace",
		method: function(str, args = {}) {
			var origStr = args['original-string'];
			var replacementStr = args['replacement-string'];
			if (!origStr || !replacementStr) {
				return str;
			}

			var matcher = new RegExp(args['original-string'], 'gi')

			return str.replace(matcher, replacementStr);

		},
		options: [
			{
				type: 'input',
				name: 'original-string',
				style: 'text'
			},
			{
				type: 'input',
				name: 'replacement-string',
				style: 'text'
			}
		]
	}
}
