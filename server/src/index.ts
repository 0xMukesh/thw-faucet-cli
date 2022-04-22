import express, { Express, Request, Response } from "express";

import router from "./router";

const app: Express = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "Alive!",
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${port}`);
});
