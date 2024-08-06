import { Course } from "../models/courseModel.js";

// get all courses
export const getAllCourse = async (req, res, next) => {
  try {
    const courses = await Course.find();
    // send success message
    res.status(200).json({ sucess: true, message: "fetched course lists" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// create course
export const createCourse = async (req, res, next) => {
  try {
    // destructure
    const { title, description, image, duration, instructor } = req.body;
    //  validation for checking all fields are available
    if (!title || !description || !image || !duration) {
      // return error
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }

    //   create new course
    const newCourse = new Course({
      title,
      description,
      image,
      duration,
      instructor,
    });
    // save
    await newCourse.save();
    // send success message
    res
      .status(200)
      .json({ sucess: true, message: "new course created", data: newCourse });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

//   update course
export const updateCourse = async (req, res, next) => {
  try {
    // destructure
    const { title, description, image, duration, instructor } = req.body;
    const { id } = req.params;
    // update course
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, image, duration, instructor },
      { new: true }
    );
    // send success message
    res
      .status(200)
      .json({ sucess: true, message: "updated course", data: updatedCourse });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

//   delete course
export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    // update course
    const deletedCourse = await Course.findByIdAndDelete(id);
    // send success message
    res
      .status(200)
      .json({ sucess: true, message: "deleted course", data: deletedCourse });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
