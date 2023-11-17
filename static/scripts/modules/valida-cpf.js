export default function isCPF(cpfField) {
  const cpfFormatado = cpfField.value.replace(/\.|-/g, "");
  if (!validaNumerosRepetidos(cpfFormatado) || !validaDigitos(cpfFormatado)) {
    cpfField.setCustomValidity("Esse cpf não é válido");
  }
}

function validaNumerosRepetidos(cpf) {
  return !/(.)\1{10}/.test(cpf);
}

function validaDigitos(cpf) {
  let somaPrimeiroDigito = 0;
  let somaSegundoDigito = 0;
  let multi = 11;

  for (let i = 0; i < 10; i++) {
    somaSegundoDigito += cpf[i] * multi;
    if (i > 0) {
      somaPrimeiroDigito += cpf[i - 1] * multi;
    }
    multi--;
  }

  somaPrimeiroDigito = (somaPrimeiroDigito * 10) % 11;
  somaSegundoDigito = (somaSegundoDigito * 10) % 11;

  if (somaPrimeiroDigito == 10 || somaPrimeiroDigito == 11) {
    somaPrimeiroDigito = 0;
  }
  if (somaSegundoDigito == 10 || somaSegundoDigito == 11) {
    somaSegundoDigito = 0;
  }
  return (
    somaPrimeiroDigito == cpf[cpf.length - 2] &&
    somaSegundoDigito == cpf[cpf.length - 1]
  );
}
