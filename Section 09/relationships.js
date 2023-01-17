// Existen tres estrategias a la hora de relacionar documentos en una base de datos NoSQL. Dependiendo que prioridad queramos darle a la CONSISTENCIA vs. PERFORMANCE

// 1. Reference (Normalization)
//   - Las relaciones se obtienen realizando multiples consultas.
//   - Los datos son CONSISTENTES pero esto afecta la performance.
//   - Es como funcionan las bases de datos SQL.
let author = {
  id: 1,
  name: 'Mosh Hamedani',
};

let course = {
  author: 1,
};

// 2. Embedding (Denormalization)
//   - Las relaciones se obtienen anidando objetos.
//   - Los datos son redundantes y no consistentes pero al realizar solo 1 consulta, es mucho mas PERFORMANTE.
let course2 = {
  author: {
    name: 'Mosh Hamedani',
  },
};

// 3. Hybrid
//   - Tambien se anidan objetos, pero solo se incluyen los datos que sean necesarios.
//   - Y se guarda el id que referencia al otro objeto en caso de que se necesite uno de los datos no anidados.
let course3 = {
  author: {
    id: 1,
    name: 'Mosh Hamedani',
  },
};
