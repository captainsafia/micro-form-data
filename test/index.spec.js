const listen = require("test-listen");
const fetch = require("isomorphic-fetch");
const micro = require("micro");
const test = require("ava");
const FormData = require("form-data");

const formData = require("../src");

test("do not set formData if Content-Type is not multipart/form-data", async t => {
  const service = async (request, response) =>
    micro.send(response, 200, request.formData);

  const server = micro(formData(service));
  const url = await listen(server);

  const response = await fetch(url);

  /**
   * Parse as text here because parsing as JSON on an undefined return
   * raises an exception. Undefined will be mapped to an empty string here.
   */
  t.is(await response.text(), "");

  await server.close();
});

test("returns empty object if boundary not defined in Content-Type", async t => {
  const service = async (request, response) =>
    micro.send(response, 200, request.formData);

  const server = micro(formData(service));
  const url = await listen(server);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  t.deepEqual(await response.json(), {});

  await server.close();
});

test("returns formData object when give form with single field", async t => {
  const service = async (request, response) =>
    micro.send(response, 200, request.formData);

  const server = micro(formData(service));
  const url = await listen(server);

  const body = new FormData();
  body.append("testName", "testValue");

  const response = await fetch(url, {
    method: "POST",
    body
  });

  t.deepEqual(await response.json(), { testName: "testValue" });

  await server.close();
});

test("returns formData object when give form with multiple field", async t => {
  const service = async (request, response) =>
    micro.send(response, 200, request.formData);

  const server = micro(formData(service));
  const url = await listen(server);

  const body = new FormData();
  body.append("testName", "testValue");
  body.append("testName1", "testValue1");

  const response = await fetch(url, {
    method: "POST",
    body
  });

  t.deepEqual(await response.json(), {
    testName: "testValue",
    testName1: "testValue1"
  });

  await server.close();
});
