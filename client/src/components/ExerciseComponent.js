import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import ExerciseSetComponent from './ExerciseSetComponent';

function ExerciseComponent({ title }) {
  const [totalSets, setTotalSets] = useState([]);
  const [setArray, setSetArray] = useState([]);

  const handleAddSetBtn = () => {
    setTotalSets(totalSets.concat(<ExerciseSetComponent setArray={setArray} setSetArray={setSetArray} index={totalSets.length}/>));
  };

  return (
    <>
      <h3>{title}</h3>
      <Grid
        container
        spacing={8}
        columns={13}>
        <Grid
          item
          xs={2}>
          <p>Sets</p>
        </Grid>
        <Grid
          item
          xs={5}>
          <p>Previous</p>
        </Grid>
        <Grid
          item
          xs={2}>
          <p>lbs</p>
        </Grid>
        <Grid
          item
          xs={2}>
          <p>Reps</p>
        </Grid>
        <Grid
          item
          xs={1}>
          <p>✓</p>
        </Grid>
      </Grid>
      {totalSets}
      <Button
        variant='contained'
        onClick={handleAddSetBtn}>
        + Add Set
      </Button>
    </>
  );
}

export default ExerciseComponent;
