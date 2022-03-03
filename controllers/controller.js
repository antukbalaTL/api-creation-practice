const Intern = require('../models/Interns');

const homepage = (req, res) => {
    res.send('working..');
};

const getDetails = (req, res) => {
    res.send('details page');
};

const postDetails = (req, res) => {

};

const newIntern = async (req, res, next) => {
    // const { name, university, height } = req.body;

    console.log(req.body);

    const name = await req.body.name;
    const university = await req.body.university;
    const height = await req.body.height;

    let intern = new Intern(name, university, height);
    // let intern = new Intern('test name', 'test uni', 'test height');

    try {
        intern = await intern.save();
    } catch (error) {
        console.log(error);
    }

    console.log(intern);
    res.send(`new intern added`);
}

module.exports = {
    homepage,
    getDetails,
    postDetails,
    newIntern
};
