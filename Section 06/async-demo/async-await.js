console.log('Before');

async function displayCommits() {
  try {
    const user = await getUser(1);
    const repositories = await getRepositories(user.username);
    const commits = await getCommits(repositories[0]);
    console.log(commits);
  } catch (error) {
    console.log(error.message);
  }
}
displayCommits();

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
