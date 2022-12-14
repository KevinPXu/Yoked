import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  Button
} from '@mui/material';

function ExerciseModal({ open, close, handleSubmit, searchList}) {
  const [inputValue, setInputValue] = useState('');
  console.log(searchList)
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
        freeSolo
        autoSelect
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={searchList ?  searchList?.exerciseTypes?.map((exercise) => exercise.name): ['']}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
              <Button
              variant="contained"
              onClick={() => {
                handleSubmit(inputValue);
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
