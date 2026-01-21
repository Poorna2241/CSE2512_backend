import express from "express"
import { createUser, getAllUsers, getUser, loginUser, updateUserStatus } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/", getUser)
userRouter.get("/all", getAllUsers)
userRouter.put("/toggle-block/:email", updateUserStatus)


export default userRouter