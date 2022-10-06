/// <reference types="cypress" />

import TestingApi from "./Testing.api";

class ResetApi extends TestingApi {
  static get url() {
    return TestingApi.url + "/reset";
  }

  static reset() {
    this.post(this.url);
  }
}

export default ResetApi;
