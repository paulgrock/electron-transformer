import removeTransform from './remove-transform';

export default (index)=> {
	return (dispatch, getState) => {
		return Promise.resolve(dispatch(removeTransform(index)));
	};
};
