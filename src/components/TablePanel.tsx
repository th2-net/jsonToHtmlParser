import React from 'react';
import { createBemBlock } from '../helpers/styleCreators';
import { isSimpleLeaf } from '../helpers/typeCheckers';
import Table from './Table';
import { Tree, ViewInstruction } from './treeSchema';

const TablePanel = ({ node: [nodeKey, nodeTree] }: { node: [string, Tree] }) => {
	const failed = nodeKey
		? nodeKey.includes('[fail]') || nodeKey.trim().indexOf('#') === 0
		: undefined;
	const display = nodeTree.view_instruction;
	const leafs = Object.entries(nodeTree);
	const simpleLeafs: [string, string | string[]][] = [];
	const complexLeafs: [string, Tree][] = [];
	const combLeafs: [string, Tree | string | string[]][] = [];
	leafs.forEach(([key, value]) => {
		if (!value) return;
		if (key === 'view_instruction') return;
		if (isSimpleLeaf(value)) {
			const v = key === 'raw' ? atob(String(value[0])) : value;
			simpleLeafs.push([key, v]);
			combLeafs.push([key, v]);
			return;
		}
		if (display === ViewInstruction.summaryAndTree) {
			simpleLeafs.push([key, '']);
			combLeafs.push([key, '']);
		}
		complexLeafs.push([key, value]);
		combLeafs.push([key, value]);
	});
	/*
	leafs.forEach(([key, value]) => {
		if (isTreeNode(value) && !(key.includes('[fail]') || key.includes('[ok]')))
			if (Array.isArray(value) && value.every(v => typeof v !== 'string'))
				if (key === 'raw') simpleEntries.push([key, atob(String(value[0]))]);
				else arrayEntries.push([key, value]);
			else if (typeof value === 'string') simpleEntries.push([key, value]);
			else treeEntries.push([key, value]);
	});
	*/
	/* 
	менее пастельные тона, в таблице закрашивать всю строку как во вьювере
	+ где есть символы для открытия/закрытия выровнять с тем же уровнем
	*/
	return (
		<>
			{nodeKey !== '' && (
				<div
					className={createBemBlock('valueLeaf', failed ? 'failed' : 'passed', 'selected')}
					style={{ cursor: 'default' }}
					title={nodeKey}>
					<div className={createBemBlock('event-status-icon', failed ? 'failed' : 'passed')} />
					{nodeKey}
				</div>
			)}
			{display === 'table' ? (
				<Table rows={combLeafs} />
			) : (
				<>
					{simpleLeafs.length > 0 && (
						<>
							<Table rows={simpleLeafs} />
							<br />
						</>
					)}
				</>
			)}
		</>
	);
};

export default TablePanel;
