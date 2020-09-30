const fs = require("fs").promises;

const Avatar = require("avatar-builder");
const imagemin = require("imagemin");

const createDefaultAvatar = async (userId) => {
  await Avatar.builder(Avatar.Image.circleMask(Avatar.Image.identicon()), 80, 80, {
    cache: Avatar.Cache.folder("./tmp"),
  }).create(userId);

  return await minifyAvatar();
};

const minifyAvatar = async () => {
  try {
    const file = await imagemin(["./tmp/"], {
      destination: "public/images",
    });

    await fs.unlink(file[0].sourcePath);

    const destinationPath = await file[0].destinationPath.split("\\")[2];

    return `http://localhost:8000/images/${destinationPath}`;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createDefaultAvatar, minifyAvatar };
