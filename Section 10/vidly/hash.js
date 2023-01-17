const bcrypt = require('bcrypt');

async function run() {
  // Crear salt
  const salt = await bcrypt.genSalt(10);

  // Hashear valor utilizando salt
  const hashed = await bcrypt.hash('1234', salt);

  console.log(salt);
  console.log(hashed);
}

run();
