import React, { useState } from 'react';
import ExerciseComponent from './ExerciseComponent';
import ExerciseModal from './ExerciseModal'
import { Button, Dialog, DialogTitle, DialogContent, Divider, Input } from '@mui/material';

function ModalComponent({ closeTempModal, handleTempClose, searchList }) {
  const [exerciseList, setExerciseList] = useState([]);
  const [openExerciseModal, setExerciseModalOpen] = useState(false);
  const [templateTitle, setTemplateTitle] = useState('');

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
          onClick={handleTempClose}>
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
