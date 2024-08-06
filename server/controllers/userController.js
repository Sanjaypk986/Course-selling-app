import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
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
    // check user available
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(404)
        .json({ success: false, message: "user already exist" });
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
    const token = generateUserToken(email);
    // token send through cookie
    res.cookie("token", token);
    // send success message
    res.status(200).json({ sucess: true, message: "user created succesfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// user login

export const loginUser = async (req, res, next) => {
  try {
    // destructure the fields
    const { email, password } = req.body;
    //  validation for checking all fields are available
    if (!password || !email) {
      // return error
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }
    // check user available
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    // check password
    const passwordMatch = bcrypt.compareSync(password, userExist.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "unauthoraized user" });
    }

    // authoraization using jwt token
    const token = generateUserToken(email);
    // token send through cookie
    res.cookie("token", token);
    // send success message
    res.status(200).json({ sucess: true, message: "user login succesfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// user profile

export const userProfile = async (req, res, next) => {
  try {
    // get id from params
    const { id } = req.params;
    // /find user by id
    const useData = await User.findById(id).select("-password"); // select is used to avoid password as response
    res
      .status(200)
      .json({ sucess: true, message: "userData fetched", data: useData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// check user

export const checkUser = async (req, res, next) => {
  try {
    // get user data from auth middleware
    const user = req.user;
    if (!user) {
      res.status(401).json({ success: false, message: "unauthoraized user" });
    }
    res.status(200).json({ success: true, message: "authoraized user" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
