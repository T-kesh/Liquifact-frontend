require('@testing-library/jest-dom');

// Simple polyfills for Node environment
global.Request = class Request {};
global.Response = class Response {
  constructor(body, init = {}) {
    this.body = body;
    this.status = init.status || 200;
    this.headers = init.headers || {};
  }
};

const { toHaveNoViolations } = require('jest-axe');
expect.extend(toHaveNoViolations);
