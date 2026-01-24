const fs = require('fs');
const path = require('path');

class DBConnector {
    constructor(filename) {
        this.filename = filename;
    }

    readFile() {
        const filePath = path.join(process.cwd(), 'db', this.filename);
        console.log(`📂 Чтение файла: ${filePath}`);
        return fs.readFileSync(filePath, "utf8");
    }

    writeFile(data) {
        const filePath = path.join(process.cwd(), 'db', this.filename);
        console.log(`💾 Запись файла: ${filePath}`);
        fs.writeFileSync(filePath, data, "utf8");
    }
}

module.exports = {
    DBConnector,
};