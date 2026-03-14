"use strict";

// Funciones setup + validaciones base

function toNumber(value, label = "Valor") {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`${label} debe ser un número válido`);
  }
  return n;
}

function assertNonNegative(value, label = "Valor") {
  if (value < 0) {
    throw new Error(`${label} debe ser un número no negativo`);
  }
}

function toNonEmptyString(value, label = "Valor") {
  const s = String(value).trim();
  if (s.length === 0) {
    throw new Error(`${label} no puede ser una cadena vacía`);
  }
  return s;
}

// Normalización del gasto

function normalizeExpense(raw) {
  const id = toNonEmptyString(raw.id, "ID");
  const fecha = toNonEmptyString(raw.fecha, "Fecha");
  const categoria = toNonEmptyString(raw.categoria, "Categoría");
  const descripcion = toNonEmptyString(raw.descripcion, "Descripción");
  const monto = toNumber(raw.monto, "Monto");

  assertNonNegative(monto, "Monto");

  return {
    id,
    fecha,
    categoria,
    descripcion,
    monto,
  };
}

const expenses = [
  normalizeExpense({
    id: "e1",
    fecha: "2024-01-15",
    categoria: "Alimentacion",
    descripcion: "Compra en supermercado",
    monto: 8500000,
  }),
  normalizeExpense({
    id: "e2",
    fecha: "2024-01-20",
    categoria: "Transporte",
    descripcion: "Pasaje de bus",
    monto: 150000,
  }),
  normalizeExpense({
    id: "e3",
    fecha: "2024-01-25",
    categoria: "Entretenimiento",
    descripcion: "Entrada al cine",
    monto: 500000,
  }),
  normalizeExpense({
    id: "e4",
    fecha: "2024-01-30",
    categoria: "Salud",
    descripcion: "Consulta médica",
    monto: 2000000,
  }),
  normalizeExpense({
    id: "e5",
    fecha: "2024-02-05",
    categoria: "Educación",
    descripcion: "Curso en línea",
    monto: 1200000,
  }),
  normalizeExpense({
    id: "e6",
    fecha: "2024-02-05",
    categoria: "Educación",
    descripcion: "Lapices",
    monto: 1000000,
  }),
  normalizeExpense({
    id: "e7",
    fecha: "2024-02-05",
    categoria: "Salud",
    descripcion: "medicamentos",
    monto: 1990000,
  }),
  normalizeExpense({
    id: "e8",
    fecha: "2024-02-05",
    categoria: "Entretenimiento",
    descripcion: "Parque de diversiones",
    monto: 5000000,
  }),
    normalizeExpense({
    id: "e9",
    fecha: "2024-02-05",
    categoria: "Transporte",
    descripcion: "Servicios publicos",
    monto: 4200000,
  }),
];

// Estadísticas básicas

function calcStats(expenses) {
  if (expenses.length === 0) {
    return {
      total: 0,
      promedio: 0,
      maximo: 0,
      minimo: 0,
    };
  }

  const values = expenses.map((e) => e.monto);

  const total = values.reduce((acc, n) => acc + n, 0);
  const minimo = Math.min(...values);
  const maximo = Math.max(...values);
  const promedio = total / values.length;

  return { total, promedio, maximo, minimo };
}

// Totales por categoría

function totalByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.categoria] = (acc[e.categoria] || 0) + e.monto;
    return acc;
  }, {});
}

// Formato moneda COP

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Función que suma el monto total por categoría (igual a totalByCategory pero con otro nombre)
function sumTotalByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.categoria] = (acc[e.categoria] || 0) + e.monto;
    return acc;
  }, {});
}

// Función que retorna el gasto con monto más alto
function highestExpense(expenses) {
  if (expenses.length === 0) return null;
  return expenses.reduce((max, e) => (e.monto > max.monto ? e : max), expenses[0]);
}

// Función que retorna los últimos n gastos (por defecto 5)
function lastExpenses(expenses, n = 5) {
  return expenses.slice(-n);
}

// Reporte en consola

function printReport(expenses) {
  const stats = calcStats(expenses);
  const byCat = totalByCategory(expenses);
  const sumCat = sumTotalByCategory(expenses);
  const highest = highestExpense(expenses);
  const last = lastExpenses(expenses, 5);


 console.group("REPORTE - ANALIZADOR DE GASTOS");

  console.log("Resumen:");
  console.table([
    {
      Total: formatCOP(stats.total),
      Promedio: formatCOP(stats.promedio),
      Minimo: formatCOP(stats.minimo),
      Maximo: formatCOP(stats.maximo),
      Registros: expenses.length,
    },
  ]);

  console.log("Totales por categoría:");
  console.table(
    Object.entries(byCat).map(([categoria, total]) => ({
      Categoria: categoria,
      Total: formatCOP(total),
    }))
  );

  console.log("Suma total por categoría:");
  console.table(
    Object.entries(sumCat).map(([categoria, total]) => ({
      Categoria: categoria,
      Total: formatCOP(total),
    }))
  );

    console.log("Gasto más alto:");
    console.table([{
      ID: highest.id,
      Fecha: highest.fecha,
      Categoría: highest.categoria,
      Descripción: highest.descripcion,
      Monto: formatCOP(highest.monto),
    }]); // highest toma un valor por ejemplo(.fecha), y lo usa para crear una propiedad llamada fecha


  console.log("Últimos gastos:");
  console.table(
    last.map(e => ({
      ID: e.id,
      Fecha: e.fecha,
      Categoría: e.categoria,
      Descripción: e.descripcion,
      Monto: formatCOP(e.monto),
    }))
  );

  console.groupEnd();
}

printReport(expenses);