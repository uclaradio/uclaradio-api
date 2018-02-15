import * as Sequelize from "sequelize";
import { sequelize } from "./index";

export interface PromoBannerAttributes {
  image: string;
  url?: string;
}

export interface PromoBannerInstance extends Sequelize.Instance<PromoBannerAttributes> 
{
  id: number; 
  createdAt: Date;
  updatedAt: Date; 
}

const PromoBanner: Sequelize.Model<PromoBannerInstance, PromoBannerAttributes> = sequelize.define(
  "PromoBanner",
  {
    image: Sequelize.STRING,
    url: Sequelize.STRING
  }
);

sequelize.sync();

export default PromoBanner;
