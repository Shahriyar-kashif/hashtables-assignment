const HashTable = require('./hash-table');

const hashtable = new HashTable();
hashtable.insert("key", 5);
hashtable.insert("key1", 6);
hashtable.insert("key3", 7);
hashtable.insert("key5", 8);
hashtable.insert("key5", 10);

// console.log(hashtable.readValue("key3"));
console.log(hashtable.deletePair("key"));
console.log(hashtable.count)
hashtable.print();
