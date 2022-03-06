require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT;
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/', routes);

// const newIntern = (req, res, next) => {
//     // const { name, university, height } = req.body;

//     // console.log(req.body);

//     // const name = req.body.name;
//     // const university = req.body.university;
//     // const height = req.body.height;

//     // let intern = new Intern(name, university, height);
//     // // let intern = new Intern('test name', 'test uni', 'test height');

//     // try {
//     //     // intern = await intern.save();
//     // } catch (error) {
//     //     console.log(error);
//     // }

//     // console.log(intern);
//     res.send(JSON.stringify(`new intern added`));
// }


// app.post('/newIntern', controller.newIntern);
// app.get('/details', (req, res) => {
//     console.log(req.body)
// })

app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}/`);
});
