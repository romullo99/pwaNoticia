document.addEventListener("DOMContentLoaded", () => {
    const submitNewsButton = document.querySelector("#submit-news-button");
    submitNewsButton.addEventListener("click", (e) => {
        e.preventDefault();

        const userName = document.querySelector("#user-name-input").value.trim();
        const userEmail = document.querySelector("#user-email").value.trim();
        const title = document.querySelector("#title").value.trim();
        const content = document.querySelector("#content").value.trim();

        if (userName === "" || userEmail === "" || title === "" || content === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        saveUserToLocalStorage(userName, userEmail);
        saveNewsToLocalStorage(userName, userEmail, title, content);
        alert("Notícia cadastrada com sucesso!");

        // Atualizar a lista de notícias após o cadastro
        displayNews();

        document.querySelector("#title").value = "";
        document.querySelector("#content").value = "";
    });

    // Carregar e exibir notícias cadastradas ao carregar a página
    displayNews();
});

function saveUserToLocalStorage(userName, userEmail) {
    const users = getUsersFromLocalStorage();
    // Verifica se o usuário já existe pelo email
    const userExists = users.some(user => user.email === userEmail);
    if (!userExists) {
        users.push({ name: userName, email: userEmail });
        localStorage.setItem("users", JSON.stringify(users));
    }
}

function getUsersFromLocalStorage() {
    return localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
}

function saveNewsToLocalStorage(userName, userEmail, title, content) {
    const news = getNewsFromLocalStorage();
    news.push({ userName, userEmail, title, content });
    localStorage.setItem("news", JSON.stringify(news));
}

function getNewsFromLocalStorage() {
    return localStorage.getItem("news") ? JSON.parse(localStorage.getItem("news")) : [];
}

function displayNews() {
    const newsList = document.querySelector("#news-list");
    newsList.innerHTML = ""; // Limpar lista antes de exibir

    const news = getNewsFromLocalStorage();
    news.forEach((item) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item", "card", "mb-3", "p-3", "bg-light", "text-dark");
        newsItem.innerHTML = `
            <h3 class="card-title">${item.title}</h3>
            <p class="card-text">${item.content}</p>
            <small class="text-muted">Publicado por: ${item.userName} (${item.userEmail})</small>
        `;
        newsList.appendChild(newsItem);
    });

    if (news.length === 0) {
        newsList.innerHTML = "<p class='text-center'>Não há notícias cadastradas.</p>";
    }
}

