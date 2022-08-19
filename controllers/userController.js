// Require Thoughts and Users Models
const { Thought, User } = require('../models')

module.exports = {
    getAllUsers(req, res) {
        User.find({})
            .then((user) => {
                res.status(200).json(user)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then((user) => {
                if (!user) {
                    res.status(404).json({ msg: 'no user found with that id' })
                } else {
                    res.json(user)
                }
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => {
                res.status(200).json(user)
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ msg: 'No user found with this id' })
                } else {
                    res.status(200).json(user)
                }
            })
            .catch((err) => {
                return res.status(500).json(err)
            })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ msg: 'No user found with this id' })
                } else {
                    Thought.deleteMany({ _id: { $in: user.thoughts } })
                }
            })
            .then(() => {
                res.status(200).json('msg: "user n thought Deleted')
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ msg: 'No user found with this id' })
                } else {
                    res.status(200).json(user)
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ msg: 'No user found with this id' })
                } else {
                    res.status(200).json(user)
                }
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },
}
