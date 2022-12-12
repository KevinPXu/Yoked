import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography, Button } from '@mui/material';

function ModalComponent({ closeModal, handleClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={closeModal}
      onClose={handleClose}>
      <Box sx={style}>
        <Typography>It is a Modal</Typography>
        <Button
          variant='contained'
          onClick={handleClose}>
          Click Me
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalComponent;
