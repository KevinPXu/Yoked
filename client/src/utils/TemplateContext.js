import React, { createContext, useContext, useState } from 'react';

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

    return (
        <TemplateContext.Provider value={{ template, addName, addExercises }}>
            {children}
        </TemplateContext.Provider>
    )
};