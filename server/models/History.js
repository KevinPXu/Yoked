const { Schema, model, Types } = require("mongoose");

const historySchema = new Schema({
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'exercise',
      required: true
    }
  ],
  length: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
}
);

const History = model("history", historySchema);

module.exports = History;