const { Schema, model, Types } = require('mongoose');

//create user schema with username, email, thoughts, and friends
const UserSchema = new Schema(
    {
        //set username
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        //set email
        email: {
            type: String,
            unique: true,
            required: true,
            //use regex to validate correct email format
            match: [/.+@.+\..+/]
        },
        //set thoughts array
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        //set friends array
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    //tell schema to use virtuals
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);

//create User model using UserSchema    
const User = model('User', UserSchema);

//export User model
module.exports = User;
