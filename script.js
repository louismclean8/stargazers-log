const repositoryList = document.querySelector("#repository-list");
const status = document.querySelector("#status");

function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00`));
}

function createRepositoryCard(repository) {
  const item = document.createElement("li");
  item.className = "repository-card";

  const title = document.createElement("h3");
  const link = document.createElement("a");
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = repository.repository;
  title.append(link);

  const description = document.createElement("p");
  description.textContent = repository.description;

  const metadata = document.createElement("p");
  metadata.className = "repository-meta";
  metadata.textContent = `${repository.language} · ${repository.stars.toLocaleString()} stars · Starred ${formatDate(repository.starredAt)}`;

  item.append(title, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Unable to load repositories: ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
    status.textContent = `${repositories.length} repositories`;
  } catch (error) {
    status.textContent = "Repositories could not be loaded.";
    console.error(error);
  }
}

loadRepositories();
