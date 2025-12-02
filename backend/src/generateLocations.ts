import { Location } from "./models/location"

const locations = ["მთავარი ოფისი", "კავეა გალერია", "კავეა თბილისი მოლი", "კავეა ისთ ფოინთი", "კავეა სითი მოლი"]

async function generateLocations() {
    for (const name of locations) {
        await Location.create({ name });
        console.log(`"${name}" generated!`);
    }   
}

generateLocations();