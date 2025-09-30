import store from "../store/store";

export const loginFormValidation = (email, password) => {
  let isValid = true;
  const newError = { emailError: "", passError: "" };

  // Validate Email
  if (!email) {
    newError.emailError = "enter email";
    isValid = false;
  }

  // Validate Password
  if (!password) {
    newError.passError = "enter password";
    isValid = false;
  }

  if (isValid) {
    newError.emailError = "";
    newError.passError = "";
  }

  return newError;
};

//  TO VALIDATE EMAIL METHOD
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// TO VALIDATE PASSWORD

export const passwordRules = {
  minLength: 8,
  maxLength: 20,
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /\d/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
};
export function validatePassword(password) {
  if (password.length < passwordRules.minLength) {
    return false;
  }
  if (password.length > passwordRules.maxLength) {
    return false;
  }
  if (!passwordRules.hasUpperCase.test(password)) {
    return false;
  }
  if (!passwordRules.hasLowerCase.test(password)) {
    return false;
  }
  if (!passwordRules.hasNumber.test(password)) {
    return false;
  }
  if (!passwordRules.hasSpecialChar.test(password)) {
    return false;
  }

  return true;
}

export const registrationFormValidation = (email, name, username, password) => {
  const { users } = store.getState().users;
  let isValid = true;
  const newError = {
    emailError: "",
    nameError: "",
    usernameError: "",
    passwordError: "",
  };

  users.map((user) => {
    if (user.email === email) {
      newError.emailError = "email already registered";
      isValid = false;
    }
  });

  if (!validateEmail(email)) {
    newError.emailError = "wrong email address";
    isValid = false;
  }
  if (!email) {
    newError.emailError = "email is required";
    isValid = false;
  }

  if (!validatePassword(password)) {
    newError.passwordError = `password must be ${passwordRules.minLength} to ${passwordRules.maxLength} characters. must contain at least one uppercase letter, one lowercase letter, one number, one special character.`;
    isValid = false;
  }

  if (!password) {
    newError.passwordError = "password is required";
    isValid = false;
  }
  if (!name) {
    newError.nameError = "enter your name";
    isValid = false;
  }

  users.map((user) => {
    if (user.username === username) {
      newError.usernameError = "username not available";
      isValid = false;
    }
  });
  if (!username) {
    newError.usernameError = "enter your username";
    isValid = false;
  }

  return newError;
};
