const multer = require("multer");
const { v4: uuid } = require("uuid");
const { imageFilter, documentFilter } = require("../middleware/fileFilter.js");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },

  filename(req, file, cb) {
    const id = uuid();

    const extension = file.originalname.split(".").pop();

    const filename = `${id}.${extension}`;

    cb(null, filename);
  },
});

const uploadImage = multer({
  storage,
  fileFilter: imageFilter,
});

const uploadDocs = multer({
  storage,
  fileFilter: documentFilter,
});

module.exports = { uploadImage, uploadDocs };

