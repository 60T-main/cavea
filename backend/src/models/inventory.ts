import { DataTypes, Model, type ForeignKey } from "sequelize";
import {sequelize} from '../db.js';

import { Location } from "./location.js";

export class Inventory extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public locationId!: number; 
}


Inventory.init(
    {
    id: {type:DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    locationId: {type: DataTypes.INTEGER, allowNull: false},
    },
    { sequelize, modelName: "inventory", tableName: "inventories"}
)


Inventory.belongsTo(Location, { foreignKey: "locationId" });
Location.hasMany(Inventory, { foreignKey: "locationId" });