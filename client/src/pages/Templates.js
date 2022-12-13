import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TEMP } from '../utils/queries';
import ModalComponent from '../components/ModalComponent';
import { Button, Grid } from '@mui/material';

export default function Template() {
  const { loading, data } = useQuery(QUERY_TEMP, {
    fetchPolicy: 'no-cache',
  });
  console.log(loading);
  console.log(data);
  const [openTempModal, setOpenTempModal] = useState(false);
  const handleTempOpen = () => setOpenTempModal(true);
  const handleTempClose = () => setOpenTempModal(false);

  return (
    <>
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
      <Grid
        container
        my={4}
        columns={3}
        spacing={5}>
        <Grid
          item
          xs={1}>
          <Button
            variant='contained'
            sx={{ bgcolor: 'white', color: 'black' }}>
            Some Template Name
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
