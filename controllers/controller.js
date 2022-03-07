require('dotenv').config(); /* for using .env details */
const Intern = require('../models/Interns');


/* controller for homepage */
const homepage = (req, res) => {
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



/* controller for all intern page */
const allInterns = async (req, res) => {
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


/* controller to get info by id page */
const getInfo = async (req, res) => {
    try {
        /* store value of id from url */
        const id = req.params.tlid;

        /* if not number or not valid id then return this */
        // if (Number.isNaN(id) || id > await Intern.countHead()) return res.send(`invalid id, enter a valid id`);

        /* if valid then get info of that id */
        const intern = Intern.getInfoById(id);

        res.status(200).json({ intern });
    } catch (err) {
        // next(err);
        console.log(err);
    }
};



/* controller to add new intern */
const addIntern = async (req, res) => {
    /* store values from request body */
    const name = req.body.name;
    const university = req.body.university;
    const mobile = req.body.mobile;


    /* check mobile number already used or not */
    const usedOrNot = await Intern.alreadyExist(mobile);

    /* if number not used then create new intern */
    if (usedOrNot === 0) {
        /* method to generate TLID when create a new intern */
        /* generate a 6 digit unique number */
        const id = Math.floor(100000 + Math.random() * 900000); /* stackoverflow */

        /* add 'TL' suffix before the generated unique number */
        const tlid = 'TL' + id;

        /* create a new instance of Intern */
        const intern = new Intern(tlid, name, university, mobile);

        /* send response */
        res.send(intern);
        console.log(`Added intern- id: ${intern.tlid}, name: ${intern.name}, university: ${intern.university}, mobile: ${intern.mobile}`);

        // res.status(200).json({ intern });


        try {
            /* insert the new intern in model */
            return await intern.save();
        } catch (error) {
            console.log(error);
        }
    }

    /* if number used then send this */
    return res.send(`User already exist`);
}



/* controller to remove intern by tlid */
const removeIntern = async (req, res) => {
    /* store value from request body */
    const tlid = req.body.tlid;

    /* get details of the intern before removing */
    let removedIntern = await Intern.getInfoById(tlid);
    removedIntern = removedIntern[0];
    console.log(removedIntern);

    /* remove intern from model */
    await Intern.removeIntern(tlid);

    /* show who is removed */
    res.send(removedIntern);
    console.log(`Removed intern- id: ${removedIntern.tlid}, name: ${removedIntern.name}, university: ${removedIntern.university}, mobile: ${removedIntern.mobile}`);
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
