const HashTable = require('./hash-table');

const hashtable = new HashTable();
hashtable.insert("key", 5);
hashtable.insert("key1", 6);
hashtable.insert("key3", 7);
hashtable.insert("key5", 8);
hashtable.insert("key5", 10);
hashtable.insert("key7", 18);
hashtable.insert("new", 18);


console.log(hashtable.hashMod("key7"))
console.log(hashtable.hashMod("key"))
console.log(hashtable.hashMod("key1"))
console.log(hashtable.hashMod("new"))

console.log(hashtable.hashMod("key3"))
console.log(hashtable.hashMod("key5"))

hashtable.deletePair("key1")
console.log(hashtable.count);

hashtable.print();
