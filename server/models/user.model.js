/** @format */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  provider_id: String,
  token: String,
  provider_pic: String,
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  ],
});

userSchema.methods.follow = (user_id) => {
  if (this.following.indexOf(user_id) === -1) {
    this.following.push(user_id);
    return this.save();
  }
};

userSchema.methods.addFollower = (fs) => {
  this.followers.push(fs);
};

const userModel = mongoose.model('Article', userSchema);
module.exports = userModel;
