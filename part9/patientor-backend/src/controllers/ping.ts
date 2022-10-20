import { Router } from "express";
const pingRouter = Router();

pingRouter.get("/", async (_req, res) => {
  console.log("Someone pinged here");
  res.send("pong");
});

export default pingRouter;
