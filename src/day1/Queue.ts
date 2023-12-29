type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class Queue<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
  }

  enqueue(item: T): void {
    if (this.length === 0) {
      this.head = this.tail = { value: item };
    } else {
      this.tail!.next = { value: item };
      this.tail = this.tail!.next;
    }
    this.length++;
  }

  deque(): T | undefined {
    let value: T | undefined;
    if (this.length === 0) {
      return undefined;
    } else if (this.length === 1) {
      value = this.head!.value;
      this.head = this.tail = undefined;
    } else {
      value = this.head!.value;
      this.head = this.head!.next;
    }
    this.length--;
    return value;
  }

  peek(): T | undefined {
    if (this.length === 0) {
      return undefined;
    }
    return this.head!.value;
  }
}
