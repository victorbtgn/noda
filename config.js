const imagesStore = (nameImage) => {
  if (nameImage) return `public/images/${nameImage}`;
  return "public/images";
};

const checkImageFormat = (format) => {
  const types = ["jpg", "jpeg", "png"];
  return types.includes(format);
};

const temporaryDirectory = () => "./tmp/";

const staticAvatarURL = (path) => `${process.env.DOMAIN}/images/${path}`;

module.exports = { imagesStore, checkImageFormat, temporaryDirectory, staticAvatarURL };
