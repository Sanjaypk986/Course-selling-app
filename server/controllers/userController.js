import { User } from "../models/userModel.js";
import bcrypt from "bcrypt"
import { generateUserToken } from "../utils/generateUserToken.js";
const saltRounds = 10;

// user create
export const createUser = async (req, res, next) => {
  try {
    // destructure the fields
    const { username, email, password, profilePic, mobile, course } = req.body;
    //  validation for checking all fields are available
    if (!username || !password || !email || !mobile) {
      // return error
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }
    //  password hasing using bcrypt
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // Create new user in database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePic,
      mobile,
      course,
    });
    //  save to database
    await newUser.save();

    // authoraization using jwt token
    const token = generateUserToken(email)
    // token send through cookie
    res.cookie('token',token)
    // send success message
    res.status(200).json({sucess:true,message:'user created succesfully'})
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
