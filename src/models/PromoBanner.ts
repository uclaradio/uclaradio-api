import * as Sequelize from "sequelize";
import { sequelize } from "./index";

export interface PromoBannerAttributes {
  imageUrl: string;
  linkUrl?: string;
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
    imageUrl: Sequelize.STRING,
    linkUrl: Sequelize.STRING
  }
);

sequelize.sync();

export default PromoBanner;
