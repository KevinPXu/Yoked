import React, { useState } from 'react';
import ModalComponent from '../components/ModalComponent';
import { Button, Grid } from '@mui/material';

export default function Template() {
  const [openTempModal, setOpenTempModal] = useState(false);
  const handleTempOpen = () => setOpenTempModal(true);
  const handleTempClose = () => setOpenTempModal(false);

  return (
    <div>
      <Grid container>
        <Grid
          xs
          item={true}
          display='flex'
          justifyContent='center'
          alignItems='center'>
          <Button
            variant='contained'
            fullWidth={true}
            onClick={handleTempOpen}>
            Create New Template
          </Button>
          <ModalComponent
            handleTempClose={handleTempClose}
            closeTempModal={openTempModal}
          />
        </Grid>
      </Grid>
    </div>
  );
}
