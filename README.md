# Back-end

The back-end part of the Medwing coding challenge.

## Technologies
- Express.js
- RamdaJS(for functional programming)
- Lowdb(lowdb is a small local JSON database powered by Lodash)
- Postman(for testing APIs)
- PM2(Process manager for nodejs)

## Installation

Use the package manager [yarn](https://yarnpkg.com/en/) to install the project.

## install required dependencies:
```bash
yarn
```

## Run

```bash
yarn run start
```
After running the start command, application will be ready on __http://localhost:3001/api/v1/*__ URL.

### applicatoin logs
* After running project
```
npx pm2 logs
```
NOTICE: for using __npx__, you should be installed the latest npm version.

## Test endpoints
I've created a collection of endpoints by [postman](https://www.getpostman.com/) and if you have it, you can import the postman exported collection in your postman account in the below path:
```bash
./postman/Medwing.postman_collection.json
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[MIT](https://choosealicense.com/licenses/mit/)
