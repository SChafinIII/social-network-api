const { User, Thought } = require('../models');

// get all thoughts
module.export = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    //get thought by id
    async getThoughtById( req , res) {
        try {
            const thoughtId = req.params.id;
            const thought = await Thought.findOne({ _id: thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    //create thought
    async createThought( req , res) {
        try {
            const username = req.body.username;
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: username },
                { $push: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this username!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json(err);

        }
    },

    //update thought by id
    async updateThought( req , res) {
        try {
            const thoughtId = req.params.id;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                req.body,
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.status(200).json(thought);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },  

    //delete thought by id
    async deleteThought( req , res) {
        try { 
            const thoughtId = req.params.id;
            const thought = await Thought.findOneAndDelete({ _id: thoughtId });     
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { new: true }
            );

            res.json({
                message: 'Thought deleted!'
            })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // create reaction 
    async createReaction( req , res) {
        try {
            const thoughtId = req.params.thoughtId;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                {_id: thoughtId, $push: { reactions: req.body } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    // delete reaction by id
    async deleteReaction( req , res) {
        try {
            const thoughtId = req.params.thoughtId;
            const reactionId = req.params.reactionId;
            const thought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $pull: { reactions: { reactionId: reactionId } } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }

};


