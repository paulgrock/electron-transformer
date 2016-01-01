export default {
	'replace-characters': {
		name: 'Replace',
		method(str, args = {}) {
			const origStr = args['original-string'];
			const replacementStr = args['replacement-string'];
			if (!origStr || !replacementStr) {
				return str;
			}

			const matcher = new RegExp(args['original-string'], 'gi');
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
};
