import * as React from 'react';

interface Props {
	children: React.ReactNode;
}

const SplitViewPanel = ({ children }: Props) => (
	<div className='splitter-panel'>
		<div className='splitter-panel__content'>{children}</div>
	</div>
);

export default SplitViewPanel;
