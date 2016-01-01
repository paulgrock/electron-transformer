import underscored from 'underscore.string/underscored';

export default {
	underscored: {
		name: 'Underscored',
		method(str) {
			return underscored(str);
		}
	}
};
