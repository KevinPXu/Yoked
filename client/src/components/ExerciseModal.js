import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Autocomplete,
} from '@mui/material';

function ExerciseModal() {
  const [exDialogOpen, setExDialogOpen] = React.useState(false);
  const handleExOpenBtn = () => {
    setExDialogOpen(true);
  };
  const handleExCloseBtn = () => {
    setExDialogOpen(true);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (exDialogOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [exDialogOpen]);
  return (
    <>
      <Button
        variant='contained'
        onClick={handleExOpenBtn}>
        Add Exercise Dev
      </Button>
      <Dialog
        open={exDialogOpen}
        onclose={handleExCloseBtn}>
        <DialogTitle>Chose an exercise below</DialogTitle>
        <DialogContent
          dividers={true}
          ref={descriptionElementRef}>
          <Autocomplete></Autocomplete>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ExerciseModal;
