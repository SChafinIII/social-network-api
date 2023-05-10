const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { Types } = require('mongoose');

const NUMBER = 5;

const getRandom = (max) => Math.floor(Math.random() * max);

const thoughtText = [
    'I love the new Star Wars movies!',
    'I hate the new Star Wars movies!',
    'I love the new Star Trek movies!',
    'I hate the new Star Trek movies!',
    'I love the new Lord of the Rings show!',
    'I hate the new Lord of the Rings show!'
];

const thoughtsLength = thoughtText.length;

const reactionBody = [
    'I agree!',
    'I disagree!',
    'I love it!',
    'I hate it!',
    'I like it!',
    'I dislike it!'
];

const reactionLength = reactionBody.length;

connnection.on('error', (err) => err); 

connection.once('open', async () => {
    await Thought.deleteMany();
    await User.deleteMany();

    const initArray = [...Array(NUMBER).keys()];

    const Users = initArray.map((userNum) => {
        const username = `user${userNum}`;
        return {
            _id: new Types.ObjectId(),
            username,
            email: `${username}@example.com`
        };
    });
});

const usersLength = initialUsers.length;

    const thoughts = initArray.map((elem) => {
        const reactionList = [...Array(getRandom(4)).keys()]
        return {
            _id: new Types.ObjectId(),
            thoughtText: thoughtTexts[getRandom(thoughtsLength)],
            username: initialUsers[getRandom(usersLength)].username,
            reactions: reactionList.map((elem) => {
                return {
                    reactionId: new Types.ObjectId(),
                    reactionBody: reactionBodies[getRandom(reactionsLength)],
                    username: initialUsers[getRandom(usersLength)].username,
                };
            }),
        };
    });

    const users = initialUsers.map((user) => {
        const userThoughts = thoughts.filter((thought) => {
            return thought.username === user.username
        });

        const userFriends = initialUsers.filter((friend) => {
            const randomNumber = getRandom(NUMBER);
            return user.username !== friend.username && (randomNumber % 2 === 0);
        });

        user.thoughts = userThoughts.map((thought) => {
            return thought._id;
        });

        user.friends = userFriends.map((user) => {
            return user._id;
        });

        return user;
    });

    const userDocs = await User.collection.insertMany(users);
    const thoughtDocs = await Thought.collection.insertMany(thoughts);

    console.log(userDocs);
    console.log(thoughtDocs);

    console.info("Seeding done!");
    process.exit(0);