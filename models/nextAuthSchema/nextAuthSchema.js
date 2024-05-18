const { default: mongoose } = require("mongoose");

export const nextAuthSchema = new mongoose.Schema({
  name: {
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

export default mongoose.models.login || mongoose.model("login", nextAuthSchema);
