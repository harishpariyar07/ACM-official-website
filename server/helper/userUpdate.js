const User = require('../models/User');
const Badge = require('../models/Badge');
const Certificate = require('../models/Certificate');
async function userUpdate(userArray, field, field_id, remove = false) {
  try {
    await Promise.all(
      userArray.map(async (userId) => {
        let user = await User.findById(userId);

        if (!remove) {
          // let set = new Set(user[field]);
          user[field].push(field_id);
          // set.add(field_id);
          await user.save();
        } else if (remove) {
          user[field] = user[field].filter(
            (id) => id.toString() !== field_id.toString(),
          );
          await user.save();
          w;
        }
      }),
    );
  } catch (err) {
    return;
  }
}
async function updateBadgeOrCertificate(array, userId, type, remove = false) {
  try {
    await Promise.all(
      array.map(async (elem) => {
        if (remove && type === 'badges') {
          const badge = await Badge.findByIdAndUpdate(
            elem,
            {
              $pull: {
                user: userId,
              },
            },
            { new: true },
          );
        }
        if (remove && type === 'certificates') {
          const certificate = await Certificate.findByIdAndUpdate(elem._id, {
            $pull: {
              user: elem._id,
            },
          });
        }
      }),
    );
  } catch (err) {
    return err;
  }
}
module.exports = { userUpdate, updateBadgeOrCertificate };
