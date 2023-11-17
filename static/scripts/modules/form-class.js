import isCPF from "./valida-cpf.js";
import idadeValida from "./valida_data.js";

const errorTypes = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "tooLong",
  "customError",
];

const errorMessages = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido com pelo menos 6 caracteres.",
  },
  nome_responsavel: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido com pelo menos 8 caracteres.",
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um e-mail válido.",
    tooShort: "Por favor, preencha um e-mail válido.",
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF deve ter pelo menos 11 caracteres.",
  },
  data_nascimento: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "O aluno deve ter entre 7 e 17 anos.",
  },
  telefone: {
    valueMissing: "O campo de telefone não pode estar vazio.",
    patternMismatch: "Por favor, insira um número de telefone válido.",
    tooShort: "O campo de telefone deve ter pelo menos 10 caracteres.",
  },
  cep: {
    valueMissing: "O campo de CEP não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CEP válido.",
    tooShort: "O campo de CEP deve ter pelo menos 8 caracteres.",
  },
  cidade: {
    valueMissing: "O campo de cidade não pode estar vazio.",
    tooShort: "Por favor, preencha um nome de cidade válido.",
  },
  rua: {
    valueMissing: "O campo de rua não pode estar vazio.",
    tooShort: "Por favor, preencha um nome de rua válido.",
  },
  numero_endereco: {
    valueMissing: "O campo de número de endereço não pode estar vazio.",
  },
  complemento: {
    tooShort: "Por favor, preencha um complemento de até 80 caracteres.",
  },
  observacoes: {
    valueMissing: "O campo de observações não pode estar vazio.",
  },
  bairro: {
    valueMissing: "O campo de bairro não pode estar vazio.",
  },
  permissoes: {
    valueMissing: "Você deve concordar com os termos para prosseguir.",
  },
};

export default class StepForm {
  constructor() {
    this.form = document.querySelector("[data-form]");
    this.submit = this.form.querySelector("input[name='submit']");
    this.fieldForm = this.form.querySelectorAll("input");
    this.progress = this.form.querySelector("[data-progress]");
    this.progressTexts = this.progress.parentNode.querySelectorAll(".step");
    this.currentStep = 0;
    this.imageInput = this.form.querySelector("input[type='file']");
    this.buttons = this.form.querySelectorAll("button");
    this.formGroups = this.form.querySelectorAll(".form-group");
    this.cepField = this.form.querySelector("input[name='cep']");
    document.addEventListener("DOMContentLoaded", () =>
      this.form.addEventListener("submit", (event) => this.submitForm(event))
    );

    this.initFormsRegex();
    this.buttons.forEach((btn) => {
      if (btn.classList.contains("avancar")) {
        btn.setAttribute("disabled", true);
      }
      btn.addEventListener("click", (event) => this.activateForm(event));
    });

    this.imageInput.addEventListener("change", (event) =>
      this.changeImageForm(event)
    );
    this.cepInit();
    this.initForm();
  }

  initForm() {
    this.fieldForm.forEach((field) => {
      if (field.name !== "csrf_token") {
        field.addEventListener("input", () => this.verificaCampo(field));
        field.addEventListener("blur", () => this.verificaCampo(field));
        field.addEventListener("invalid", (e) => e.preventDefault());
      }
    });
  }

  verificaCampo(field) {
    let message;

    if (field.name == "file") return;
    field.setCustomValidity("");
    if (field.name == "cpf") {
      isCPF(field);
    }
    if (field.name == "data_nascimento") {
      idadeValida(field);
    }
    errorTypes.forEach((erro) => {
      if (field.validity[erro]) {
        message = errorMessages[field.name][erro];
      }
    });

    const validityField = field.checkValidity();
    const errorMessage = field.nextElementSibling;
    if (!validityField) {
      errorMessage.textContent = message;
      field.classList.add("erro");
    } else {
      try {
        errorMessage.textContent = "";
        field.classList.remove("erro");
      } catch (error) {}
    }
    const formGroup = field.closest(".form-group");
    this.validaFormGroup(formGroup);
    this.validaForm();
  }

  validaForm() {
    if (this.form.checkValidity()) this.submit.removeAttribute("disabled");
    else this.submit.setAttribute("disabled", true);
  }

  validaFormGroup(formGroup) {
    const formGroupBtn = formGroup.querySelectorAll("button");

    const nextBtn = formGroupBtn[formGroupBtn.length - 1];
    const fieldFormGroup = Array.from(formGroup.querySelectorAll("input"));
    if (fieldFormGroup.every((field) => field.checkValidity())) {
      if (nextBtn.getAttribute("disabled")) {
        nextBtn.removeAttribute("disabled");
      }
      return;
    }
    nextBtn.setAttribute("disabled", true);
  }

