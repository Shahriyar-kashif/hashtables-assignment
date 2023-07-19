class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}
// methods to write:
    // insert (DONE)
    // resize (call it in insert method when load factor is 0.7)(Done)
    // Method for reading data O(1) (DONE)
    // Deleting data O(1) (DONE)

//Issues
    //Right now resizing is not being done as soon as the load factor becomes 0
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

    resize() {
        this.capacity = this.capacity * 2;
        let temp = this.data;
        this.data = new Array(this.capacity).fill(null);
        for (let i = 0; i < temp.length; i++){
            if (temp[i]) {
                let newIndex = this.hashMod(temp[i].key);
                let existing = this.data[newIndex];
                while(existing) {
                    temp[i].next = existing;
                    this.data[newIndex] = temp[i];
                    existing = existing.next
                }
                this.data[newIndex] = temp[i];
            }
        }
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
            this.count++;
        }
    }

    insert(key, value) {
        const bucketIndex = this.hashMod(key);
        // const loadFactor = this.count / this.capacity;
        // if (loadFactor >= 0.7) this.resize();
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
        const loadFactor = this.count / this.capacity;
        if (loadFactor >= 0.7) this.resize();
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

    deletePair(key) {
        const bucketIndex = this.hashMod(key);
        let existing = this.data[bucketIndex];
        //if current pair in the index matches with the key, delete and return
        if (existing && existing.key === key) {
            this.data[bucketIndex] = existing.next;
            existing.next = null;
            this.count--;
            return existing.value;
        }
        //if current pair doesnt match check if it is a linked list
        while(existing.next) {
            if (existing.next.key === key) {
                const temp = existing.next;
                existing.next = temp.next;
                temp.next = null;
                this.count--;
                return temp.value;
            }
            existing = existing.next;
        }
        return "key not found in hashtable";
    }
}

module.exports = HashTable;
