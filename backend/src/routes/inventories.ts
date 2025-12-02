import { Router } from "express";
import { Inventory } from "../models/inventory";

const router = Router();

// route for get inventory
router.get("/", async (req,res)=>{
    const { locationId } = req.query;

    const page = Number.isInteger(Number(req.query.page)) && parseInt(String(req.query.page)) > 0 ? parseInt(String(req.query.page)) : 0;

    const limitparam = Number.isInteger(Number(req.query.limit)) && parseInt(String(req.query.limit)) > 0
  ? parseInt(String(req.query.limit))
  : 20;

    const sort = req.query.sort ? String(req.query.sort) : "id";

    const direction: "ASC" | "DESC" = String(req.query.direction).toLowerCase() === 'desc' ? "DESC" : "ASC"

    const where : {[key: string] : number | string} = {};
    const order: [string, "ASC" | "DESC"][] = [[sort, direction]];
    const limit: number = limitparam;
    const offset: number = page * limit;
    
    if (locationId) {
        where.locationId = Number(locationId);
    }
    
    try {
        const items = await Inventory.findAndCountAll({ where, order, limit, offset });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching inventories", error });
    }
});

// route for add inventory
router.post("/add", async (req,res)=>{

    try{
        const { name, locationId, price } = req.body;
        const inventory = await Inventory.create({ name, locationId, price })
        res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({message: "Error creating inventory", error})
    }
    
});

// route for delete inventory
router.delete("/:id", async (req,res)=>{
    const {id} = req.params;
    const inventory = await Inventory.findByPk(id)
    
    
    if (inventory) {
        try{
            await inventory.destroy();
            res.status(200).json({ message: "Inventory deleted successfully" });
        } catch (error){
            res.status(400).json({ message: `Error deleting inventory`, error})
        }
    } else {
        res.status(404).json({ message: `Inventory not found`})
    }
    
})



export default router

