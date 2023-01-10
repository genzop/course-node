console.log('Before');

getUser(1, displayUser);

console.log('After');

function displayUser(user) {
  console.log('User:', user);
  getRepositories(user.username, displayRepositories);
}

function displayRepositories(repositories) {
  console.log('Repositories:', repositories);
  getCommits(repositories[0], displayCommits);
}

function displayCommits(commits) {
  console.log('Commits:', commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from a database...');
    callback({ id: id, username: 'Enzo' });
  }, 500);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log('Reading repositories from GitHub...');
    callback(['Repo #1', 'Repo #2', 'Repo #3']);
  }, 500);
}

function getCommits(repository, callback) {
  setTimeout(() => {
    console.log('Reading commits from GitHub...');
    callback(['Commit #1', 'Commit #2', 'Commit #3']);
  }, 500);
}
