'use strict';

//Opcje
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags a',
    optArticleAuthorSelector = '.post-author',
    optSidebarAuthorSelector = '.authors a';

// Funkcja do generowania listy tytułów artykułów
function generateTitleLinks() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

//Pobranie wszystkich artykułów
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

//Pętla po wszystkich artykułach
    for (let article of articles) {
        //Pobranie id artykułu
        const articleId = article.getAttribute('id');

        //Pobranie tytułu artykułu
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

        //Tworzenie kodu HTML linku
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        html += linkHTML;
    }

    // Dodanie wszystkich linków do listy w lewej kolumnie
    titleList.innerHTML = html;

    // Dodanie nasłuchiwania na kliknięcia w tytuły
    const links = document.querySelectorAll(`${optTitleListSelector} a`);
    for (let link of links) {
    link.addEventListener('click', handleTitleClick);
    }
}

// Funkcja do obsługi kliknięcia na tytuł artykułu
function handleTitleClick(event) {
    event.preventDefault();

    // Usunięcie klasy active ze wszystkich artykułów i linków
    const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
    for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
    }

    const activeLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
    for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    }

    // Dodanie klasy active do klikniętego linku
    const clickedElement = event.currentTarget;
    clickedElement.classList.add('active');

    // Wyświetlenie powiązanego artykułu
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);
    targetArticle.classList.add('active');
}

// Funkcja do generowania listy tagów
function generateTags() {
    // Znalezienie wszystkich artykułów
    const articles = document.querySelectorAll(optArticleSelector);
    let allTags = {};

    // Dla każdego artykułu
    for (let article of articles) {
        const articleTags = article.querySelectorAll(optArticleTagsSelector);
        for (let tag of articleTags) {
            const tagText = tag.innerHTML;

            if (!allTags[tagText]) {
                allTags[tagText] = 1;
            } else {
                allTags[tagText]++;
            }
        }
    }

        // Wstawianie tagów do sidebaru
        const tagList = document.querySelector('.tags');
        tagList.innerHTML = '';

        // Dla każdego tagu
        for (let tag in allTags) {
            // Wygenerowanie kodu HTML linku
            const tagHTML = `<li><a href="#" class="tag-link">${tag}</a> <span>(${allTags[tag]})</span></li>`;
            tagList.innerHTML += tagHTML;
        }

        // Dodaj nasłuchiwanie na kliknięcia w tagi
        addClickListenersToTags();
    }

// Funkcja do obsługi kliknięcia na tag
function handleTagClick(event) {
    event.preventDefault();

    const clickedElement = event.currentTarget;
    const tag = clickedElement.innerHTML.trim();

    console.log('Tag clicked:', tag);

    // Usunięcie klasy active ze wszystkich artykułów
    const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
    activeArticles.forEach(article => article.classList.remove('active'));

    // Przefiltrowanie artykułów po tagach
    const articles = document.querySelectorAll(optArticleSelector);
    articles.forEach(article => {
        const articleTags = article.querySelectorAll(optArticleTagsSelector);
        let hasTag = false;
        articleTags.forEach(articleTag => {
            if (articleTag.textContent.trim() === tag) {
                hasTag = true;
            }
        });
        if (hasTag) {
            article.classList.add('active');
        }
    });
}

// Funkcja do dodania nasłuchiwania na kliknięcia w tagi
function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('.tag-link');
    console.log(`Found ${tagLinks.length} tag links`);
    for (let tagLink of tagLinks) {
        tagLink.addEventListener('click', handleTagClick);
    }
}

// Funkcja do obsługi kliknięcia na autora
function handleAuthorClick(event) {
    event.preventDefault();

    const clickedElement = event.currentTarget;
    const author = clickedElement.textContent.trim();

    console.log('Author clicked:', author);

    // Usunięcie klasy active ze wszystkich artykułów
    const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
    activeArticles.forEach(article => article.classList.remove('active'));

    // Przefiltrowanie artykułów po autorze
    const articles = document.querySelectorAll(optArticleSelector);
    let foundArticle = false;

    articles.forEach(article => {
        const articleAuthor = article.querySelector(optArticleAuthorSelector).textContent.trim();
        console.log('Comparing:', articleAuthor, 'with', author);

        if (articleAuthor === author) {
            article.classList.add('active');
            foundArticle = true;
        }
    });
    // Jeśli nie znaleziono artykułu, wyświetlamy błąd w konsoli
    if (!foundArticle) {
        console.error(`No article found for author: ${author}`);
    }
}

// Funkcja do dodania nasłuchiwania na kliknięcia w autorów
function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll(optSidebarAuthorSelector);
    console.log(`Found ${authorLinks.length} author links`);

    for (let authorLink of authorLinks) {
        authorLink.addEventListener('click', handleAuthorClick);
    }
}

// Uruchomienie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    generateTitleLinks();
    generateTags();
    addClickListenersToAuthors();
});

