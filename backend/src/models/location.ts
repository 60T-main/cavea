import { DataTypes, Model } from "sequelize";
import {sequelize} from '../db';

export class Location extends Model {
  public id!: number;
  public name!: string;
}

Location.init(
    {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true},
        name: {type: DataTypes.STRING, allowNull:false},
    },
    { sequelize, modelName: "location", tableName: "locations", timestamps: false }
);