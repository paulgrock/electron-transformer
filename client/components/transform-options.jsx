import React from 'react';
import TransformOptionInput from './transform-option-input.jsx'
import TransformOptionSelect from './transform-option-select.jsx'

export default ({index, transform, handleChange, selectedTransform}) => {
	if (selectedTransform.options == null) {
		return <div />;
	}

	const AdditionalTransformOptionsList = selectedTransform.options.map((transformOption, index) => {
		if (transformOption.type === 'select') {
			return <TransformOptionSelect option={transformOption} transform={transform} key={`transform-option-select-${index}`} handleChange={handleChange} />
		}
		if (transformOption.type === 'input') {
			return <TransformOptionInput option={transformOption} transform={transform} key={`transform-option-input-${index}`}
				handleChange={handleChange} />
		}
	})

	return (
		<div>
			{AdditionalTransformOptionsList}
		</div>
	);
}
