# RESTful API with Node Express

Almost ready to use API Service. This is a Undockerized version of https://github.com/chonla/node-express-member.

## Run

```
node server.js
```

## Preloaded Data

**Every time server is started, database will be restored.**

### Users

2 logins (`admin` and `john`) with password `password`.

#### Fields

| Name | Description |
| - | - |
| login | Login name |
| password | Password (hashed) |
| display | Display name |
| email | Email address |

### Reviews

2 reviews.

#### Fields

| Name | Description |
| - | - |
| title | Review title |
| imgUrl | Book display photo URL |
| context | Review context |
| score | Review score |
| date | Review Date |
| _id | Review ID |

## API

### Public API

* **Login:** POST /auth/login
* **User register:** POST /users
* **Get list of reviews:** GET /reviews
* **Get review:** GET /reviews/`:id`

### Authorization required API

Authorization with Bearer authorization scheme is required in header.

* **Create a review:** POST /reviews
* **Update review :** PATCH /reviews/`:id`
* **Delete a review:** DELETE /reviews/`:id`
* **Update user profile:** PATCH /users/`:id`
* **Update my profile:** PATCH /me
* **Get my profile:** GET /me

Credit: chonla/bnk-json-server