const { Schema, model, Types } = require("mongoose");

const historySchema = new Schema({
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'exercise'
    }
  ],
  Date: {
    type: Date,
    required: true,
  },
  Length: {
    type: Number,
    require: true,
  },
});

const History = model("history", historySchema);

module.exports = History;