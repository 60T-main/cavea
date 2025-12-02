import { Inventory } from "./models/inventory"
import { Location } from "./models/location"

const inventories: { id:number, locationId: number; name: string; price: number }[] = [];

let locations: Location[] = [];


async function generateInventory() {
    locations = await Location.findAll()

    for (let i = 1; i <= 500000; i++) {
        const randomLocationId = Math.floor(Math.random() * locations.length + 1);
        const id = i;
        const inventoryName = "Inventory N=" + i; 
        const inventoryPrice = Math.floor(Math.random() * 1000) + 1; 
    inventories.push({ id:id, locationId: randomLocationId, name: inventoryName, price: inventoryPrice })
    }
    
    if (inventories) {
        try {
            const createdInventories = await Inventory.bulkCreate(inventories);

            console.log(`${createdInventories.length} inventories created successfully.`);

        } catch (error) {
            console.error('Error during bulk create:', error);
        }
    } 

}

async function deleteInventory() {
    await Inventory.destroy({
  truncate: true 
});
}

generateInventory()

// deleteInventory()
