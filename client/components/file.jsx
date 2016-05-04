import React from 'react';

export default ({file}) => (
	<tr>
		<td className="no-ellipsis" data-tooltip={file.id}><span className="ellipsis">{file.originalFileName}</span></td>
		<td>{file.updatedFileName}</td>
	</tr>
);
