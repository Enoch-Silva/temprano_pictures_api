const moment = require("moment");

const dataActual = moment().format("DD-MM-YYYY");
const horaActual = moment().format("HH:mm");

//console.log(`${horaActual} - ${dataActual}`);

class Pessoa {}

Pessoa.prototype.falar = function () {
  console.log("Olá Enoch...");
};

const pedro = new Pessoa();

//pedro.falar();

function saySome(texto) {
  console.log(texto);
}

//saySome("Olá senhor!");

/*
(function dizerData() {
  console.log(dataActual);
})();


console.log("Enoch");
console.log("\n");
console.log("Silva");




*/
