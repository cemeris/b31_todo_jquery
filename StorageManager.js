/**
 * Klase atbild par datu saglabāšanu un izdzēšanu
 */
class StorageManager {
    constructor(storage_name) {
        this.storage_name = storage_name;
        let content = localStorage.getItem(storage_name);
        if (content != null) {
            this.storage = JSON.parse(content);
        }
        else {
            this.storage = {
                data: {},
                next_id: 1
            };
        }
    }

    add(parent_id, text) {
        if (!this.storage.data.hasOwnProperty(parent_id)) {
            this.storage.data[parent_id] = {};
        }
        const id = this.storage.next_id++;
        this.storage.data[parent_id][id] = {
            text: text,
            status: false
        };
        localStorage.setItem(this.storage_name, JSON.stringify(this.storage));

        return id;
    }

    resetStorage () {
        this.storage = {
            data: {},
            next_id: 1
        };
        localStorage.setItem(this.storage_name, JSON.stringify(this.storage));
    }

    getData() {
        return this.storage.data;
    }

    getEntry(parent_id, id) {
        return this.storage.data[parent_id][id];
    }

    updateStatus(parent_id, id, status) {
        this.storage.data[parent_id][id].status = status;
        localStorage.setItem(this.storage_name, JSON.stringify(this.storage));
    }

    delete (parent_id, id) {
        delete this.storage.data[parent_id][id];
        if (parent_id == 0 && this.storage.data.hasOwnProperty(id)) {
            delete this.storage.data[id];
        }

        localStorage.setItem(this.storage_name, JSON.stringify(this.storage));
    }
}