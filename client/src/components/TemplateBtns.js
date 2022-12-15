import { Button } from '@mui/material';
import { useTemplateContext } from '../utils/TemplateContext'

export default function TemplateBtns({templateData, handleTempOpen}) {
    const { template, addName, addExercises } = useTemplateContext()
    let object = {}
    for (const exercise of templateData.exercises) {
        object[exercise.exerciseType._id] = {name: exercise.exerciseType.name, sets : exercise.sets}
    }
    return(
<Button
    variant='contained'
    sx={{ bgcolor: 'white', color: 'black' }}
    key={templateData.name}
    onClick={() => {
        addName(templateData.name)
        addExercises(object)
        handleTempOpen()
        }}>
    {templateData.name}
  </Button>)
};