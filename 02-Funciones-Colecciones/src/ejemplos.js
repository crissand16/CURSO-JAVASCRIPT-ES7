// formas de declarar funciones en javascript

function sumar(a, b) {
  return a + b;
}

console.log(sumar(5, 3)); // Imprime 8

const multiplicar = function (a, b) {
  return a * b;
};

console.log(multiplicar(5, 3)); // Imprime 15

const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max); // clamp a un rango entre min y max
};
console.log(clamp(10, 0, 5)); // Imprime 5 (clamp a 5)

// Parametros por defecto, rest y guard clauses

function greet(name = "Invitado") {
  if (!name.trim())
    // trim elimina espacios en blanco al inicio y al final de la cadena
    return "Hola, Invitado!";
  return `Hola, ${name}!`;
}

console.log(greet()); // Imprime "Hola, Invitado!"
console.log(greet("Alice"));

// Arrays y metodos claves

const numeros = [1, 2, 3, 4, 5];
const cuadrados = numeros.map((num) => num * 2); // map crea un nuevo array con los resultados de la función aplicada a cada elemento
console.log(cuadrados); // Imprime [1, 4, 9, 16, 25]

const expenses = [
  { amount: 50, category: "food" },
  { amount: 20, category: "transport" },
  { amount: 30, category: "food" },
];
// filter 

const foodExpenses = expenses.filter((expense) => expense.category === "food"); 
// filter crea un nuevo array con los elementos que cumplen la condición
console.log(foodExpenses); // Imprime [{ amount: 50, category: "food" }, { amount: 30, category: "food" }]

const totalFoodExpense = foodExpenses.reduce((total, expense) => total + expense.amount, 0);
// reduce acumula un valor a través de los elementos del array, en este caso sumando los montos de los gastos de comida
console.log(totalFoodExpense); // Imprime 80


//-----------------------------------------------------------------------------------------------------

// _____________________________5 EJEMPLOS DE MAP_____________________________


// Ejemplo 1 precios + IVA
const precios = [100, 200, 300];
const preciosConIVA = precios.map(precio => precio * 1.19 );

console.log(preciosConIVA);



// Ejemplo 2 mostrar nombres
const usuarios = [
  { nombre: "Johan", edad: 25 },
  { nombre: "Santiago", edad: 30 },
  { nombre: "Cristian", edad: 28 }
];

const nombres = usuarios.map(usuario => usuario.nombre);

console.log(nombres);


// Ejemplo 3 numeros al cuadrado
const nums = [2, 4, 6, 8, 10];
const numsalcu = nums.map(nums => nums ** 2);

console.log(numsalcu);


// Ejemplo 4 formatear productos
const productos = ["Laptot", "Mouse", "Teclado", "Audifonos"];
const productosdelete = productos.map(productos => productos.toUpperCase());

console.log(productosdelete);


// Ejemplo 5 agregar estado de tareas
const tarea = ["Estudiar", "Ejercicio"];
const tareaestado = tarea.map(tarea =>({
  pendiente: tarea,
  completado: false }));

console.log (tareaestado);


// _____________________________5 EJEMPLOS DE FILTER_____________________________

// Ejemplo 1 filtrar palabras largas
const palabras = ["sol", "esternocleidomastoideo", "luz"];
const largas = palabras.filter(p => p.length > 4);

console.log(largas);


// Ejemplo 2 filtrar cantidad objetos
const inventriofiesta = [
  { amount: 50, category: "vasos" },
  { amount: 20, category: "mesas" },
  { amount: 80, category: "cucharas" },
  { amount: 70, category: "tenedores" },
  { amount: 40, category: "invitados" },
];
const mesasinv = inventriofiesta.filter((inventario) => inventario.category === "mesas"); 

console.log(mesasinv);


// Ejemplo 3 porductos en oferta
const productoss = [
  { nombre: "Camisa", oferta: true },
  { nombre: "Pantalón", oferta: false }
];
const enOferta = productoss.filter(p => p.oferta);

console.log(enOferta);


// Ejemplo 4 obtener numeros pares
const numpa = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const pares = numpa.filter(n => n % 2 === 0);

console.log(pares);


// Ejemplo 5 filtrar temperaturas altas
const temp = ["20 C", "38 C", "10 C", "50 C"];
const tempalta = temp.filter(t => parseInt(t) > 35);

console.log (tempalta)


// _____________________________5 EJEMPLOS DE REDUCE_____________________________

// Ejemplo 1 sumar todos los numeros
const numbers = [10, 20, 30];
const suma = numbers.reduce((acum, num) => acum + num, 0);

console.log(suma);


// Ejemplo 2 contar elementos
const names = ["Sara", "Luis", "Sara", "Julian"];

const conteo = names.reduce((acum, nombre) => {
  acum[nombre] = (acum[nombre] || 0) + 1;
  return acum;
}, {});

console.log(conteo);

// Ejemplo 3 obtener el numero mayor
const datos = [5, 99, 32, 12];

const mayorr = datos.reduce((max, num) => 
  num > max ? num : max
);

console.log(mayorr);


// Ejemplo 4 conteo de mercancia
const frutas = ["manzana", "pera", "manzana", "naranja", "pera", "manzana"];

const contar = frutas.reduce((acumulador, fruta) => {
  acumulador[fruta] = (acumulador[fruta] || 0) + 1;
  return acumulador;
}, {});

console.log(contar);


// Ejemplo 5 suma numeros positivos
const dates = [5, -3, 8, -2, 10];

const sumaPositivos = dates.reduce((acumulador, numero) => {
  if (numero > 0) {
    return acumulador + numero;
  }
  return acumulador;
}, 0);

console.log(sumaPositivos); 
