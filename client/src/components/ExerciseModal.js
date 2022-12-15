import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  Button
} from '@mui/material';
import { useTemplateContext } from '../utils/TemplateContext';
import ExerciseComponent  from './ExerciseComponent'

function ExerciseModal({ open, close, searchList, setExerciseList, exerciseList}) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState({})
  const { template, addName, addExercises } = useTemplateContext()

  return (
    <>
      <Dialog
        open={open}
        onClose={close}>
        <DialogTitle>Chose an exercise below</DialogTitle>
        <DialogContent
          dividers={true}>
      <Autocomplete
        id="free-solo-demo"
        autoSelect
        inputValue={inputValue}
        onChange = {(event, newInputValue) => {
          setSelectedOption(newInputValue)
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        options={searchList ?  searchList?.exerciseTypes?.map((exercise) => {
          return  {label: exercise.name, id: exercise._id}
        }): ['']}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
              <Button
              variant="contained"
              onClick={() => {
                let object ={...template.exercises}
                object[selectedOption.id] = { name: selectedOption.label, sets: []}
                addExercises(object);
              }}
            >
              Add Exercise Dev
            </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExerciseModal;
