import cors from "cors";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "./context.js";
import { appRouter } from "./router.js";
const app = express();
const port = Number(process.env.PORT ?? 4000);
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
    res.json({
        service: "mobile-budget-server",
        trpcEndpoint: "/trpc",
    });
});
app.use("/trpc", createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(port, () => {
    console.log(`tRPC server listening on port http://localhost:${port}`);
});
