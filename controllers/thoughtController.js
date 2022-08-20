// Require Thoughts and Users Models
const { Thought, User } = require('../models')

module.exports = {
	//get all
	getAllThoughts(req, res) {
		Thought.find({})
			.then((thought) => {
				res.status(200).json(thought)
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	},

	getOneThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select('-__v')
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ msg: 'no thought found with this ID' })
				} else {
					res.json(thought)
				}
			})
	},

	createThought(req, res) {
		Thought.create(req.body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: req.params.userId },
					//push thought id to user
					{ $push: { thoughts: _id } },
					//see the changed one
					{ new: true }
				)
			})
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ msg: 'no user found with this ID' })
				} else {
					res.json(thought)
				}
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	},
	updateThought(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, New: true }
		)
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ msg: 'no thought found with this ID' })
				} else {
					res.json(thought)
				}
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	},
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ msg: 'no thought found with this ID' })
				} else {
					res.json(thought)
				}
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	},
	createReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } },
			{ new: true, runValidators: true }
		)
			.then((thought) => {
				if (!thought) {
					res.status(404).json({ msg: 'no thought found with this ID' })
				} else {
					res.json(thought)
				}
			})
			.catch((err) => {
				res.status(500).json(err)
			})
	},
	deleteReaction(req, res) {
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ new: true }
		)
			.then((dbThoughtsData) => {
				if (!dbThoughtsData) {
					res
						.status(404)
						.json({ message: 'No thoughts with this particular ID!' })
					return
				}
				res.json(dbThoughtsData)
			})
			.catch((err) => res.status(400).json(err))
	},
}

