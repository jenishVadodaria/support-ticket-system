import express from "express";
import cors from "cors";
import supportAgentRouter from "./routes/supportAgent.routes";
import supportTicketRouter from "./routes/supportTicket.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", supportAgentRouter);
app.use("/api", supportTicketRouter);

export { app };
