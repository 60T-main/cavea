import { Router } from "express";
import { Location } from "../models/location";
import { Inventory } from "../models/inventory";

const router = Router();

// route for get locations
router.get("/", async (req,res)=>{
    try {
        const items = await Location.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching locations", error });
    }
});

// route for create locations
router.post("/add", async (req, res) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({ message: "Location name missing" });
    }
    try {
        const item = await Location.create({name});
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Error fetching locations", error });
    }
}
);

// statistics route for count and total price per location
router.get("/statistics", async (req, res) => {
    try {
        const locations = await Location.findAll();
        const stats = [];
            for (const location of locations) {
                const locationId = location.get('id');
                const locationName = location.get('name');
                const totalCount = await Inventory.count({ where: { locationId } });
                const totalPrice = await Inventory.sum("price", { where: { locationId } });
                stats.push({
                    locationId,
                    locationName,
                    totalCount: Number(totalCount) || 0,
                    totalPrice: Number(totalPrice) || 0,
                });
        }
        res.status(200).json(stats);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Error fetching statistics", error });
    }
});

export default router