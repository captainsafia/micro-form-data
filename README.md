# @tanmulabs/micro-form-data

`@tanmulabs/micro-form-data` parses the `FormData` in `multipart/form-data` requests sent in a request via micro.

### Installation

```
$ npm install --save @tanmulabs/micro-form-data
```

OR

```
$ yarn add @tanmulabs/micro-form-data
```

### Example

```
const formData = require('@tanmulabs/micro-form-data');

module.exports = formData(async (request, response) => {
    const { formData } = request;
    if (formData.name) {
        console.log('Found name in form data.');
    }
});

```

### Development

```
$ git clone https://github.com/tanmulabs/micro-form-data.git
$ cd micro-form-data
$ npm install
$ npm test
```
