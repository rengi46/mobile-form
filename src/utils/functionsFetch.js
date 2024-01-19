const { variables } = require("./config");

const autorization = process.env.REACT_APP_AUTHORIZATION;
const url = process.env.REACT_APP_URL;




async function  findEmail (email) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  const dataFetch = await fetch(url+'/api/usuarios', {
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

async function  postUser (nombre,apellido,email,birthday,genero,phoneNumber,centro,premio) {
  const generoBueno = genero === ""? null: genero;
  const birthdayBueno = birthday === ""? null: birthday;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  myHeaders.append('Content-Type', 'application/json');
  const data = {
    "Name": nombre,
    "Apellido": apellido,
    "Email": email,
    "dateBirthday": birthdayBueno,
    "Genero": generoBueno,
    "NumberPhone": phoneNumber,
    "Premio": premio,
    "createdBy":variables.ID_CLIENTE,
    "publishedAt": new Date(),
  };
  const response = await fetch(url+'/api/usuarios', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({data:data}),
  });
  const json = await response.json();
  console.log(json);
  return json;
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
  const response = await fetch(url+'/api/rank-games', {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

async function getCheks(){
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  const dataFetch = await fetch(url+`/api/checks?populate=users_permissions_user`, requestOptions);
  const dataJson = await dataFetch.json();
  const dataUsers = dataJson.data;
  console.log(dataUsers);
  return dataUsers;
}

async function postCheck (idCheque) {
 
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({data: {"regaloEntregado": true}}),
    redirect: 'follow'
  };
  const response = await fetch(url+"/api/checks/" + idCheque, requestOptions);
  const json = await response.json();
  return json;
}

async function postRegalo(data){

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${autorization}`);
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
    redirect: 'follow'
  };
  const response = await fetch(url+"/api/regalos/", requestOptions);
  const json = await response.json();
  return json;

}

module.exports = {
  findEmail,
  postUser,
  postPointGame,
  getCheks,
  postCheck,
  postRegalo
};