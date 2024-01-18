import dotenv from "dotenv";
import connectDB from "./db";
import { app } from "./app";

dotenv.config({
  path: "../.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo Connection Failed", error);
  });
