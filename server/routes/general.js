import express from "express";
import { getBillsData } from "../controllers/general.js";

const router = express.Router();

router.get("/bills", getBillsData);

export default router;
