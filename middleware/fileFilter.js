const documentFilter = (req, file, cb) => {
  const allowedDocument = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedDocument.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};


const imageFilter=(req,file,cb)=>{
    const allowedImage=[
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

   console.log("Uploaded MIME:", file.mimetype);

  if(allowedImage.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(new Error("invalid Image type.."))
  }
}

module.exports = { documentFilter,imageFilter };