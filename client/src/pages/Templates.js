import React, { useState } from 'react';
import ModalComponent from '../components/ModalComponent';
import { Button, Grid } from '@mui/material';

export default function Template() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
            onClick={handleOpen}>
            Create New Template
          </Button>
          <ModalComponent
            handleClose={handleClose}
            closeModal={openModal}
          />
        </Grid>
      </Grid>
    </div>
  );
}
