import React, { useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

function ModalComponent({ closeTempModal, handleTempClose }) {
  const [exerciseList, setExerciseList] = useState([]);

  const handleAddExBtn = () => {
    setExerciseList(exerciseList.concat(<ExerciseComponent />));
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
    <Dialog
      open={closeTempModal}
      onClose={handleTempClose}
      scroll={'paper'}>
      <DialogTitle>
        <Button
          variant='contained'
          onClick={handleAddExBtn}>
          Add new Exercise
        </Button>
      </DialogTitle>
      <DialogContent
        dividers={true}
        ref={descriptionElementRef}>
        {exerciseList}
        <Button
          variant='contained'
          onClick={handleTempClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ModalComponent;
