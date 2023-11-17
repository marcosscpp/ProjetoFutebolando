export default function idadeValida(campo) {
  const dataNascimento = new Date(campo.value);
  if (!validaIdade(dataNascimento)) {
    campo.setCustomValidity(
      "O usuário não tem idade para participar do projeto"
    );
  }
}

function validaIdade(data) {
  const today = new Date();
  const daysCalc = 1000 * 60 * 60 * 24;
  const idadeEmAnos = Math.floor((today - data) / daysCalc / 365);
  return idadeEmAnos < 18 && idadeEmAnos > 7
}
