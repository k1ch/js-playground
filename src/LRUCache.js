/**
 * A data structure for Least Recently Used (LRU) cache.
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity
  this.cache = {}
  this.access = new Map()
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  if (this.cache.hasOwnProperty(key)) {
      this.access.delete(key)        
      this.access.set(key, 'get')
      return this.cache[key]
  } else return -1
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if (!this.cache.hasOwnProperty(key) && Object.keys(this.cache).length === this.capacity) {
      const delKey = this.access.entries().next().value[0]
      delete this.cache[delKey]
      this.access.delete(delKey)
  }  
  this.access.delete(key)
  this.access.set(key, 'put')
  this.cache[key] = value
};

/** 
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/