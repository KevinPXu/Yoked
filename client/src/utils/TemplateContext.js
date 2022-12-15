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
        template.exercises[id]['sets'].push({'weight': 0, 'reps': 0})
        setTemplate({...template})
    }
        

    return (
        <TemplateContext.Provider value={{ template, addName, addExercises, resetTemplate, addSets }}>
            {children}
        </TemplateContext.Provider>
    )
};