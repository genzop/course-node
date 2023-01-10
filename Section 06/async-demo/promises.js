// Para crear una promise, el constructor debe recibir como parametro una funcion.
// Esta funcion a su vez, recibe dos paramatros 'resolve' y 'reject'.
// La promise se encuentra en estado 'Pendiente' hasta que se resuelva o se rechaze
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (1 === 1) {
      // Resolve se utiliza cuando queremos finalizar exitosamente
      resolve(1);
    } else {
      // Reject se utiliza cuando queremos señalizar un error
      reject(new Error('An unexpected error ocurred'));
    }
  }, 500);
});

// Para esperar a que una promise se resuelva, se debe usar el metodo 'then'
// Para manejar cualquier error que pueda ocurrir en el promise, se debe usar el metodo 'catch'
p.then((result) => console.log('Result', result)).catch((error) =>
  console.log('Error', error.message)
);

// Crear promise exitosa
const pResolved = Promise.resolve({ id: 1 });

// Crear promise con error
const pRejected = Promise.reject(new Error('Reason for rejection...'));

// Promises en paralelo
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation #1...');
    resolve(1);
  }, 2000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('Async operation #2...');
    resolve(2);
  }, 2000);
});

// Esperar a que se completen todas las promises indicadas
Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log('Error', error.message));

// Esperar a que se complete una promise
Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((error) => console.log('Error', error.message));

console.log('Before');

getUser(1)
  .then((user) => getRepositories(user.username))
  .then((repositories) => getCommits(repositories[0]))
  .then((commits) => console.log(commits))
  .catch((error) => console.log('Error', error.message));

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, username: 'Enzo' });
    }, 500);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading repositories from GitHub...');
      resolve(['Repo #1', 'Repo #2', 'Repo #3']);
    }, 500);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading commits from GitHub...');
      resolve(['Commit #1', 'Commit #2', 'Commit #3']);
    }, 500);
  });
}
