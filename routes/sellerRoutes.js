import express from "express";
import {
  isSellerAuth,
  sellerLogin,
  sellerlogout,
} from "../Controllers/sellerController";
import authSeller from "../Middlewares/authSeller";
const selllerRouter = express.Router();

selllerRouter.post("/login", sellerLogin);
selllerRouter.get("/is-auth", authSeller, isSellerAuth);
selllerRouter.get("/logout", sellerlogout);
