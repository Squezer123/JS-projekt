class GameObjectsIterator {
    constructor(gameObjects) {
      this.sortedObjects = Object.values(gameObjects).sort((a, b) => a.y - b.y);
      this.index = 0;
    }
  
    next() {
      if (this.index < this.sortedObjects.length) {
        const value = this.sortedObjects[this.index++];
        return { value, done: false };
      } else {
        return { done: true };
      }
    }
  }
