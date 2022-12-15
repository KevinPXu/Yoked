import React from 'react';
import { Grid, Input, Button, Box } from '@mui/material';

function ExerciseSetComponent({
  title,
  setExerciseObject,
  exerciseObject,
  index,
  id,
}) {
  const [weightValue, setWeightValue] = React.useState('');
  const [repValue, setRepValue] = React.useState('');
  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };
  if (!exerciseObject[id]) {
    exerciseObject[id] = { name: title, sets: [] };
  }

  return (
    <>
      <Box mb={2}>
        <Grid
          container
          spacing={2}
          columns={13}>
          <Grid
            item
            xs={2}>
            <p>1</p>
          </Grid>
          <Grid
            item
            xs={5}>
            <p>Previous</p>
          </Grid>
          <Grid
            item
            xs={2}>
            <Input
              placeholder={'lbs'}
              value={weightValue}
              type='number'
              onChange={(e) => {
                setWeightValue(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={2}>
            <Input
              placeholder={'reps'}
              value={repValue}
              type='number'
              onChange={(e) => {
                setRepValue(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={1}>
            <Button
              variant='contained'
              style={BtnStyle}
              onClick={(e) => {
                exerciseObject[id]['sets'][index] = {
                  weight: Number(weightValue),
                  reps: Number(repValue),
                };
                setExerciseObject(exerciseObject);
              }}>
              ✓
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ExerciseSetComponent;
