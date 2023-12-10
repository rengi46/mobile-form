const autorization = process.env.REACT_APP_AUTHORIZATION;
const url = process.env.REACT_APP_URL;




async function  findEmail (email) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  const dataFetch = await fetch(url+'api/usuarios', {
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
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  myHeaders.append('Content-Type', 'application/json');
  const data = {
    Name: nombre,
    Apellido: apellido,
    Email: email,
    dateBirthday: birthday,
    Genero: genero,
    // NumberPhone: phoneNumber,
  };
  console.log(data);
  const response = await fetch(url+'api/usuarios', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({data:data}),
  });
  const json = await response.json();
  return json.data;
}

async function  postPointGame(idUser,point,idGame) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  myHeaders.append('Content-Type', 'application/json');
  const data = {data:{
    juego: Number(idGame),
    usuario: idUser,
    points: Number(point),
  }};
  console.log(data);
  const response = await fetch(url+'api/rank-games', {
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