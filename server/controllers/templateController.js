const { Template } = require('../models');

module.exports = {
    getTemplates(req, res) {
        Template.find()
        .then((templates) => res.json(templates))
        .catch((err) => res.status(500).json(err));
    },
    getSpecificTemplate(req, res) {
        Template.findOne({ _id: req.params.templateId })
        .then((template) => 
        !template
          ? res.status(404).json({ message: 'No template with that ID' })
          : res.json(template)
        )
        .catch((err) => res.status(500).json(err));
    },
}