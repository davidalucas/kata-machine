function walk(node: BinaryNode<number>, results: number[]): number[] {
  // termination condition
  if (!node) {
    return results;
  }

  if (node.left) {
    walk(node.left, results);
  }

  results.push(node.value);

  if (node.right) {
    walk(node.right, results);
  }

  return results;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}
