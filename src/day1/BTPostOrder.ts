function walk(node: BinaryNode<number>, results: number[]): number[] {
  // termination condition
  if (!node) {
    return results;
  }

  if (node.left) {
    walk(node.left, results);
  }

  if (node.right) {
    walk(node.right, results);
  }

  results.push(node.value);

  return results;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}
