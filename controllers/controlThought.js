const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id });
            return thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No thought with this id!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({ username: req.body.username }, { $push: { thoughts: thought._id } }, { new: true });
            return user ? res.status(200).json(thought) : res.status(404).json({ message: 'No user with this username!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            return thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No thought with this id!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            if (!thought) return res.status(404).json({ message: 'No thought with this id!' });
            await User.findOneAndUpdate({ username: thought.username }, { $pull: { thoughts: thought._id } }, { new: true });
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $push: { reactions: req.body } }, { new: true });
            return thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No thought with this id!' });
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
            return thought ? res.status(200).json(thought) : res.status(404).json({ message: 'No thought with this id!' });
        } catch (err) {
            res.status(400).json(err);
        }
    }
};


