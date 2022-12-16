import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_EXERCISE_TYPES, QUERY_USER } from '../utils/queries';
import ModalComponent from '../components/ModalComponent';
import { Button, Grid, Box } from '@mui/material';
import { useTemplateContext } from '../utils/TemplateContext';
import TemplateBtn from '../components/TemplateBtns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Auth from '../utils/auth';
import { Navigate } from 'react-router-dom';

export default function Template() {
  const { template, addName, addExercises, resetTemplate } =
    useTemplateContext();
  const { loading, data } = useQuery(QUERY_EXERCISE_TYPES);
  const templateResult = useQuery(QUERY_USER, {
    variables: { id: Auth.getProfile().data._id },
  });

  const templates = [];

  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseObject, setExerciseObject] = useState({});
  const [totalSets, setTotalSets] = useState([]);
  const [openTempModal, setOpenTempModal] = useState(false);
  const [value, onChange] = useState(new Date());
  const handleTempOpen = () => setOpenTempModal(true);
  const handleTempClose = () => {
    setExerciseList([]);
    setExerciseObject({});
    setTotalSets([]);
    resetTemplate();
    setOpenTempModal(false);
  };

  templateResult.data?.user?.templates?.map((elem) =>
    templates.push(
      <Grid
        item
        xs={1}
        key={templates.length}>
        <TemplateBtn
          templateData={elem}
          key={templates.length}
          handleTempOpen={handleTempOpen}
          exerciseObject={exerciseObject}
          setExerciseObject={setExerciseObject}
        />
      </Grid>
    )
  );

  function handleExerciseObjectChange(newValue) {
    setExerciseObject(newValue);
  }

  function handleSetListChange(newValue) {
    setTotalSets(newValue);
  }

  return (
    Auth.loggedIn() ?
    <>
      <Box my={2}>
        <Calendar
          onChange={onChange}
          value={value}
        />
      </Box>

      <Button
        variant='contained'
        fullWidth={true}
        style={{ color: '#161616', backgroundColor: '#ffc529' }}
        onClick={handleTempOpen}>
        Create New Template
      </Button>

      <ModalComponent
        handleTempClose={handleTempClose}
        closeTempModal={openTempModal}
        searchList={data}
        exerciseObject={exerciseObject}
        exerciseList={exerciseList}
        setExerciseList={setExerciseList}
        setExerciseObject={handleExerciseObjectChange}
        setTotalSets={handleSetListChange}
        totalSets={totalSets}
      />
      <Grid
        container
        my={4}
        columns={2}
        spacing={2}>
        {templates}
      </Grid>
    </> :
    <Navigate to="/login?" />
  );
}
