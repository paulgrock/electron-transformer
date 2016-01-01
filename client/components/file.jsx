import React from 'react';

export default ({file}) => (
	<tr>
		<td>{file.originalFileName}</td>
		<td>{file.updatedFileName}</td>
	</tr>
);
