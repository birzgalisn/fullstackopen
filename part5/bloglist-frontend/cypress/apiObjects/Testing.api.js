/// <reference types="cypress" />

import BaseApi from "./Base.api";

class TestingApi extends BaseApi {
  static get url() {
    return BaseApi.url + "/testing";
  }
}

export default TestingApi;
