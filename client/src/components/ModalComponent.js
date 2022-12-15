import React, { useEffect, useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import ExerciseModal from './ExerciseModal';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Input,
  Box,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_EXERCISE_INSTANCE, ADD_TEMPLATE } from '../utils/mutations';
import { useTemplateContext } from '../utils/TemplateContext';

import Auth from '../utils/auth';

function ModalComponent({ closeTempModal, handleTempClose, searchList, exerciseObject, setExerciseObject, totalSets, setTotalSets, exerciseList, setExerciseList }) {
  const [openExerciseModal, setExerciseModalOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState('');
  const { template, addName, addExercises } = useTemplateContext()

  const [createExerciseInstance, createExerciseInstanceResultObj] = useMutation(ADD_EXERCISE_INSTANCE)
  const [addTemplate, createTemplateResultObj] = useMutation(ADD_TEMPLATE)

  useEffect(() => {
    exerciseList = []
    if (template.exercises) {
      for (const [key, value] of Object.entries(template.exercises)) {
        exerciseList.push(<ExerciseComponent key={exerciseList.length} id={key} title={value.name} exerciseObject={exerciseObject} setExerciseObject={setExerciseObject} totalSets={totalSets} setTotalSets={setTotalSets}/>)
      }
    }
    setExerciseList(exerciseList)
}, [template])


  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };
  const createTemplate = async () => {
    let template = {name: templateTitle, exercises: [], userId: Auth.getProfile().data._id}
    for  (const [key, value] of Object.entries(exerciseObject)) {
      let sets = value.sets;
      const { data } = await createExerciseInstance(
        {
          variables:{
            "userId": Auth.getProfile().data._id,
            "exerciseType": key,
            "sets": [...sets],
          }
      }
      ) 
      template.exercises.push(data.addExerciseInstance._id)
    }
    const { data } = await addTemplate({variables: {
      "name": template.name,
      "userId": template.userId,
      "exercises": [...template.exercises]
    }})
    handleTempClose()
  }
  
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (closeTempModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [closeTempModal]);

  return (
    <div>
    <ExerciseModal  
      open={openExerciseModal} 
      close={() => setExerciseModalOpen(false)} 
      searchList={searchList}
      setExerciseList={setExerciseList}
      exerciseList={exerciseList}/>
    <Dialog
      open={closeTempModal}
      onClose={handleTempClose}
      scroll={'paper'}>
      <DialogTitle>
        <Input
          placeholder={'Template Name'}
          value={templateTitle}
          onChange={(e) => setTemplateTitle(e.target.value)}
        />
          <Box my={1}>
            <Divider />
          </Box>
        {/* <Button
          variant='contained'
          onClick={handleAddExBtn}>
          Add new Exercise
        </Button> */}
          <Box my={2}>
            <Button
              variant='contained'
              style={BtnStyle}
              onClick={() => {
                setExerciseModalOpen(true);
              }}>
              Add new Exercise
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent
          dividers={false}
          ref={descriptionElementRef}>
          {exerciseList}
          <Box my={1}>
            <Divider />
          </Box>
          <Box my={2}>
            <Button
              variant='contained'
              style={BtnStyle}
              onClick={createTemplate}>
              Create Template
            </Button>
          </Box>
          <Button
            variant='contained'
            style={BtnStyle}
            onClick={handleTempClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ModalComponent;
