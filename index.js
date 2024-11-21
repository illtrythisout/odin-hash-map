class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
  }

  hash(key) {
    let hashCode = 0;

    const primeN = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeN * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }
}
