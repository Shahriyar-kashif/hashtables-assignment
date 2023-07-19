const HashTable = require('./hash-table');

const hashtable = new HashTable();
hashtable.insert("key", 5);
hashtable.insert("key1", 6);
hashtable.insert("key3", 7);
hashtable.insert("key5", 8);

console.log(hashtable.readValue("key18"));
// hashtable.print();
