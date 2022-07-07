import mongoose, { Schema, model, connect } from "mongoose";
import { ObjectId } from "mongodb";
require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/electronchallenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));


