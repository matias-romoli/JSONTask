import dotenv from "dotenv";
dotenv.config();

export const config = {
  server: {
    PORT: process.env.PORT,
  },
};
