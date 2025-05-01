import express from "express";
import cors from "cors";
import staysRoutes from "./routes/stay.route.js";
import activitiesRouter from "./routes/activity.route.js";
import reviewRouter from "./routes/review.route.js";
import userRouter from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

// Server
const expressServer = express();

// Tillader requests fra forskellige porte
expressServer.use(cors());

// Gør alle filer offentligt tilgængelige (servér dem fra serveren som de er)
expressServer.use("/uploads", express.static("uploads"));

// For at kunne læse req.body i JSON
expressServer.use(express.json());

// Routes
expressServer.use(staysRoutes);
expressServer.use(activitiesRouter);
expressServer.use(reviewRouter);
expressServer.use(userRouter);
expressServer.use(authRoute);

expressServer.listen(3042, () => {
  console.log("Serveren kører på http://localhost:3042");
});
