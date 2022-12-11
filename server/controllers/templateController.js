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
          ? res.status(404).json({ message: 'No template with this ID!' })
          : res.json(template)
        )
        .catch((err) => res.status(500).json(err));
    },
    createTemplate(req, res) {
        Template.create(req.body)
        .then((template) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { templates: template._id } },
                { new: true }
            );
        })
        .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Template created but no user with this ID!',
            })
          : res.json('Created template!')
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    updateTemplate(req, res) {
        Template.findOneAndUpdate(
          { _id: req.params.templateId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((template) => 
            !template
              ? res.status(404).json({ message: 'No template with this ID!' })
              : res.json(template)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    deleteTemplate(req, res) {
        Template.findOneAndRemove({ _id: req.params.templateId })
          .then((template) =>
            !template
            ? res.status(404).json({ message: 'No template with this ID!' })
            : User.findOneAndUpdate(
                { templates: req.params.templateId },
                { $pull: { templates: req.params.templateId } },
                { new: true }
              )
          )
          .then((user) => 
            !user
              ? res.status(404).json({
                  message: 'Template created but no user with this ID!',
                })
              : res.json({ message: 'Template successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
    },
};