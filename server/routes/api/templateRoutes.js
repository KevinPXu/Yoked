const router = require('express').Router();

const {
    getTemplates,
    getSpecificTemplate,
    updateTemplate,
    createTemplate,
    deleteTemplate
} = require('../../controllers/TemplateController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').get(getTemplates).post(createTemplate);

router.route('/:id').get(authMiddleware, getSpecificTemplate).put(updateTemplate).delete(authMiddleware, deleteTemplate);

module.exports = router;