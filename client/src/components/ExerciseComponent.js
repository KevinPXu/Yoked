import { Input, Button, Grid } from '@mui/material';
import React from 'react';

function ExerciseComponent() {
  return (
    <>
      <Grid
        container
        spacing={2}
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
          <Input defaultValue={'lbs'} />
        </Grid>
        <Grid
          item
          xs={2}>
          <Input defaultValue={'reps'} />
        </Grid>
        <Grid
          item
          xs={1}>
          <Button variant='contained'>✓</Button>
        </Grid>
      </Grid>
      <Button variant='contained'>+ Add Set</Button>
    </>
  );
}

export default ExerciseComponent;
