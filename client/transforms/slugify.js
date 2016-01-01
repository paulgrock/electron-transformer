import slugify from 'underscore.string/slugify';

export default {
	slugify: {
		name: 'Slugify',
		method(str) {
			return slugify(str);
		}
	}
};
