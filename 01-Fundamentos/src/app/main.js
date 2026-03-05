"use strict";

const readline = require("readline");

// ---------- CONFIG TERMINAL ----------

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta) {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

// ---------- NORMALIZACIÓN DE UNIDADES ----------

const aliasUnidades = {
  // Temperatura
  c: "C",
  celsius: "C",
  centigrados: "C",
  centígrados: "C",

  f: "F",
  fahrenheit: "F",

  k: "K",
  kelvin: "K",

  // Longitud
  m: "m",
  metro: "m",
  metros: "m",

  km: "km",
  kilometro: "km",
  kilometros: "km",
  kilómetro: "km",
  kilómetros: "km",

  cm: "cm",
  centimetro: "cm",
  centimetros: "cm",
  centímetro: "cm",
  centímetros: "cm"
};

function normalizarUnidad(unidad) {
  if (!unidad) return null;
  return aliasUnidades[unidad.toLowerCase()] || null;
}

// ---------- VALIDACIÓN ----------

function esNumero(valor) {
  return !isNaN(valor) && valor !== "" && isFinite(valor);
}

const temperatura = ["C", "F", "K"];
const longitud = ["m", "km", "cm"];

function categoriaUnidad(unidad) {
  if (temperatura.includes(unidad)) return "temperatura";
  if (longitud.includes(unidad)) return "longitud";
  return null;
}

// ---------- CONVERSIONES ----------

function convertirTemperatura(valor, from, to) {

  if (from === "C" && to === "F") return (valor * 9 / 5) + 32;
  if (from === "F" && to === "C") return (valor - 32) * 5 / 9;
  if (from === "C" && to === "K") return valor + 273.15;
  if (from === "K" && to === "C") return valor - 273.15;
  if (from === "F" && to === "K") return (valor - 32) * 5 / 9 + 273.15;
  if (from === "K" && to === "F") return (valor - 273.15) * 9 / 5 + 32;

  return valor;
}

function convertirLongitud(valor, from, to) {

  let metros;

  if (from === "m") metros = valor;
  if (from === "km") metros = valor * 1000;
  if (from === "cm") metros = valor / 100;

  if (to === "m") return metros;
  if (to === "km") return metros / 1000;
  if (to === "cm") return metros * 100;
}

// ---------- FUNCIÓN PRINCIPAL ----------

function convertir(valor, from, to) {

  if (!esNumero(valor)) {
    throw new Error("inserta un valor numerico que sea valido");
  }

  const catFrom = categoriaUnidad(from);
  const catTo = categoriaUnidad(to);

  if (!catFrom || !catTo) {
    throw new Error("Unidad no soportada");
  }

  if (catFrom !== catTo) {
    throw new Error("No se pueden convertir categorías distintas");
  }

  let resultado;

  if (catFrom === "temperatura") {
    resultado = convertirTemperatura(valor, from, to);
  }

  if (catFrom === "longitud") {
    resultado = convertirLongitud(valor, from, to);
  }

  return resultado.toFixed(2);
}

// ---------- PROGRAMA INTERACTIVO ----------

async function main() {
  try {

    const valorInput = await preguntar("Ingrese el valor a convertir: ");

    //  VALIDACIÓN DIRECTA AQUÍ
    if (!esNumero(valorInput)) {
      console.log("inserta un valor numerico que sea valido");
      rl.close();
      return;
    }

    const unidadOrigenInput = await preguntar("Unidad de origen: ");
    const unidadDestinoInput = await preguntar("Unidad de destino: ");

    const valor = parseFloat(valorInput);

    const unidadOrigen = normalizarUnidad(unidadOrigenInput);
    const unidadDestino = normalizarUnidad(unidadDestinoInput);

    if (!unidadOrigen || !unidadDestino) {
      throw new Error("Unidad escrita no reconocida");
    }

    const resultado = convertir(valor, unidadOrigen, unidadDestino);

    console.log(`\n Resultado: ${valor} ${unidadOrigen} = ${resultado} ${unidadDestino}`);

  } catch (error) {
    console.log("\n" + error.message);
  } finally {
    rl.close();
  }
}

main();