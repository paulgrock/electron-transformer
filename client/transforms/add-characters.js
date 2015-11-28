export default {
	"add-characters": {
		name: "Add Characters",
		method: function(str, args) {
			args.from = args.from || 'start';
			if (args["additional-characters"] == null) {
				return str;
			}

			if (args.from === 'start') {
				return args["additional-characters"] + str;
			}

			if (args.from === 'end') {
				return str + args["additional-characters"];
			}
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
				name: 'additional-characters',
				style: 'text'
			}
		]
	}
}
