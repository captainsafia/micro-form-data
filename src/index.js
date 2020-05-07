const { text } = require("micro");

module.exports = exports = fn =>
  async function(request, response) {
    const formData = {};

    const { headers } = request;
    const contentType = headers["content-type"];

    if (contentType && contentType.includes("multipart/form-data")) {
      const boundarySearch = contentType.match(/boundary=(.*)/);
      if (boundarySearch) {
        const boundary = boundarySearch[1];

        const body = await text(request);
        const parsedBody = body.split(`--${boundary}`);

        parsedBody.map(field => {
          const nameSearch = field.match(/name=\"(.*?)\"/);

          if (nameSearch) {
            const fieldName = nameSearch[1];
            const fieldValue = field
              .split(`${fieldName}"`)
              .pop()
              .replace(/(\r\n|\n|\r)/gm, "");

            formData[fieldName] = fieldValue;
          }
        });
      }
      request.formData = formData;
    }
    return fn(request, response);
  };
