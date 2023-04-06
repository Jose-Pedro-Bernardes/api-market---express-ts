import express, { Application, Request, Response, json } from "express";

const app: Application = express();

app.use(json());

const port = 3000;

app.listen(port, () => {
  console.log("Server start on port 3000 🚀🚀🚀");
});
