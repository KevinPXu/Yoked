import React, { useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import ExerciseModal from './ExerciseModal'
import { Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

function ModalComponent({ closeTempModal, handleTempClose, searchList }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [openExerciseModal, setExerciseModalOpen] = React.useState(false);

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
    <div>
    <ExerciseModal  open={openExerciseModal} close={() => setExerciseModalOpen(false)} searchList={searchList} handleSubmit= {(title) => setExerciseList(exerciseList.concat(<ExerciseComponent title={title}/>)) }/>
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
        <Button
          variant='contained'
          onClick={handleTempClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
    </div>
      );
}

export default ModalComponent;
