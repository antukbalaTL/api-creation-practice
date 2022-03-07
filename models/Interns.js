const db = require('../config/db');
// const { all } = require('../routes/routes');

/* Intern model */
class Intern {
    constructor(tlid, name, university, mobile) {
        this.tlid = tlid;
        this.name = name;
        this.university = university;
        this.mobile = mobile;
    }

    // static generateTLID() {
    //     /* method to generate TLID when create a new intern */

    //     /* generate a 6 digit unique number */
    //     const id = Math.floor(100000 + Math.random() * 900000);

    //     /* add 'TL' suffix before the generated unique number */
    //     this.tlid = 'TL' + id;
    //     // console.log(this.tlid);

    //     return this.tlid;
    //     // res.send(JSON.stringify(tlid));
    // }

    async save() {
        /* method to insert new intern */

        /* sql query to insert new intern data */
        const sqlQuery = `insert into details(tlid, name, university, mobile)
        values('${this.tlid}','${this.name}', '${this.university}', '${this.mobile}');`;

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

    static async getInfoById(tlid) {
        /* method to get intern details by TLID */

        /* sql query to get details by id */
        const sqlQuery = `select * from details where tlid='${tlid}';`;

        /* execute the sql query */
        const intern = await db.execute(sqlQuery);

        return intern[0];
    }


    /* method to check mobile number already used or not */
    static async alreadyExist(mobile) {
        /* sql query for counting total interns */
        const sqlQuery = `select count(tlid) from details where mobile='${mobile}';`;

        /* execute the sql query */
        const result = await db.execute(sqlQuery);

        // console.log(result[0][0]);

        return result[0][0]['count(tlid)'];
        // console.log(result[0]);
    }



    /* method to check tlid exist or not */
    static async tlidExist(tlid) {
        /* sql query for checking tlid exist or not */
        const sqlQuery = `select count(tlid) from details where tlid='${tlid}';`;

        /* execute the sql query */
        const result = await db.execute(sqlQuery);

        // console.log(result[0][0]);

        return result[0][0]['count(tlid)'];
        // console.log(result[0]);
    }

    static async countHead() {
        /* method to count total number of interns */

        /* sql query for counting total interns */
        const sqlQuery = `select count(tlid) from details;`;

        /* execute the sql query */
        this.totalInterns = await db.execute(sqlQuery);

        /* removed extra details and stored just numeric value */
        this.totalInterns = this.totalInterns[0][0]['count(tlid)'];

        return this.totalInterns;
    }



    /* method to remove an intern */
    static async removeIntern(tlid) {
        /* sql query to check if the tlid exist or not */
        var sqlQuery1 = `select count(tlid) from details where tlid='${tlid}';`;

        /* sql query for finding intern id to delete */
        const sqlQuery2 = `DELETE FROM details WHERE tlid='${tlid}';`;

        /* execute the sql query1 */
        const doesNotExist = await db.execute(sqlQuery1);

        if (doesNotExist[0][0]['count(tlid)'] === 0) {
            return 0;
        }

        /* execute the sql query2 */
        const remove = await db.execute(sqlQuery2);
    }


    /* method to update name of intern */
    static async updateName(tlid, name) {
        /* sql query to update name */
        var sqlQuery = `update details set name='${name}' where tlid='${tlid}';`;

        /* execute the sql query */
        await db.execute(sqlQuery);
    }


    /* method to update university of intern */
    static async updateUniversity(tlid, university) {
        /* sql query to update university */
        var sqlQuery = `update details set university='${university}' where tlid='${tlid}';`;

        /* execute the sql query */
        await db.execute(sqlQuery);
    }


    /* method to update mobile of intern */
    static async updateMobile(tlid, mobile) {
        /* sql query to update mobile */
        var sqlQuery = `update details set mobile='${mobile}' where tlid='${tlid}';`;

        /* execute the sql query */
        await db.execute(sqlQuery);
    }
}

module.exports = Intern;
