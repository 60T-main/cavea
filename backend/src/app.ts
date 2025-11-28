import express from "express";
import { sequelize } from "./db"; 
import inventoryRoutes from "./routes/inventories";

const app = express();
app.use(express.json());

app.use("/inventories", inventoryRoutes);


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