import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISE_TYPES, QUERY_USER } from '../utils/queries';
import ModalComponent from '../components/ModalComponent';
import { Button, Grid } from '@mui/material';
import { TemplateProvider } from '../utils/TemplateContext';

import Auth from '../utils/auth';

export default function Template() {
  const { loading, data } = useQuery(QUERY_EXERCISE_TYPES);
  const templateResult = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });
  console.log(Auth.getProfile().data._id);

  const templates = [];
  templateResult.data?.user?.templates?.map((elem) =>
    templates.push(
      <Button
        variant='contained'
        sx={{ bgcolor: 'white', color: 'black' }}
        key={elem.name}>
        {elem.name}
      </Button>
    )
  );
  console.log(templateResult.loading);
  console.log(templateResult.data?.user?.templates);
  console.log(templates);
  const [openTempModal, setOpenTempModal] = useState(false);
  const handleTempOpen = () => setOpenTempModal(true);
  const handleTempClose = () => setOpenTempModal(false);

  return (
    <TemplateProvider>
      <Button
        variant='contained'
        fullWidth={true}
        onClick={handleTempOpen}>
        Create New Template
      </Button>
      <ModalComponent
        handleTempClose={handleTempClose}
        closeTempModal={openTempModal}
        searchList={data}
      />
      <Grid
        container
        my={4}
        columns={3}
        spacing={5}>
        <Grid
          item
          xs={1}>
          {templates}
        </Grid>
      </Grid>
    </TemplateProvider>
  );
}
