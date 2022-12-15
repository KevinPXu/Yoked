import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import ExerciseSetComponent from './ExerciseSetComponent';
import { useTemplateContext } from '../utils/TemplateContext';

function ExerciseComponent({ title, setExerciseObject, exerciseObject, id }) {
  const { template, addName, addExercises, resetTemplate, addSets } = useTemplateContext()
  const [totalSets, setTotalSets] = useState([])

  useEffect(() => {
    console.log(template)
    let totalSets=[]
    if (template.exercises) {
      for (const set of template.exercises[id]['sets']) {
        console.log(id)
        totalSets.push(<ExerciseSetComponent key={totalSets.length} id={id} setExerciseObject={setExerciseObject} exerciseObject={exerciseObject} title={title} index={totalSets.length}/>)
      }
    }
    console.log(totalSets)
    setTotalSets(totalSets)
}, [template])

  const handleAddSetBtn = () => {
    addSets(id)
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
