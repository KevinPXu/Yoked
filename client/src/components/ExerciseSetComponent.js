import React from 'react';
import { Grid, Input, Button } from '@mui/material';

function ExerciseSetComponent({ setArray, setSetArray }) {
  const [weightValue, setWeightValue] = React.useState('');
  const [repValue, setRepValue] = React.useState('');
  return (
    <>
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
            onChange={(e) => {setWeightValue(e.target.value)}}
          />
        </Grid>
        <Grid
          item
          xs={2}>
          <Input 
            placeholder={'reps'} 
            value={repValue}
            onChange={(e) => {
              setRepValue(e.target.value)
              setSetArray()}}
            />
        </Grid>
        <Grid
          item
          xs={1}>
          <Button variant='contained'>✓</Button>
        </Grid>
      </Grid>
    </>
  );
}

export default ExerciseSetComponent;
