let fs = require('fs');
let FILE_NAME = './assets/pies.json';

let pieRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    },

    getById: function (id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let pie = JSON.parse(data).find(p => p.id == id);
                resolve(pie);
            }
        });
    },

    search: function (searchObj, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let pies = JSON.parse(data);
                if (searchObj) {
                    pies = pies.filter(
                        p => (searchObj.id ? p.id == searchObj.id : true) &&
                            (searchObj.name ? p.name.toLowerCase().indexOf(searchObj.name.toLowerCase()) >= 0 : true)
                    )
                }
                resolve(pies);
            }
        });
    },

    insert: function (newData, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let pies = JSON.parse(data);
                pies.push(newData);
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
                    if (err) {
                        reject(err);
                    }
                    else resolve(newData);
                });
            }
        });
    },

    update: function (newData, id, resolve, reject) {
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                let pies = JSON.parse(data);
                let pie = pies.find(p => p.id == id);
                if (pie) {
                    Object.assign(pie, newData);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(newData);
                        }
                    });
                }
            }
        });
    },

    delete: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else{
                let pies = JSON.parse(data);
                let index = pies.findIndex(p => p.id == id);
                if (index != -1) {
                    pies.splice(index, 1);
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function (err) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(index);
                        }                    
                });            
            }
        }
        }); 
}
}
module.exports = pieRepo;