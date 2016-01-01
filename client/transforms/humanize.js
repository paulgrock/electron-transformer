import humanize from 'underscore.string/humanize';

export default {
	humanize: {
		name: 'Humanize',
		method(str) {
			return humanize(str);
		}
	}
};
