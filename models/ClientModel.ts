const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
