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

    const pushTemplateExercises = [
        "barbell bench press",
        "dumbbell incline bench press",
        "cable standing fly",
        "cable standing pulldown (with rope)",
        "dumbbell kickback",
        "cable high pulley overhead tricep extension"
    ]

    const pullTemplateExercises = [
        "barbell deadlift",
        "barbell bent over row",
        "cable rear delt row (with rope)",
        "ez barbell curl",
        "cable hammer curl (with rope)",
        "dumbbell preacher curl"
    ]

    const legTemplateExercises = [
        "barbell full squat",
        "lever leg extension",
        "lever seated hip abduction",
        "lever standing calf raise",
        "russian twist",
        "twisted leg raise"
    ]

    let count = 0;
    let tracker = {}
    let template = { name: 'template', exercises: [], default: true }
    let pushTemplate = { name: 'Push', exercises: [], default: true }
    let pullTemplate = { name: 'Pull', exercises: [], default: true }
    let legTemplate = { name: 'Legs', exercises: [], default: true }
    for (exercise of exerciseData) {
        if (tracker[exercise.name]) {
            console.log('duplicate')
        } else {
            tracker[exercise.name] = true
            const bpExists = await BodyPart.findOne({ name: exercise.target })
            if (!bpExists) {
                newBodyPart = await BodyPart.create({ name: exercise.target })
            }
            const newId = bpExists ? bpExists._id : newBodyPart._id
            newExercise = await ExerciseType.create({ name: exercise.name, bodyParts: newId });
            if (count < 4) {
                const newExerciseInstance = await ExerciseInstance.create({ exerciseType: newExercise, sets: [{ reps: 10, weight: 100 }] })
                template.exercises.push(newExerciseInstance._id)
            }
            if (pushTemplateExercises.includes(exercise.name)) {
                const newPushExerciseInstance = await ExerciseInstance.create({ exerciseType: newExercise, sets: [{ reps: 10, weight: 100 }] })
                pushTemplate.exercises.push(newPushExerciseInstance._id)
            }
            if (pullTemplateExercises.includes(exercise.name)) {
                const newPullExerciseInstance = await ExerciseInstance.create({ exerciseType: newExercise, sets: [{ reps: 10, weight: 100 }] })
                pullTemplate.exercises.push(newPullExerciseInstance._id)
            }
            if (legTemplateExercises.includes(exercise.name)) {
                const newLegExerciseInstance = await ExerciseInstance.create({ exerciseType: newExercise, sets: [{ reps: 10, weight: 100 }] })
                legTemplate.exercises.push(newLegExerciseInstance._id)
            }
            count++
        }

    }
    const createdTemplates = await Template.insertMany([template, pushTemplate, pullTemplate, legTemplate])
    console.log(createdTemplates)
    await User.create({ name: "user", password: "password", templates: createdTemplates.map((elem) => elem._id), loggedIn: true })
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

