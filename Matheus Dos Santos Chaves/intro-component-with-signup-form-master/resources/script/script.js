
const form = document.getElementById("signup-form");

const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const password = document.getElementById("password");

const successMessage = document.getElementById("form-success");

function showError(input, message) {
  const group = input.parentElement;
  const errorMessage = group.querySelector(".error-message");

  group.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  errorMessage.textContent = message;
}

function clearError(input) {
  const group = input.parentElement;
  const errorMessage = group.querySelector(".error-message");

  group.classList.remove("error");
  input.removeAttribute("aria-invalid");
  errorMessage.textContent = "";
}

function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;
  let firstInvalid = null;

  successMessage.hidden = true;

  const fields = [
    {
      input: firstName,
      message: "O nome não pode ficar vazio"
    },
    {
      input: lastName,
      message: "O sobrenome não pode ficar vazio"
    },
    {
      input: email,
      message: "O e-mail não pode ficar vazio"
    },
    {
      input: password,
      message: "A senha não pode ficar vazia"
    }
  ];

  fields.forEach(function (field) {
    const input = field.input;
    const value = input.value.trim();

    clearError(input);

    if (value === "") {
      showError(input, field.message);
      isValid = false;

      if (!firstInvalid) {
        firstInvalid = input;
      }
    } else if (input === email && !isValidEmail(value)) {
      showError(input, "Parece que este e-mail é inválido");
      isValid = false;

      if (!firstInvalid) {
        firstInvalid = input;
      }
    }
  });

  if (isValid) {
    successMessage.textContent = "Formulário enviado com sucesso!";
    successMessage.hidden = false;
  } else {
    firstInvalid.focus();
  }
});

[firstName, lastName, email, password].forEach(function (input) {
  input.addEventListener("input", function () {
    clearError(input);
    successMessage.hidden = true;
  });
});
