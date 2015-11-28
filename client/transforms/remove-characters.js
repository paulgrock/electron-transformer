export default {
	"remove-characters": {
		name: "Remove Characters",
		method: function(str, args = {}) {
			args.from = args.from || 'start';
			var strArray = str.split('');
			if (args.from === 'start') {
				return str.slice(args.amount);
			}
			if (args.amount == null) {
				args.amount = 0
			}

			strArray.length = Math.max(strArray.length - args.amount, 0);
			return strArray.join('')
		},
		options: [
			{
				type: 'select',
				name: 'from',
				options: [
					{
						name: 'Start',
						slug: 'start'
					},
					{
						name: 'End',
						slug: 'end'
					}
				]
			},
			{
				type: 'input',
				name: 'amount',
				style: 'number'
			}
		]
	}
}
