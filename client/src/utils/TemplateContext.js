import React, { createContext, useContext, useState } from 'react';
import { setVerbosity } from 'ts-invariant';

const TemplateContext = createContext();

export const useTemplateContext = () => useContext(TemplateContext);

export const TemplateProvider = ({ children }) => {
    const [template, setTemplate] = useState({});
    const addName = (name) => {
        setTemplate({ ...template, name: name })
    }
    const addExercises = (exercises) => {
        setTemplate({...template, exercises: exercises })
    }
    const resetTemplate = () => {
        setTemplate({})
    }

    const addSets = (id) => {
        template.exercises[id]['sets'] = [...template.exercises[id]['sets'], {'weight': 0, 'reps': 0}]
        setTemplate({...template})
        console.log(template.exercises[id]['sets'])
    }

    const updateSet = (id, index, weight, reps) => {
        template.exercises[id]['sets'] = [...template.exercises[id]['sets'].slice(0, index), {'weight': Number(weight), 'reps': Number(reps)}, ...template.exercises[id]['sets'].slice(index + 1,)]
        console.log(template)
        setTemplate({...template})
    }
        

    return (
        <TemplateContext.Provider value={{ template, addName, addExercises, resetTemplate, addSets, updateSet }}>
            {children}
        </TemplateContext.Provider>
    )
};