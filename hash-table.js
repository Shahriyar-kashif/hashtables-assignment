class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
// methods to write:
    // insert (DONE)
    // resize (call it in insert method when load factor is 0.7)
    // Method for reading data O(1) (DONE)
    // Deleting data O(1)
class HashTable {
    constructor(capacity = 4) {
        this. capacity = capacity;
        this.data = new Array(this.capacity).fill(null);
        //count of key-value pairs in the hash table
        this.count = 0;
    }

    hash(key) {
        let hashKey = 0;
        for (let i = 0; i < key.length; i++) {
            hashKey += key.charCodeAt(i);
        }
        return hashKey;
    }

    hashMod(key) {
        return this.hash(key) % this.data.length;
    }

    insertWithHashCollision(key, value) {
        const bucketIndex = this.hashMod(key);
        const newKeyValuePair = new KeyValuePair(key, value);
        // check whether at this index, a pair is already present
        if (this.data[bucketIndex]) {
            newKeyValuePair.next = this.data[bucketIndex];
            this.data[bucketIndex] = newKeyValuePair;
            this.count++;
        }
        else {
            this.data[bucketIndex] = newKeyValuePair;
        }
    }

    insert(key, value) {
        const bucketIndex = this.hashMod(key);
        let existing = this.data[bucketIndex];
        //we will check for duplicate keys first
        //if found update value at that key and return
        while (existing) {
            if (existing.key === key) {
                existing.value = value;
                return;
            }
            existing = existing.next;
        }
        this.insertWithHashCollision(key, value);
    }

    print() {
        let counter = -1;
        for (let pair of this.data) {
            counter++;
            if (pair === null) console.log(`\t${counter}  ${pair}\n`);
            else{
                while (pair) {
                    process.stdout.write(`\t${counter}  ${pair.key} ---> ${pair.value}`);
                    pair=pair.next;
                }
            }
            console.log('\n');
        }
    }

    readValue(key) {
        const bucketIndex = this.hashMod(key);
        let existing = this.data[bucketIndex];
        while(existing) {
            if (existing.key === key) return existing.value;
            existing = existing.next;
        }
        return "key not available in hashtable";
    }
}

module.exports = HashTable;
