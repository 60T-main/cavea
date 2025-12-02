import express from "express";
import { sequelize } from "./db"; 
import inventoryRoutes from "./routes/inventories";
import locationRoutes from "./routes/locations";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/inventories", inventoryRoutes);
app.use("/locations", locationRoutes);


async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("✓ Database synced with models successfully");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

syncDatabase();

export default app;