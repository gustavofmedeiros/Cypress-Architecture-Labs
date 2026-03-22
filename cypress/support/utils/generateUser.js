/*
  Helper para gerar usuário de teste no padrão esperado pelo formulário de registro.
  Objetivo: centralizar a criação de dados válidos e evitar massa estática nos specs.
*/

const FIRST_NAMES = [
  'Ana',
  'Bruno',
  'Carla',
  'Diego',
  'Elisa',
  'Fabio',
  'Gabi',
  'Hugo'
]

const LAST_NAMES = [
  'Silva',
  'Souza',
  'Oliveira',
  'Pereira',
  'Costa',
  'Rodrigues',
  'Almeida',
  'Santos'
]

/*
  Seleciona um item aleatório de uma lista de opções.
  Usado para variar os nomes sem depender de bibliotecas externas.
*/
function getRandomItem(list) {
  const index = Math.floor(Math.random() * list.length)
  return list[index]
}

/*
  Gera usuário com firstName, lastName e userName únicos para uso na UI.
  A senha é definida separadamente no spec para manter flexibilidade por cenário.
*/
export function generateUser() {
  return {
    firstName: getRandomItem(FIRST_NAMES),
    lastName: getRandomItem(LAST_NAMES),
    userName: `user${Date.now()}`
  }
}
