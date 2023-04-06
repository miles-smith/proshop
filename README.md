# ProShop Demo App

## Description

Demo eCommerce app built upon the MERN stack.

## Getting Started

### Dependencies

* [Node JS](https://nodejs.org/en)
* [Yarn](https://yarnpkg.com)
* [MongoDB](https://www.mongodb.com/)

### Executing program

#### Install dependencies
* Install Node. Using a runtime manager like [asdf](https://asdf-vm.com) or [nodenv](https://github.com/nodenv/nodenv) is highly recommended. This project was built using Node version 14.
* Install Yarn. See first party documentation.
* Install MongoDB. See first party documentation.
* Install project dependencies: `yarn install`

#### Configure environment
Some configuration details are stored in `.env` files which are not committed to the repository (since they contain some secretd). Create a `packages/backend/.env` file and add the following configuration details to the file:

| Setting            | Description                                                                | Example Value |
| -                  | -                                                                          | -             |
| `NODE_ENV`         | The Node environment that the application will run in.                     | `development` |
| `PORT`             | The port number that the backend service will listen on.                   | `5000` |
| `MONGO_URI`        | Connection string for the MongoDB database.                                | `mongodb://127.0.0.1:27017/proshop` |
| `JWT_SECRET`       | Secret token that will be used for signing authentication JSON web tokens. | |
| `PAYPAL_CLIENT_ID` | See "PayPal integration" section delow.                                    | |

#### Seed database
The project contains a script for populating the database with some seed data:
```bash
yarn workspace proshop-backend data:import
```

#### Launch application
Launch the application by executing `yarn start` from the root of the project. This should launch a new browser tab/window. Failing that, navigate to `http://localhost:3000`.

#### PayPal integration
This project features a PayPal integration for handling payments as part of the checkout process. For this functionality to work, there is some additional setup that needs to be done:
* Sign in at https://developer.paypal.com
* Make sure that sandbox mode in enabled.
* Create test accounts; 1x business and 1x personal.
* Create/register a new REST API app (use the business account fromn the previous step).
* Add the Client ID to the `packages/backend/.env` file (as `PAYPAL_CLIENT_ID`).

## Version History

See CHANGELOG.md

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

* [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce)
* [Brad Traversy](https://github.com/bradtraversy)
