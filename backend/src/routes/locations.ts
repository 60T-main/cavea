import { Router } from "express";
import { Location } from "../models/location";

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

export default router