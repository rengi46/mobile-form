
async function  findEmail (email) {
  const dataFetch = await fetch('http://localhost:1337/api/usuarios', {
    method: 'GET'
  });
  const dataJson = await dataFetch.json();
  const dataUsers = dataJson.data;
  const findEmail = dataUsers.find((user) => {
    if (user.attributes.Email === email) {
      return user;
    } 
  });
  return findEmail;
}

async function  postUser (nombre,apellido,email,birthday,genero,phoneNumber) {
  const data = {data:{
    Name: nombre,
    Apellido: apellido,
    Email: email,
    dateBirthday: birthday,
    Genero: genero,
    NumberPhone: phoneNumber,
  }};
  const response = await fetch('http://localhost:1337/api/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

async function  postPointGame(idUser,point,idGame) {
  const data = {data:{
    juego: Number(idGame),
    usuario: idUser,
    points: Number(point),
  }};
  console.log(data);
  const response = await fetch('http://localhost:1337/api/rank-games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

module.exports = {
  findEmail,
  postUser,
  postPointGame,
};