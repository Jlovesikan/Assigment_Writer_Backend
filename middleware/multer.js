const multer = require("multer");
const { v4: uuid } = require("uuid");

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

const uploadFiles = multer({ storage }).array("files", 5);

module.exports = { uploadFiles };