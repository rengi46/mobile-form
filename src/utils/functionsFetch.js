const autorization = process.env.REACT_APP_AUTHORIZATION;
const url = process.env.REACT_APP_URL;

var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${autorization}`);


async function  findEmail (email) {
  const dataFetch = await fetch('http://localhost:1337/api/usuarios', {
    method: 'GET',
    headers: myHeaders
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
  myHeaders.append('Content-Type', 'application/json');
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
    headers: myHeaders,
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

async function  postPointGame(idUser,point,idGame) {
  myHeaders.append('Content-Type', 'application/json');
  const data = {data:{
    juego: Number(idGame),
    usuario: idUser,
    points: Number(point),
  }};
  console.log(data);
  const response = await fetch('http://localhost:1337/api/rank-games', {
    method: 'POST',
    headers: myHeaders,
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