import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
  // always remember that breadth-first search just needs a queue, not recursion
  // start by pushing head to the queue, then do a while loop until the queue is empty
  const myQueue = new Queue<BinaryNode<number>>();
  myQueue.enqueue(head);

  while (myQueue.length > 0) {
    const node = myQueue.deque();
    if (node?.value === needle) {
      return true;
    }
    if (node?.left) {
      myQueue.enqueue(node?.left);
    }
    if (node?.right) {
      myQueue.enqueue(node?.right);
    }
  }
  return false;
}
