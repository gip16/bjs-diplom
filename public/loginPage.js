"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, responce => {
    if (!responce.success) {
      userForm.setLoginErrorMessage(responce.error);
    } else {
      location.reload();
    }
  });
};

userForm.registerFormCallback = data => {
  ApiConnector.register(data, responce => {
    if (!responce.success) {
      userForm.setRegisterErrorMessage(responce.error);
    } else {
      location.reload();
    }
  });
};