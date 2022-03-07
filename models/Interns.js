const db = require('../config/db');
// const { all } = require('../routes/routes');

/* Intern model */
class Intern {
    constructor(name, university, height) {
        this.name = name;
        this.university = university;
        this.height = height;
    }

    async save() {
        /* method to insert new intern */

        /* sql query to insert new intern data */
        const sqlQuery = `insert into details(name, university, height)
        values('${this.name}', '${this.university}', '${this.height}');`;

        /* execute the sql query */
        const newIntern = await db.execute(sqlQuery);

        return newIntern[0];
    }

    static async findAll() {
        /* method to get data of all intern */

        /* sql query for get all data of all interns */
        const sqlQuery = `select * from details;`;

        /* execute the sql query */
        const allInterns = await db.execute(sqlQuery);

        // console.log(`db.findAll() ${allInterns}`);
        return allInterns[0];
    }

    static async getInfoById(id) {
        /* method to get intern details by TLID */

        /* sql query to get details by id */
        const sqlQuery = `select * from details where id=${id};`;

        /* execute the sql query */
        const intern = await db.execute(sqlQuery);

        return intern[0];
    }

    static async countHead() {
        /* method to count total number of interns */

        /* sql query for counting total interns */
        const sqlQuery = `select count(id) from details;`;

        /* execute the sql query */
        this.totalInterns = await db.execute(sqlQuery);

        /* removed extra details and stored just numeric value */
        this.totalInterns = this.totalInterns[0][0]['count(id)'];

        return this.totalInterns;
    }

    static async removeIntern(id) {
        /* method to remove an intern */

        /* sql query for finding intern id to delete */
        const sqlQuery = `DELETE FROM details WHERE id=${id};`;

        /* execute the sql query */
        const remove = await db.execute(sqlQuery);
    }

    static generateTLID() {
        /* method to generate TLID when create a new intern */

        /* generate a 6 digit unique number */
        const id = Math.floor(100000 + Math.random() * 900000);

        /* add 'TL' suffix before the generated unique number */
        const tlid = 'TL' + id;

        console.log(id, tlid);
        res.send(JSON.stringify(tlid));
    }
}

module.exports = Intern;
