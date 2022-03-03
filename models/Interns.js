const db = require('../config/db');

class Intern {
    constructor(name, university, height) {
        this.name = name;
        this.university = university;
        this.height = height;
    }

    async save() {
        const sqlQuery = `insert into details(name, university, height)
        values('${this.name}', '${this.university}', '${this.height}');`;

        const [newIntern, _] = await db.execute(sqlQuery);

        return newIntern;
    }

    static findAll() {

    }
}

module.exports = Intern;
