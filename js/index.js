function displayBranches(ev) {
  const branches = JSON.parse(this.responseText);
   const branchList = `<ul>${branches
     .map(
       branch =>
         '<li><strong>' +
         branch.name +
         '</strong>' +
         '</li>'
     )
     .join('')}</ul>`;
   document.getElementById('details').innerHTML = branchList;
}


function getBranches(el) {
  const url = el.dataset.url;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', url + '/branches');
  req.send();
}

function displayCommits(ev) {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
     .map(
       commitInfo =>
         '<li><strong>' +
         commitInfo.author.login + ' - ' +
         commitInfo.commit.author.name +
         '</strong> - ' +
         commitInfo.commit.message +
         '</li>'
     )
     .join('')}</ul>`;
   document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const url = el.dataset.url;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', url + '/commits');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  var user = repos[0].owner.login;
  let urlBase = 'https://api.github.com/repos/' + user + '/';
  // add link to repo
  console.log("display Repos",repos);
  const repoList = `<ul>${repos
    .map(
       r =>
         '<li>' +
         '<a href=' + r.url + '>' + r.name + '</a>' +
         ' - <a href="#" data-url="' +
         urlBase + r.name +
         '" onclick="getCommits(this)">Get Commits</a></li>' +
         ' - <a href="#" data-url="' +
         urlBase + r.name +
         '" onclick="getBranches(this)">Get Branches</a></li>'
     )
    .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}
