import { Tree } from '../components/treeSchema';

function isStringArray(array: any[]): array is string[] {
	return array.every((val: string | Tree) => typeof val === 'string');
}

/*
export function isTreeNode(
	tree: string | string[] | Tree | TreeNode | TreeNode[],
): tree is TreeNode {
	return Object.entries(tree).every(
		([key, entry]) =>
			(typeof entry === 'string' ||
				(Array.isArray(entry) && isStringArray(entry)) ||
				Object.entries(entry).every(([_vk, ve]) => typeof ve === 'string')) &&
			!(key.includes('[fail]') || key.includes('[ok]')),
	);
}

// !Number.isNaN(Number((key.startsWith('#') ? key.slice(key.indexOf('#') + 1) : key).trim()))

export function isTree(value: string | string[] | Tree | TreeNode | TreeNode[]): value is Tree {
	return typeof value !== 'string' && !Array.isArray(value);
}
*/
export function isSimpleLeaf(
	leaf: string | string[] | Tree | Tree[] | undefined,
): leaf is string | string[] {
	return !!(leaf && (typeof leaf === 'string' || (Array.isArray(leaf) && isStringArray(leaf))));
}
