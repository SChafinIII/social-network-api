const { User, Thought } = require('../models');

module.exports = {
  //get all users 
  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  },

  //get user by id
  async getUserById(req, res) {
    const user = await User.findOne({ _id: req.params.id })
      .populate('thoughts', '-__v')
      .populate('friends', '-__v');

    if (!user) return res.status(404).json({ message: 'No user with this id!' });
    res.json(user);
  },

  //create user
  async createUser(req, res) {
    const user = await User.create(req.body);
    res.json(user);
  },

  //update user by id
  async updateUser(req, res) {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

    if (!user) return res.status(404).json({ message: 'No user with this id!' });
    res.json(user);
  },

  //delete user by id and all related thoughts
  async deleteUser(req, res) {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) return res.status(404).json({ message: 'No user with this id!' });
    await Thought.deleteMany({ username: user.username });

    res.json({ message: 'User and associated thoughts deleted!' });
  },

  //add friend
  async addFriend(req, res) {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });

    if (!user) return res.status(404).json({ message: 'No user with this id!' });
    res.json(user);
  },

  //delete friend
  async deleteFriend(req, res) {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });

    if (!user) return res.status(404).json({ message: 'No user with this id!' });
    res.json(user);
  }
};

