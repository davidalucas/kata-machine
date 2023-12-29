type Node<T> = {
  value?: T;
  next?: Node<T>;
};

export default class SinglyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  prepend(item: T): void {
    // create a Node for the item and set the next prop
    // change the head and length for the class
    if (this.length > 0) {
      const newHead = { value: item, next: this.head } as Node<T>;
      this.head = newHead;
    } else {
      this.head = this.tail = { value: item } as Node<T>;
    }
    this.length++;
  }

  insertAt(item: T, idx: number): void {
    // 1. if index is out of bounds, throw exception
    if (idx < 0 || idx > this.length) {
      throw RangeError(
        `Provided index ${idx} is out of allowable range [0..${this.length}] for list.`,
      );
    }
    // 2. if index is at the beginning or end, do a prepend or append operation
    if (idx === 0) {
      this.prepend(item);
    } else if (idx === this.length) {
      this.append(item);
    }

    // 3. otherwise, do insertion:
    let prevNode = this.head!; // if head is null, it'd be handled in previous if statements
    for (let i = 0; i < idx; i++) {
      if (prevNode.next) {
        prevNode = prevNode.next;
      } else {
        // if we get here, then our list is broken somewhere (should never happen)
        throw Error("It appears your list is broken...");
      }
    }
    const itemNode = { value: item, next: prevNode.next } as Node<T>;
    prevNode.next = itemNode;
    this.length++;
  }

  append(item: T): void {
    const newNode = { value: item } as Node<T>;
    if (this.length === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = this.tail!.next;
    }
    this.length++;
    return;
  }

  // is this remove first occurrence or remove all?
  remove(item: T): T | undefined {
    let node = this.head;

    // handle remove head scenario
    if (node?.value === item) {
      this.head = this.head?.next;
      this.length--;
      if (this.length === 0) {
        this.tail = undefined;
      }
      return item;
    }

    // walk the list
    for (let i = 0; i < this.length; i++) {
      if (!node) {
        return undefined;
      }
      if (node.next?.value === item) {
        node.next = node.next?.next;
        return item;
      }
      node = node?.next;
    }

    return undefined;
  }

  get(idx: number): T | undefined {
    if (idx < 0 || idx > this.length - 1) {
      return undefined; // could throw out of bounds error here too
    }
    let node = this.head;
    for (let i = 0; i < idx; i++) {
      node = node?.next; // simplest way; should probably throw errors if the list is broken
    }
    return node?.value;
  }

  removeAt(idx: number): T | undefined {
    if (this.length === 0) {
      return undefined;
    }
    // 1. if index is out of bounds, throw exception
    if (idx < 0 || idx > this.length) {
      throw RangeError(
        `Provided index ${idx} is out of allowable range [0..${this.length}] for list.`,
      );
    }
    // 2. if index is head, deal with it (tail is handled later)
    if (idx === 0 && this.length === 1) {
      // remove head and tail
      const value = this.head!.value;
      this.head = this.tail = undefined;
      this.length--;
      return value;
    } else if (idx === 0) {
      // remove head
      const value = this.head!.value;
      this.head = this.head!.next;
      this.length--;
      return value;
    }
    // else if (idx === this.length - 1) {
    //   // remove tail
    //   let newTail = this.head;
    //   for (let i = 0; i < idx - 1; i++) {
    //     newTail = newTail?.next;
    //   }
    //   const value = newTail?.next?.value;
    //   this.tail = newTail;
    //   this.length--;
    //   return value;
    // }

    // 3. remove within the list
    let currNode = this.head;
    for (let i = 0; i < idx - 1; i++) {
      currNode = currNode?.next;
    }
    const value = currNode!.next!.value;
    currNode!.next = currNode!.next!.next;
    // if we just removed the tail, reset it
    if (!currNode!.next) {
      this.tail = currNode;
    }
    this.length--;
    return value;
  }
}
