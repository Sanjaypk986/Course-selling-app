import express from "express";
import userRouter from "./userRoutes.js";
import courseRouter from "./courseRoutes.js";
const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/course", courseRouter);

export default v1Router;
