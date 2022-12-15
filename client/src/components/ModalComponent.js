import React, { useState } from 'react';
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

import Auth from '../utils/auth';

function ModalComponent({ closeTempModal, handleTempClose, searchList }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [exerciseObject, setExerciseObject] = useState({});
  const [openExerciseModal, setExerciseModalOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState('');

  const [createExerciseInstance, createExerciseInstanceResultObj] = useMutation(
    ADD_EXERCISE_INSTANCE
  );
  const [addTemplate, createTemplateResultObj] = useMutation(ADD_TEMPLATE);

  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };
  const createTemplate = async () => {
    let template = {
      name: templateTitle,
      exercises: [],
      userId: Auth.getProfile().data._id,
    };
    for (const [key, value] of Object.entries(exerciseObject)) {
      console.log(Auth.getProfile().data._id, key, value);
      const { data } = await createExerciseInstance({
        variables: {
          userId: Auth.getProfile().data._id,
          exerciseType: key,
          sets: [...value],
        },
      });
      console.log(data.addExerciseInstance);
      template.exercises.push(data.addExerciseInstance._id);
    }
    const { data } = await addTemplate({ variables: template });
    console.log(data);
    handleTempClose();
  };

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
        handleSubmit={(selectedOption) =>
          setExerciseList(
            exerciseList.concat(
              <ExerciseComponent
                id={selectedOption.id}
                title={selectedOption.label}
                exerciseObject={exerciseObject}
                setExerciseObject={setExerciseObject}
              />
            )
          )
        }
      />
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
