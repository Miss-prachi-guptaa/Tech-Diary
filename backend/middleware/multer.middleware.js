import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },

  fileFilter: (req, file, cb) => {
    console.log("Uploaded mimetype:", file.mimetype);
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only JPG, PNG, WEBP images allowed"),
        false
      );
    }
    cb(null, true);
  }
})