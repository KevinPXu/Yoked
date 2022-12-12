const connection = require('../config/connection');
const { Exercise, BodyPart } = require('../models')


const axios = require("axios");
const fs = require('fs')
const exerciseData = require('./exercises')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('open')
    await Exercise.deleteMany({});
    await BodyPart.deleteMany({});
    
    for (exercise of exerciseData) {
        const bpExists = await BodyPart.findOne({ name: exercise.target })
        if (!bpExists) {
            console.log("first instance: " + exercise.target)
            newBodyPart = await BodyPart.create({ name: exercise.target })
            console.log(newBodyPart)
        }
        const newId = bpExists ? bpExists._id : newBodyPart._id
        newExercise = await Exercise.create({name: exercise.name, bodyParts : newId, sets: 10, reps: 10})
    }
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

