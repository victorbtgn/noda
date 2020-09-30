const multer = require("multer");

const avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "tmp");
    },
    filename: function (req, file, cb) {
      const fileType = file.mimetype.split("/")[1];
      if (fileType !== "jpg" && fileType !== "jpeg" && fileType !== "png") return cb(new Error("File must be a photo"));
      cb(null, `${req.user._id}.${fileType}`);
    },
  });

  return multer({ storage }).single("avatar");
};

module.exports = {
  avatarUploaderMiddleware: avatarUploader(),
};
