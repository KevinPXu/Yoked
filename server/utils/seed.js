const connection = require('../config/connection');
const { ExerciseType, BodyPart, Template, User, ExerciseInstance } = require('../models')


const axios = require("axios");
const fs = require('fs')
const exerciseData = require('./exercises')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('open')
    await ExerciseInstance.deleteMany({});
    await ExerciseType.deleteMany({});
    await BodyPart.deleteMany({});
    await User.deleteMany({});
    await Template.deleteMany({});

    let count = 0;       
    let template = {name: 'template', exercises:[], default: true}
    for (exercise of exerciseData) {
        const bpExists = await BodyPart.findOne({ name: exercise.target })
        if (!bpExists) {
            newBodyPart = await BodyPart.create({ name: exercise.target })
        }
        const newId = bpExists ? bpExists._id : newBodyPart._id
        newExercise = await ExerciseType.create({name: exercise.name, bodyParts : newId});
        if (count < 4) {
            const newExerciseInstance = await ExerciseInstance.create({exerciseType: newExercise, sets: [{reps: 10, weight: 100}]})
            template.exercises.push(newExerciseInstance._id)
        }
        count++
    }
    const newTemplate = await Template.create(template)
    await User.create({name: "user", password: "password", templates: [newTemplate._id], loggedIn: true})
    process.exit(0)
});


// for (exercise of exerciseData) {
//     newExercise = {
//         "name": exercise.name,
//         "bodyPart": exercise.target
//     }
//     console.log(newExercise)
// }

// const options = {
//   method: 'GET',
//   url: 'https://exercisedb.p.rapidapi.com/exercises',
//   headers: {
//     'X-RapidAPI-Key': '744560d079mshd96e4f2cb062b88p15a5f0jsnb6017f91d859',
//     'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	fs.writeFile('./exercises.json', JSON.stringify(response.data), (err) => {
//         if (err) {
//             throw new Error('something went wrong')
//         }
//     });
// }).catch(function (error) {
// 	console.error(error);
// });

