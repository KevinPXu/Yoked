import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Autocomplete,
  TextField,
  Button,
  Box,
} from '@mui/material';

function ExerciseModal({ open, close, handleSubmit, searchList }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState({});

  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };
  console.log(searchList);
  return (
    <>
      <Dialog
        open={open}
        onClose={close}>
        <DialogTitle>Chose an exercise below</DialogTitle>
        <DialogContent dividers={true}>
          <Box height={-3}>
            <Autocomplete
              id='free-solo-demo'
              autoSelect
              inputValue={inputValue}
              onChange={(event, newInputValue) => {
                setSelectedOption(newInputValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={
                searchList
                  ? searchList?.exerciseTypes?.map((exercise) => {
                      return { label: exercise.name, id: exercise._id };
                    })
                  : ['']
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Exercises'
                  variant='outlined'
                />
              )}
            />
          </Box>
          <Box mt={3}>
            <Button
              variant='contained'
              style={BtnStyle}
              onClick={() => {
                console.log(inputValue);
                handleSubmit(selectedOption);
              }}>
              Add Exercise
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExerciseModal;
