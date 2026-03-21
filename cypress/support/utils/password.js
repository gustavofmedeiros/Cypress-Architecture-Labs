/*
  Helper para gerar senhas de teste no padrão exigido pela API.
  Regra: Ao menos uma letra maiúscula + ao menos uma letra minúscula + ao menos um dígito + ao menos um caractere especial.
  Objetivo: centralizar a lógica e facilitar reuso em múltiplas specs.
*/

const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";

function getRandomChar(chars) {
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

export function generateTestPassword() {
  // Escolhe uma maiúscula aleatória para garantir a regra desde o primeiro caractere.
  const firstChar = getRandomChar(UPPERCASE_LETTERS);
  // Preenche o "miolo" com minúsculas para manter legibilidade e cumprir o mínimo de letras.
  const middleChars = Array.from({ length: 6 }, () => getRandomChar(LOWERCASE_LETTERS)).join("");
  // Adiciona um dígito aleatório para atender à regra numérica sem depender do prefixo.
  const digitChar = getRandomChar(DIGITS);
  // Usa "!" fixo para garantir o caractere especial sempre presente
  const symbolChar = "!";

  return `${firstChar}${middleChars}${digitChar}${symbolChar}`;
}
