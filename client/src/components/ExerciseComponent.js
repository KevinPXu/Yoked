import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import ExerciseSetComponent from './ExerciseSetComponent';

function ExerciseComponent({ title, setExerciseObject, exerciseObject, id }) {
  const [totalSets, setTotalSets] = useState([]);

  const handleAddSetBtn = () => {
    setTotalSets(
      totalSets.concat(
        <ExerciseSetComponent
          id={id}
          setExerciseObject={setExerciseObject}
          exerciseObject={exerciseObject}
          title={title}
          index={totalSets.length}
        />
      )
    );
  };

  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };

  return (
    <>
      <h3>{title}</h3>
      <Grid
        container
        spacing={4}
        columns={13}>
        <Grid
          item
          xs={2}>
          <u>Sets</u>
        </Grid>
        <Grid
          item
          xs={5}>
          <u>Previous</u>
        </Grid>
        <Grid
          item
          xs={2}>
          <u>lbs</u>
        </Grid>
        <Grid
          item
          xs={2}>
          <u>Reps</u>
        </Grid>
        <Grid
          item
          xs={1}>
          <u>✓</u>
        </Grid>
      </Grid>
      {totalSets}
      <Button
        variant='contained'
        style={BtnStyle}
        onClick={handleAddSetBtn}>
        + Add Set
      </Button>
    </>
  );
}

export default ExerciseComponent;
