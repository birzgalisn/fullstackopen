/// <reference types="cypress" />

import user from "../fixtures/user";
import BaseApi from "./Base.api";

class UsersApi extends BaseApi {
  static get url() {
    return BaseApi.url + "/users";
  }

  static initialize() {
    this.post(this.url, user);
  }
}

export default UsersApi;
