# Social Network API README

This repository contains the code for a social network API that uses a NoSQL database, specifically MongoDB, to handle large amounts of unstructured data. This API is designed to be used by a social media startup.

## Getting Started

To use this API, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and MongoDB if they are not already installed.
3. In the project directory, install the required dependencies by running `npm install`.
4. Run `npm start` to start the server and sync the Mongoose models to the MongoDB database.

Once the server is running, you can test the API using a tool like Insomnia or Postman.

## API Routes

The API provides the following routes:

### Users

- `GET /api/users` - Returns all users in the database.
- `GET /api/users/:id` - Returns a single user with the specified ID.
- `POST /api/users` - Creates a new user.
- `PUT /api/users/:id` - Updates an existing user.
- `DELETE /api/users/:id` - Deletes a user.

### Thoughts

- `GET /api/thoughts` - Returns all thoughts in the database.
- `GET /api/thoughts/:id` - Returns a single thought with the specified ID.
- `POST /api/thoughts` - Creates a new thought.
- `PUT /api/thoughts/:id` - Updates an existing thought.
- `DELETE /api/thoughts/:id` - Deletes a thought.

### Reactions

- `POST /api/thoughts/:thoughtId/reactions` - Adds a reaction to the specified thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Removes a reaction from the specified thought.

### Friends

- `POST /api/users/:userId/friends/:friendId` - Adds the specified user as a friend of the user with the specified ID.
- `DELETE /api/users/:userId/friends/:friendId` - Removes the specified user from the friend list of the user with the specified ID.

## Technologies Used

This API was built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose

## License

This project is licensed under the MIT License. See the LICENSE file for more information.

 
