import React, { useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

function ModalComponent({ closeTempModal, handleTempClose }) {
  const [exerciseList, setExerciseList] = useState([]);
  // const style = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   color: 'black',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };
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
