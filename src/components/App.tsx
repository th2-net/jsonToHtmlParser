import React from 'react';
import '../styles/app.scss';
import { Tree } from './treeSchema';
import TreePanel from './TreePanel';
import TablePanel from './TablePanel';
import SplitView from './split-view/SplitView';
import SplitViewPanel from './split-view/SplitViewPanel';

const App = () => {
	const [data, setData] = React.useState<Tree>({});
	const [view, setView] = React.useState(50);
	const [node, setNode] = React.useState<[string, Tree]>(['', {}]);
	const readFile = async (file: File) => {
		setData(JSON.parse(await file.text()));
	};
	return (
		<div className='App'>
			<input
				style={{ marginBottom: 10 }}
				type='file'
				accept='.json'
				onChange={ev => {
					if (ev.target.files) {
						readFile(ev.target.files[0]);
						setNode(['', {}]);
					}
				}}
			/>
			<SplitView panelArea={view} onPanelAreaChange={setView}>
				<SplitViewPanel>
					<div style={{ height: '100%', overflow: 'auto' }}>
						<TreePanel
							node={data}
							setNode={(nodeKey: string, nodeTree: Tree) => setNode([nodeKey, nodeTree])}
							parentsPath={''}
							parentKey={''}
							selectedNode={node}
						/>
					</div>
				</SplitViewPanel>
				<SplitViewPanel>
					<TablePanel node={node} />
				</SplitViewPanel>
			</SplitView>
		</div>
	);
};
export default App;
