// linkedLists
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);

    let currentNode = this.head;

    // if the linked list is empty, set its first element to the created node
    if (!this.head) {
      this.head = node;
    } else {
      // sets currentNode to the last node in the linked list
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    this.tail = node;

    this.size++;

    return value;
  }

  prepend(value) {
    const node = new Node(value);

    // if the linked list is empty, set its first element to the created node
    if (!this.head) {
      this.head = node;
    } else {
      // sets the node's next value to contain the whole linked list, then replaces the linked list with the current node
      node.next = this.head;
      this.head = node;
    }

    this.size++;

    return value;
  }

  at(index) {
    let currentNode = this.head;

    // loops to the node at index and returns it
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  pop() {
    // checks list length
    if (this.size === 0) {
      return;
    }

    let currentNode = this.head;

    // sets currentNode to the second to last node in the linked list
    while (currentNode.next.next) {
      currentNode = currentNode.next;
    }
    // saves value of node to be removed for return
    let returnValue = currentNode.next.value;

    currentNode.next = null;

    this.tail = currentNode;

    this.size--;

    return returnValue;
  }

  contains(value) {
    let currentNode = this.head;

    // checks if head is value
    if (currentNode.value === value) {
      return true;
    }

    // loops through the rest of the list
    do {
      currentNode = currentNode.next;
      if (currentNode.value === value) {
        return true;
      }
    } while (currentNode.next);

    // if no values are true, return false
    return false;
  }

  find(value) {
    let currentNode = this.head;
    let currentIndex = 0;

    // checks if head is value
    if (currentNode.value === value) {
      return currentIndex;
    }

    // loops through the rest of the list
    do {
      currentNode = currentNode.next;
      currentIndex++;
      if (currentNode.value === value) {
        return currentIndex;
      }
    } while (currentNode.next);

    // if no values are found, return null
    return null;
  }

  toString() {
    // checks list length
    if (this.size === 0) {
      return;
    }

    let currentNode = this.head;
    let string;

    // adds head to string
    string = `( ${this.head.value} )`;

    // loops through the rest of the list
    do {
      currentNode = currentNode.next;
      string += ` -> ( ${currentNode.value} )`;
    } while (currentNode.next);

    string += ' -> null';

    return string;
  }

  insertAt(value, index) {
    const node = new Node(value);

    let currentNode = this.head;

    // checks if this.head needs to be updated
    if (index === 0) {
      this.head = node;
    }
    // loops to the node before the index
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next;
    }

    // inserts node right after the node before the index
    node.next = currentNode.next;
    currentNode.next = node;

    // checks if this.tail needs to be updated
    if (index === this.size) {
      this.tail = node;
    }

    this.size++;

    return value;
  }

  removeAt(index) {
    let currentNode = this.head;
    let returnValue;

    // saves value of node to be removed for return
    if (index === 0) {
      returnValue = this.head.value;
    }

    if (index === 0) {
      // checks if this.head needs to be updated
      this.head = currentNode.next;
    }
    // loops to the node before the index
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.next;
    }

    // saves value of node to be removed for return
    if (index !== 0) {
      returnValue = currentNode.next.value;
    }

    // removes node right after the node before the index
    currentNode.next = currentNode.next.next;

    // checks if this.tail needs to be updated
    if (index === this.size - 1) {
      this.tail = currentNode;
    }

    this.size--;

    return returnValue;
  }
}

// HashMap
class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;

    const primeN = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeN * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    // Check if the index is valid
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }

    // checks if bucket is empty, initialize a new LinkedList
    if (this.buckets[index] === null) {
      this.buckets[index] = new LinkedList();
    }

    // Get the LinkedList at this index
    const bucket = this.buckets[index];
    let currentNode = bucket.head;

    // Iterate through the LinkedList to check if the key exists
    while (currentNode !== null) {
      const nodeValue = currentNode.value;
      if (nodeValue.hasOwnProperty(key)) {
        // If key exists, update its value
        nodeValue[key] = value;
        return;
      }
      currentNode = currentNode.next;
    }

    // If key does not exist, add a new key-value pair
    const newEntry = { [key]: value };
    bucket.append(newEntry);
  }

  get(key) {
    const index = this.hash(key);

    // Get the LinkedList at this index
    const bucket = this.buckets[index];

    if (bucket === null) {
      return null;
    }

    let currentNode = bucket.head;
    // Iterate through the LinkedList to check if the key exists
    while (currentNode !== null) {
      const nodeValue = currentNode.value;
      if (nodeValue.hasOwnProperty(key)) {
        // If key exists, return it's value
        return currentNode.value[key];
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    // Get the LinkedList at this index
    const bucket = this.buckets[index];

    if (bucket === null) {
      return false;
    }

    let currentNode = bucket.head;
    // Iterate through the LinkedList to check if the key exists
    while (currentNode !== null) {
      const nodeValue = currentNode.value;
      if (nodeValue.hasOwnProperty(key)) {
        // If key exists, return true
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    // Get the LinkedList at this index
    const bucket = this.buckets[index];

    if (bucket === null) {
      return false;
    }

    let currentNode = bucket.head;
    // Iterate through the LinkedList to check if the key exists
    let objIndex = 0;
    while (currentNode !== null) {
      const nodeValue = currentNode.value;
      if (nodeValue.hasOwnProperty(key)) {
        // If key exists, delete it and return true
        bucket.removeAt(objIndex);
        return true;
      }
      objIndex++;
      currentNode = currentNode.next;
    }

    return false;
  }

  length() {
    let length = 0;

    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== null) {
        length += this.buckets[i].size;
      }
    }

    return length;
  }

  clear() {
    this.buckets.fill(null);
  }

  keys() {
    let keys = [];

    // loops through all buckets
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== null) {
        // Get the LinkedList at this index
        const bucket = this.buckets[i];
        let currentNode = bucket.head;
        // Iterate through the LinkedList and push keys to the keys array
        while (currentNode !== null) {
          keys.push(Object.keys(currentNode.value)[0]);
          currentNode = currentNode.next;
        }
      }
    }

    return keys;
  }

  values() {
    let values = [];

    // loops through all buckets
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i] !== null) {
        // Get the LinkedList at this index
        const bucket = this.buckets[i];
        let currentNode = bucket.head;
        // Iterate through the LinkedList and push values to the values array
        while (currentNode !== null) {
          values.push(Object.values(currentNode.value)[0]);
          currentNode = currentNode.next;
        }
      }
    }

    return values;
  }
}
