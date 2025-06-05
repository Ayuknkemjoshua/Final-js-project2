function fetchGitHubData(){
  const username = document.getElementById("username").value.trim();
  const profileContainer = document.getElementById("profile");
  const reposContainer = document.getElementById("repos");
  const container = document.querySelector(".container");

  profileContainer.innerHTML = "";
  reposContainer.innerHTML = "";

  if (!username) return alert("Please enter a GitHub username.");

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
  
    .then(user => {
      profileContainer.innerHTML = ` 
        <div class="profile-card">
          <img src="${user.avatar_url}" alt="Avatar">
          <div>
            <h2>${user.name || user.login}</h2>
            <p>${user.bio || ""}</p>
            <p><strong>Followers:</strong> ${user.followers} | <strong>Following:</strong> ${user.following}</p>
            <a href="${user.html_url}" target="_blank">View Profile</a>
          </div>
        </div>
      `;
      container.style.display ="block"
      return fetch(user.repos_url);
    })
    .then(res => res.json())
    .then(repos => {
      reposContainer.innerHTML = "<h3>Repositories:</h3>";
      repos.forEach(repo => {
        reposContainer.innerHTML += `
          <div class="repo">
            <a href="${repo.html_url}" target="_blank">${repo.name.wrap}</a>
            <p>${repo.description || "No description"}</p>
          </div>
        `;
      });
    })
    .catch(error => {
      profileContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
};
