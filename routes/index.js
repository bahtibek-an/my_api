import { Router } from 'express';
import userRouter from "./userRouter.js";
import movieRouter from "./movieRouter.js";

const routes = new Router();

routes.use("/user", userRouter);
routes.use("/movies", movieRouter);

export default routes;
