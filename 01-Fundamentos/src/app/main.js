/**
 * ==========================================
 * CONVERSOR DE UNIDADES (TEMPERATURA / LONGITUD)
 * ==========================================
 */

"use strict";

// ---------- FUNCIONES DE VALIDACIÓN ----------

// verificar si es número válido
function esNumero(valor) {
  if (valor === "" || valor === " ") return false;
  return !isNaN(valor) && isFinite(valor);
}

// categorías de unidades
const temperatura = ["C", "F", "K"];
const longitud = ["m", "km", "cm"];

// verificar categoría
function categoriaUnidad(unidad) {
  if (temperatura.includes(unidad)) return "temperatura";
  if (longitud.includes(unidad)) return "longitud";
  return null;
}

// ---------- CONVERSIONES TEMPERATURA ----------

function convertirTemperatura(valor, from, to) {

  if (from === "C" && to === "F")
    return (valor * 9 / 5) + 32;

  if (from === "F" && to === "C")
    return (valor - 32) * 5 / 9;

  if (from === "C" && to === "K")
    return valor + 273.15;

  if (from === "K" && to === "C")
    return valor - 273.15;

  if (from === "F" && to === "K")
    return (valor - 32) * 5 / 9 + 273.15;

  if (from === "K" && to === "F")
    return (valor - 273.15) * 9 / 5 + 32;

  return valor;
}

// ---------- CONVERSIONES LONGITUD ----------

function convertirLongitud(valor, from, to) {

  // pasar todo a metros
  let metros;

  if (from === "m") metros = valor;
  if (from === "km") metros = valor * 1000;
  if (from === "cm") metros = valor / 100;

  // convertir desde metros
  if (to === "m") return metros;
  if (to === "km") return metros / 1000;
  if (to === "cm") return metros * 100;

}

// ---------- FUNCIÓN PRINCIPAL ----------

function convertir(valor, from, to) {

  // validar número
  if (!esNumero(valor)) {
    throw new Error("❌ Error: valor inválido");
  }

  const catFrom = categoriaUnidad(from);
  const catTo = categoriaUnidad(to);

  // validar unidades
  if (!catFrom || !catTo) {
    throw new Error("❌ Error: unidad no soportada");
  }

  // validar categorías iguales
  if (catFrom !== catTo) {
    throw new Error("❌ Error: categorías incompatibles");
  }

  let resultado;

  if (catFrom === "temperatura") {
    resultado = convertirTemperatura(valor, from, to);
  }

  if (catFrom === "longitud") {
    resultado = convertirLongitud(valor, from, to);
  }

  return resultado.toFixed(2); // para los 2 decimales
}

// ---------- PRUEBAS MANUALES ----------

function prueba(valor, from, to) {
  try {
    const res = convertir(valor, from, to);
    console.log({valor, from, res, to});
  } catch (error)
   {
    console.log(error.message);
  }
}

console.log("====== PRUEBAS ======");

// criterios del ejercicio
prueba(100, "C", "F");   // 212.00 F
prueba(32, "F", "C");    // 0.00 C
prueba(0, "C", "F");     // 32.00 F
prueba(-40, "C", "F");   // caso especial
prueba(1500, "m", "km"); // 1.50 km
prueba(1.2, "km", "m");  // 1200.00 m

// errores
prueba("abc", "C", "F");
prueba(10, "kg", "g");
prueba(10, "C", "m");
prueba("", "m", "km");