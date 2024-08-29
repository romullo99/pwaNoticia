document.addEventListener("DOMContentLoaded", () => {
    displayNews();
});

function displayNews() {
    const newsList = document.querySelector("#news-list");
    const news = getNewsFromLocalStorage();
    const userName = new URLSearchParams(window.location.search).get("name");

    const userNews = news.filter(n => n.userName === userName);

    if (userNews.length === 0) {
        newsList.innerHTML = `<li class="item">Nenhuma notícia cadastrada para este usuário.</li>`;
        return;
    }

    userNews.forEach(({ title, content }, index) => {
        const li = document.createElement("li");
        li.classList.add("item");
        li.innerHTML = `
            <strong>${title}</strong>
            <br>
            <button class="view-news" data-title="${encodeURIComponent(title)}" data-content="${encodeURIComponent(content)}">Ver Notícia</button>
        `;
        newsList.appendChild(li);
    });

    document.querySelectorAll(".view-news").forEach(button => {
        button.addEventListener("click", (e) => {
            const title = decodeURIComponent(e.target.dataset.title);
            const content = decodeURIComponent(e.target.dataset.content);
            showNewsContent(title, content);
        });
    });
}

function getNewsFromLocalStorage() {
    return localStorage.getItem("news") ? JSON.parse(localStorage.getItem("news")) : [];
}

function showNewsContent(title, content) {
    const newsList = document.querySelector("#news-list");
    newsList.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
        <a href="index3.html" class="btn">Voltar para a lista</a>
    `;
}
