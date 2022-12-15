import { Button, Box } from '@mui/material';
import { useTemplateContext } from '../utils/TemplateContext';

export default function TemplateBtns({ templateData, handleTempOpen }) {
  const { template, addName, addExercises } = useTemplateContext();
  const BtnStyle = { color: '#161616', backgroundColor: '#ffc529' };
  let object = {};
  for (const exercise of templateData.exercises) {
    object[exercise.exerciseType._id] = {
      name: exercise.exerciseType.name,
      sets: exercise.sets,
    };
  }
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      my={3}>
      <Button
        variant='contained'
        style={BtnStyle}
        fullWidth={true}
        sx={{ maxWidth: 400, height: 200 }}
        key={templateData.name}
        onClick={() => {
          addName(templateData.name);
          addExercises(object);
          handleTempOpen();
        }}>
        {templateData.name}
      </Button>
    </Box>
  );
}
