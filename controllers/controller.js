require('dotenv').config(); /* for using .env details */
const Intern = require('../models/Interns');

const homepage = (req, res) => {
    /* controller for homepage */

    /* creating links for all routes */
    const homeRoute = `http://localhost:${process.env.PORT}/`;
    const allInternsRoute = `${homeRoute}allInterns/`;
    const getInfoRoute = `${homeRoute}getInfo/:id/`;
    const addInternRoute = `${homeRoute}addIntern/`;
    const deleteInternRoute = `${homeRoute}removeIntern/`;
    const editInfoRoute = `${homeRoute}editInfo/:id/`;


    /* pass this object when get request on homepage */
    const allRoutes = {
        home_GET: homeRoute,
        allInterns_GET: allInternsRoute,
        getInfo_GET: getInfoRoute,
        addIntern_POST: addInternRoute,
        deleteIntern_DELETE: deleteInternRoute,
        ___editInfo_POST: editInfoRoute
    };

    res.send(allRoutes);
};

const allInterns = async (req, res) => {
    /* controller for all intern page */

    // res.send('working..');
    // res.send(JSON.stringify(Intern.findAll()));
    // console.log(Intern);

    try {
        /* get all intern data from model */
        const allInterns = await Intern.findAll();

        /* send response */
        res.status(200).json({ allInterns });
    } catch (err) {
        // next(err);
        console.log(err);
    }
};

const getInfo = async (req, res) => {
    /* controller for get info by id page */

    try {
        /* store value of id from url */
        const id = parseInt(req.params.id);
        // console.log(typeof id, id);

        /* if not number or not valid id then return this */
        if (Number.isNaN(id) || id > await Intern.countHead()) return res.send(`invalid id, enter a valid id`);

        /* if valid then get info of that id */
        const intern = await Intern.getInfoById(id);

        res.status(200).json({ intern });
    } catch (err) {
        // next(err);
        console.log(err);
    }
};

// function generateTLID() {
//     /* method to generate TLID when create a new intern */

//     /* generate a 6 digit unique number */
//     const id = Math.floor(100000 + Math.random() * 900000);

/* add 'TL' suffix before the generated unique number */
//     const tlid = 'TL' + id;
//     // console.log(this.tlid);

//     return tlid;
//     // res.send(JSON.stringify(tlid));
// }

const addIntern = async (req, res) => {
    /* controller for add new intern */

    /* store values from request body */
    const name = req.body.name;
    const university = req.body.university;
    const mobile = req.body.mobile;


    /* method to generate TLID when create a new intern */
    /* generate a 6 digit unique number */
    const id = Math.floor(100000 + Math.random() * 900000); /* stackoverflow */

    /* add 'TL' suffix before the generated unique number */
    const tlid = 'TL' + id;
    // console.log(this.tlid);

    /* create a new instance of Intern */
    const intern = new Intern(tlid, name, university, mobile);

    /* send response */
    res.send(JSON.stringify(intern));

    // let intern = new Intern('test name', 'test uni', 'test height');

    try {
        /* insert the new intern in model */
        const saveIntern = await intern.save();
        // console.log(intern);
    } catch (error) {
        console.log(error);
    }

    // res.send(`new intern added ${name} ${intern.name}`);
    // res.send(JSON.stringify(intern));
}

const removeIntern = async (req, res) => {
    /* controller to remove intern by id */

    /* store value from request body */
    const id = req.body.id;

    /* get details of the intern before removing */
    let removedIntern = await Intern.getInfoById(id);
    removedIntern = removedIntern[0];
    console.log(removedIntern);

    /* remove intern from model */
    await Intern.removeIntern(id);

    /* show who is removed */
    res.send(removedIntern);
    console.log(`Removed intern- id: ${removedIntern.id}, name: ${removedIntern.name}, university: ${removedIntern.university}, height: ${removedIntern.height}`);
};

const generateTLID = (req, res) => {
    /* test controller to generate unique id */

    // const id = Math.floor(100000 + Math.random() * 900000);
    // const tlid = 'TL' + id;
    // console.log(id, tlid);
    const tlid = 'test id';
    // console.log(typeof tlid);
    res.send(tlid);
}

module.exports = {
    homepage,
    allInterns,
    getInfo,
    addIntern,
    removeIntern,
    generateTLID
};
