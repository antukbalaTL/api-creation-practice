require('dotenv').config();
const Intern = require('../models/Interns');

const homepage = (req, res) => {
    const homeRoute = `http://localhost:${process.env.PORT}/`;
    const allInternsRoute = `${homeRoute}allInterns/`;
    const getInfoRoute = `${homeRoute}getInfo/:id/`;
    const addInternRoute = `${homeRoute}addIntern/`;
    const deleteInternRoute = `${homeRoute}removeIntern/`;
    const editInfoRoute = `${homeRoute}editInfo/:id/`;

    const allRoutes = {
        home_GET: homeRoute,
        allInterns_GET: allInternsRoute,
        getInfo_GET: getInfoRoute,
        addIntern_POST: addInternRoute,
        deleteIntern_POST: deleteInternRoute,
        ___editInfo_POST: editInfoRoute
    };

    res.send(allRoutes);
};

const allInterns = async (req, res, next) => {
    // res.send('working..');
    // res.send(JSON.stringify(Intern.findAll()));
    // console.log(Intern);

    try {
        const allInterns = await Intern.findAll();
        res.status(200).json({ allInterns });
    } catch (err) {
        next(err);
        // console.log(err);
    }
};

const getInfo = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        // console.log(typeof id, id);

        // if (Number.isNaN(id)) return res.send(`invalid id, enter a valid id`);
        if (Number.isNaN(id) || id > await Intern.countHead()) return res.send(`invalid id, enter a valid id`);

        const intern = await Intern.getInfoById(id);
        res.status(200).json({ intern });
    } catch (err) {
        next(err);
    }
};

const addIntern = async (req, res, next) => {
    // const { name, university, height } = req.body;

    // console.log(req._events._eventCount);

    const name = req.body.name;
    const university = req.body.university;
    const height = req.body.height;

    const intern = new Intern(name, university, height);
    res.send(JSON.stringify(intern));

    // let intern = new Intern('test name', 'test uni', 'test height');

    try {
        const saveIntern = await intern.save();
        // console.log(intern);
    } catch (error) {
        console.log(error);
    }

    // res.send(`new intern added ${name} ${intern.name}`);
    // res.send(JSON.stringify(intern));
}

const removeIntern = async (req, res) => {
    const id = req.body.id;
    let removedIntern = await Intern.getInfoById(id);
    removedIntern = removedIntern[0];
    console.log(removedIntern);
    await Intern.removeIntern(id);
    res.send(removedIntern);
    console.log(`Removed intern- id: ${removedIntern.id}, name: ${removedIntern.name}, university: ${removedIntern.university}, height: ${removedIntern.height}`);
};

module.exports = {
    homepage,
    allInterns,
    getInfo,
    addIntern,
    removeIntern
};
