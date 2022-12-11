const { Schema, model, Types } = require("mongoose");

const historySchema = new Schema({
  historyId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  exercises: {
    type: String,
    required: true,
  },
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