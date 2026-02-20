"use strict"; 


// 1. EJEMPLO CON DATOS

const texto = "Holaaa";
const numero = 77; 
const activo = true;
let indefinido; 
const vacio = null;

console.log(texto); 
console.log(numero ); 
console.log(activo); 
console.log(indefinido); 
console.log(vacio); 


// 2. EJEMPLO LISTA
const lista = [1, 2, 3];
console.log(lista[0]); 
console.log(lista[1]);
console.log(lista[2]);


// 3. EJEMPLO OBJETO

const persona = { nombre: "Cristian Andres Gomez Casallas" };
console.log(persona.nombre); 


// 4. EJEMPLO FUNCION

function mensaje() {
  console.log("Recuerda esforzarte al maximo en todo lo que haces");
}

mensaje();


// 5. EJEMPLO OPERACIONES

const sumar = (a, b) => a + b;
console.log(sumar(5, 10));

const restar = (c, d) => c - d;
console.log(restar(10, 5));

const multiplicar = (e, f) => e * f;
console.log(multiplicar(5, 10));

const dividir = (x, y) => x / y;
console.log(dividir(10, 2));


// 6. EJEMPLO NUMERO TELEFONICO

let telefono = 3003439242;
console.log(telefono)


// 7. EJEMPLO COMPARACION

const edad = 17;
const mensaje2 = edad >= 18 ? "Mayor" : "Menor";
console.log(mensaje2);


// 8. EJEMPLO LET vs CONST

const x = 5;//No se puede remplazar

let y = 5;
y = 6; //si se puede remplazar


// 9. EJEMLO NUMERO

const num = Number("3407182"); // convierte string a number
console.log(num);


// 10. EJEMPLO SPREAD

const a = [1, 2];
const b = [...a, 3, 4];
const c = [...b, 5]
console.log(c);





