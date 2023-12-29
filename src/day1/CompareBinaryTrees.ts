function walk(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null,
): boolean {
  // termination conditions
  if (a === null && b === null) {
    return true;
  } else if (a === null || b === null) {
    return false;
  } else if (a.value !== b.value) {
    return false;
  }

  return walk(a!.left, b!.left) && walk(a!.right, b!.right);
}

export default function compare(
  a: BinaryNode<number> | null,
  b: BinaryNode<number> | null,
): boolean {
  // remember DFS preserves shape, while BFS does not
  return walk(a, b);
}
