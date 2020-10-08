const fs = require("fs").promises;

const Avatar = require("avatar-builder");
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const { imagesStore, temporaryDirectory, staticAvatarURL } = require("../config");

const createDefaultAvatar = async (userId) => {
  await Avatar.builder(Avatar.Image.circleMask(Avatar.Image.identicon()), 80, 80, {
    cache: Avatar.Cache.folder(temporaryDirectory()),
  }).create(userId);

  return await minifyAvatar();
};

const minifyAvatar = async () => {
  try {
    const file = await imagemin([temporaryDirectory()], {
      destination: imagesStore(),
      plugins: [imageminJpegtran()],
    });

    await fs.unlink(file[0].sourcePath);

    const destinationPath = await file[0].destinationPath.split("\\")[2];

    return staticAvatarURL(destinationPath);
  } catch (error) {
    throw error;
  }
};

module.exports = { createDefaultAvatar, minifyAvatar };
