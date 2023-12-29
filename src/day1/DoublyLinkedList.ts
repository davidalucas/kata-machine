type Node<T> = {
  value?: T;
  prev?: Node<T>;
  next?: Node<T>;
};

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  prepend(item: T): void {
    if (this.length === 0) {
      this.head = this.tail = { value: item } as Node<T>;
    } else {
      this.head!.prev = { value: item, next: this.head } as Node<T>;
      this.head = this.head!.prev;
    }
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    let nodeToReplace = this.head;
    for (let i = 0; i < idx; ++i) {
      nodeToReplace = nodeToReplace?.next;
    }
    if (!nodeToReplace) {
      throw Error("Failed to find node at specified index.");
    }

    if (!nodeToReplace.next) {
      return this.append(item);
    } else if (!nodeToReplace.prev) {
      return this.prepend(item);
    }

    const newNode = {
      value: item,
      prev: nodeToReplace.prev,
      next: nodeToReplace,
    };

    nodeToReplace.prev.next = newNode;
    nodeToReplace.prev = newNode;
    this.length++;
  }

  append(item: T): void {
    if (this.length === 0) {
      return this.prepend(item);
    } else {
      this.tail!.next = { value: item, prev: this.tail } as Node<T>;
      this.tail = this.tail!.next;
    }
    this.length++;
  }

  remove(item: T): T | undefined {
    let node = this.head;
    for (let i = 0; i < this.length; ++i) {
      if (node?.value === item) {
        return this.removeAt(i);
      }
      node = node?.next;
    }
    return undefined;
  }

  get(idx: number): T | undefined {
    if (idx > this.length - 1 || idx < 0) {
      return undefined;
    }

    let node = this.head;
    for (let i = 0; i < idx; ++i) {
      node = node?.next;
    }
    return node?.value;
  }

  removeAt(idx: number): T | undefined {
    let nodeToRemove = this.head;
    for (let i = 0; i < idx; ++i) {
      nodeToRemove = nodeToRemove?.next;
    }
    if (!nodeToRemove) {
      throw Error("Failed to find node at specified index.");
    }

    let value = nodeToRemove.value;
    if (!nodeToRemove.next && !nodeToRemove.prev) {
      //remove tail and head
      this.head = this.tail = undefined;
    } else if (!nodeToRemove.next) {
      // remove tail
      this.tail = nodeToRemove.prev;
      nodeToRemove.prev!.next = undefined;
    } else if (!nodeToRemove.prev) {
      // remove head
      this.head = nodeToRemove.next;
      nodeToRemove.next!.prev = undefined;
    } else {
      nodeToRemove.prev.next = nodeToRemove.next;
      nodeToRemove.next.prev = nodeToRemove.prev;
    }
    this.length--;
    return value;
  }
}
