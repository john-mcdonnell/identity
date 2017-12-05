/*jshint esversion: 6 */

exports.handler = (event, context, callback) => {
  let responseCode = 200;
  var responseBody;

  if (event.headers !== null && event.headers !== undefined) {
    if (event.headers.plainText === undefined || event.headers.plainText === null || event.headers.plainText === "") {
      responseCode = 400;
      responseBody = {
        message: 'plainText value not provided'
      };
    } else if (event.headers.algorithm === undefined || event.headers.algorithm === null || event.headers.algorithm === "") {
      responseCode = 400;
      responseBody = {
        message: 'algorithm value not provided'
      };
    } else if (event.headers.algorithm !== "bcrypt") {
      responseCode = 400;
      responseBody = {
        message: 'algorithm \'' + event.headers.algorithm + '\' is unsupported'
      };
    } else {
      const hash = 'hashed-value';
      responseBody = {
        hash: hash
      };
    }
  } else {
    responseCode = 400;
    responseBody = {
      message: 'no input fields provided'
    };
  }

  var response = {
    statusCode: responseCode,
    body: JSON.stringify(responseBody)
  };
  callback(null, response);
};