  submitForm(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    formData.delete("csrf_token");
    formData.delete("image");

    const xhr = new XMLHttpRequest();
    const csrf = document.getElementById("csrf_token");
    const formGroups = this.formGroups; // Armazena uma referência fora do escopo

    xhr.open("POST", "/cadastro", true);

    xhr.setRequestHeader("X-CSRFToken", csrf.value);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const retorno = JSON.parse(xhr.responseText).message;
        Object.entries(retorno).forEach((erro) => {
          if (erro[0] == 0) {
            const alert = `<li class="alert ${
              retorno.includes("existente") ? "danger" : "sucess"
            } role="alert">${retorno}<button aria-label="Fechar" class="close-btn" onclick="closeAlert(event)"> &times; </button></li>`;
            document.getElementById("messages").innerHTML = alert;
          } else {
            const errorMessageInput = document.querySelector(
              `input[name='${erro[0]}']`
            );

            if (errorMessageInput) {
              const formGroup = errorMessageInput.closest(".form-group");

              if (formGroup === formGroups[1]) {
                this.buttons[3].click();
              } else if (formGroup === formGroups[0]) {
                this.buttons[1].click();
              } else {
                this.buttons[3].click();
                this.buttons[1].click();
              }

              errorMessageInput.nextElementSibling.textContent = erro[1];
              errorMessageInput.classList.add("erro");
            }
          }
        });
      }
    }.bind(this); // Associa o 'this' da classe à função de retorno
    xhr.send(formData);
  }

  activateForm(event) {
    const formGroup = event.target.closest(".form-group");
    event.preventDefault();

    if (event.target.classList.contains("avancar")) {
      this.moveFormPart(formGroup, "meio", "comeco");
      this.moveFormPart(formGroup.nextElementSibling, "fim", "meio");
      this.nextStep();
    } else {
      this.moveFormPart(formGroup, "meio", "fim");
      this.moveFormPart(formGroup.previousElementSibling, "comeco", "meio");
      this.previousStep();
    }
  }

  nextStep() {
    if (this.currentStep < this.progressTexts.length - 1) {
      this.currentStep++;
      this.updateProgressDom();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateProgressDom();
    }
  }

  moveFormPart(domElement, start, end) {
    domElement.classList.add(end);
    domElement.classList.remove(start);
  }

  updateProgressDom() {
    this.progressTexts.forEach((text, index) =>
      this.currentStep < index ? text.classList.remove("check") : undefined
    );

    this.progressTexts[this.currentStep].classList.add("check");
    this.progress.setAttribute("class", "progress");

    const classProgress = ["inicio", "meio", "fim"];
    this.progress.classList.add(classProgress[this.currentStep]);
  }

  initFormsRegex() {
    const fields = this.form.querySelectorAll("input[type='text']");
    const regexTexts = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/;

    fields.forEach((field) => {
      if (
        field.getAttribute("name") !== "cep" &&
        field.getAttribute("name") !== "cpf"
      ) {
        field.addEventListener("input", (e) => {
          const inputValue = e.target.value;
          if (!regexTexts.test(inputValue)) {
            e.target.value = inputValue.replace(
              /[^a-zA-ZÀ-ÿ\u00f1\u00d1\s]/g,
              ""
            );
          }
        });
      }
    });
  }

  cepInit() {
    const cepRegex = /^[0-9]{1,9}$/;
    this.cepField.addEventListener("keypress", (e) => {
      const keyPressed = String.fromCharCode(e.keyCode);
      if (!cepRegex.test(keyPressed)) {
        e.preventDefault();
        return;
      }
    });

    this.cepField.addEventListener("keyup", (e) => {
      const inputValue = e.target.value;

      if (inputValue.length === 8) {
        this.getAddress(inputValue);
      } else if (inputValue.length === 9) {
        this.getAddress(inputValue.replace("-", ""));
      }
    });
  }

  async getAddress(zipCode) {
    this.cepField.blur();
    const url = `https://viacep.com.br/ws/${zipCode}/json`;

    const response = await fetch(url);
    const adressData = await response.json();
    if (adressData.erro == true) {
      this.cepField.classList.add("erro");
      this.cepField.nextElementSibling.textContent = "CEP inválido";
      return;
    } else {
      this.form.querySelector("#rua").value = adressData.logradouro;
      this.form.querySelector("#cidade").value = adressData.localidade;
      this.form.querySelector("#complemento").value = adressData.complemento;
      this.form.querySelector("#bairro").value = adressData.bairro;
    }
  }

  changeImageForm(event) {
    let arquivos = event.target.files;
    if (arquivos.length !== 0) {
      if (
        arquivos[0].type === "image/jpeg" ||
        arquivos[0].type === "image/png" ||
        arquivos[0].type === "image/jpg"
      ) {
        const figure = document.querySelector("figure");
        const imageFig = figure.querySelector("img");
        imageFig.setAttribute("src", URL.createObjectURL(arquivos[0]));
        imageFig.classList.add("img-fluid");
      } else {
        alert("Formato não suportado");
      }
    }
  }
}
