const db = require('../config/db');
// const { all } = require('../routes/routes');

class Intern {
    constructor(name, university, height) {
        this.name = name;
        this.university = university;
        this.height = height;
    }

    async save() {
        const sqlQuery = `insert into details(name, university, height)
        values('${this.name}', '${this.university}', '${this.height}');`;

        const newIntern = await db.execute(sqlQuery);

        return newIntern[0];
    }

    static async findAll() {
        const sqlQuery = `select * from details;`;
        const allInterns = await db.execute(sqlQuery);
        // console.log(`db.findAll() ${allInterns}`);
        return allInterns[0];
    }

    static async getInfoById(id) {
        const sqlQuery = `select * from details where id=${id};`;
        const intern = await db.execute(sqlQuery);
        return intern[0];
    }

    static async countHead() {
        const sqlQuery = `select count(id) from details;`;
        this.totalInterns = await db.execute(sqlQuery);
        this.totalInterns = this.totalInterns[0][0]['count(id)'];
        // console.log(this.totalInterns);
        return this.totalInterns;
    }
}

module.exports = Intern;
