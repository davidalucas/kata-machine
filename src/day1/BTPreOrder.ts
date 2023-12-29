function walk(node: BinaryNode<number>, results: number[]): number[] {
  // termination condition
  if (!node) {
    return results;
  }

  // pre-recursion
  results.push(node.value);
  // recursion
  if (node.left) {
    walk(node.left, results);
  }
  if (node.right) {
    walk(node.right, results);
  }
  // post-recursion
  return results;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
  // here's a bad way to do this:

  //   let result: number[] = [];
  //   result.push(head.value);
  //   if (head.left) {
  //     result.push(...pre_order_search(head.left));
  //   }
  //   if (head.right) {
  //     result.push(...pre_order_search(head.right));
  //   }
  //   return result;

  // here's a better way:
  return walk(head, []);
}
