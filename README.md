# Express.js Assignments

## Assignment 6 - Authentication and Authorization

For this assignment, I added login and authentication using JWT. User passwords are hashed with bcrypt before they are saved to the database.

### Authorization rules

- A user can update and delete their own account.
- A user can update and delete cats that belong to them.
- A normal user cannot update or delete another user's account or cats.
- An admin can update and delete any user's account or cats.
