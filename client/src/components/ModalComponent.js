import React, { useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import ExerciseModal from './ExerciseModal'
import { Button, Dialog, DialogTitle, DialogContent, Divider, Input } from '@mui/material';
import {useMutation} from '@apollo/client';
import{ ADD_EXERCISE_INSTANCE, ADD_TEMPLATE } from '../utils/mutations'

import Auth from '../utils/auth'



function ModalComponent({ closeTempModal, handleTempClose, searchList }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseObject, setExerciseObject] =useState({});
  const [openExerciseModal, setExerciseModalOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState('');

  const [createExerciseInstance, createExerciseInstanceResultObj] = useMutation(ADD_EXERCISE_INSTANCE)
  const [addTemplate, createTemplateResultObj] = useMutation(ADD_TEMPLATE)

  const handleAddExBtn = () => {
    setExerciseList(exerciseList.concat(<ExerciseComponent />));
  };

  const createTemplate = async () => {
    let template = {name: templateTitle, exercises: [], userId: Auth.getProfile().data._id}
    for  (const [key, value] of Object.entries(exerciseObject)) {
      console.log(Auth.getProfile().data._id, key, value)
      const { data } = await createExerciseInstance(
        {
          variables:{
            "userId": Auth.getProfile().data._id,
            "exerciseType": key,
            "sets": [...value],
          }
      }
      ) 
      console.log(data.addExerciseInstance)
      template.exercises.push(data.addExerciseInstance._id)
    }
    const { data } = await addTemplate({variables: template})
    console.log(data)
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
      handleSubmit= {
        (selectedOption) => setExerciseList(exerciseList.concat(<ExerciseComponent id={selectedOption.id} title={selectedOption.label} exerciseObject={exerciseObject} setExerciseObject={setExerciseObject}/>)) 
        }/>
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
        <Divider />
        {/* <Button
          variant='contained'
          onClick={handleAddExBtn}>
          Add new Exercise
        </Button> */}
        <Button
              variant="contained"
              onClick={() => {
                setExerciseModalOpen(true);
              }}
            >
              Add Exercise Dev
            </Button>
      </DialogTitle>
      <DialogContent
        dividers={true}
        ref={descriptionElementRef}>
        {exerciseList}
        <Divider />
        <Button
          variant='contained'
          onClick={createTemplate}>
            Create Template
          </Button>
        <Button
          variant='contained'
          onClick={handleTempClose}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
    </div>
      );
}

export default ModalComponent;
