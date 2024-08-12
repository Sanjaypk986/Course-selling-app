import multer from"multer"

// middleware for local files  
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage: storage })