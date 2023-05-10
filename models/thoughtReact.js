const { Schema, model, Types } = require('mongoose');

//import moment module to format timestamp
const moment = require('moment');

//create ReactionSchema
const ReactionSchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        //set comment text
        reactionBody: {
            type: String,
            required: true,
            //280 character max
            maxlength: 280
        },
        //set username of comment creator
        username: {
            type: String,
            required: true
        },
        //set timestamp of comment creation
        createdAt: {
            type: Date,
            default: Date.now,
            //use moment to format timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        }
    },
    //tell schema to use getters and virtuals
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

//create ThoughtSchema
const ThoughtSchema = new Schema(
    {
        //set thought text
        thoughtText: {
            type: String,
            required: true,
            //280 character max
            maxlength: 280
        },
        //set timestamp of thought creation
        createdAt: {
            type: Date,
            default: Date.now,
            //use moment to format timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        //set username of thought creator
        username: {
            type: String,
            required: true
        },
        //set reactions to thought
        reactions: [ReactionSchema]
    },
    //tell schema to use getters and virtuals
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
);

//get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

//create Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//export Thought model
module.exports = Thought;