import React, { useEffect } from 'react';
import { Grid, Input, Button, Box } from '@mui/material';
import { useTemplateContext } from '../utils/TemplateContext';

function ExerciseSetComponent({
  title,
  setExerciseObject,
  exerciseObject,
  index,
  id,
}) {
  const { template, addName, addExercises, updateSet } = useTemplateContext()
  const [weightValue, setWeightValue] = React.useState('');
  const [repValue, setRepValue] = React.useState('');
  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };
  if (!exerciseObject[id]) {
    exerciseObject[id] = { name: title, sets: [] }
  }

  useEffect(() => {
    if (template.exercises[id].sets) {
      console.log(template.exercises[id].sets[index])
      setWeightValue(template.exercises[id].sets[index] ? template.exercises[id].sets[index].weight : 0)
      setRepValue(template.exercises[id].sets[index] ? template.exercises[id].sets[index].reps : 0)
    }
    console.log(template)

}, [template])
  
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
            <p>{index}</p>
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
                setWeightValue(e.target.value)
                updateSet(id, index, e.target.value, repValue)
                console.log(template);
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
                setRepValue(e.target.value)
                updateSet(id, index, weightValue, e.target.value);
              }}
            />
          </Grid>
        <Grid
          item
          xs={1}>
          <Button variant='contained'
          onClick={(e) => {
            exerciseObject[id]['sets'][index] = {weight: Number(weightValue), reps: Number(repValue)}
            setExerciseObject(exerciseObject)
          }}>✓</Button>
        </Grid>
      </Grid>
      </Box> 
    </>
  );
}

export default ExerciseSetComponent;
