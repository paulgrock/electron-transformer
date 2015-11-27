import slugify from 'underscore.string/slugify';

const transformList = {
	"noop": {
		name: "Select a transform",
		method: function(str) {
			return str;
		}
	},
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
	},
	"add-characters": {
		name: "Add Characters",
		method: function(str, args) {
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
	},
	"replace-characters": {
		name: "Replace",
		method: function(str, args) {
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
};

export default transformList;
