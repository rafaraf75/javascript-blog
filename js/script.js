'use strict';

// Funkcja do generowania listy tytułów artykułów
function generateTitleList() {
    const articles = document.querySelectorAll('.post');
    const titleList = document.querySelector('.titles');
    titleList.innerHTML = '';

    articles.forEach(article => {
        const articleId = article.getAttribute('id');
        const articleTitle = article.querySelector('.post-title').innerHTML;
        const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
        titleList.innerHTML += linkHTML;
    });
}

// Funkcja do generowania chmury tagów
function generateTags() {
    const tags = {};
    const articles = document.querySelectorAll('.post');

    articles.forEach(article => {
        const articleTags = article.querySelectorAll('.post-tags a');

        articleTags.forEach(tag => {
            const tagText = tag.innerHTML;
            if (!tags[tagText]) {
                tags[tagText] = 1;
            } else {
                tags[tagText]++;
            }
        });
    });

    const tagList = document.querySelector('.tags');
    tagList.innerHTML = '';

    for (let tag in tags) {
        const tagHTML = `<li><a href="#" class="tag-link">${tag}</a> <span>(${tags[tag]})</span></li>`;
        tagList.innerHTML += tagHTML;
    }
}

// Funkcja do generowania listy autorów
function generateAuthors() {
    const authors = {};
    const articles = document.querySelectorAll('.post');

    articles.forEach(article => {
        const articleAuthor = article.querySelector('.post-author').innerHTML.replace('by ', '');
        if (!authors[articleAuthor]) {
            authors[articleAuthor] = 1;
        } else {
            authors[articleAuthor]++;
        }
    });

    const authorList = document.querySelector('.authors');
    authorList.innerHTML = '';

    for (let author in authors) {
        const authorHTML = `<li><a href="#" class="author-link">${author}</a></li>`;
        authorList.innerHTML += authorHTML;
    }
}

// Funkcja do obsługi kliknięcia na tytuł artykułu
function handleTitleClick(event) {
    event.preventDefault();

    console.log('Clicked:', event.currentTarget.outerHTML);

    const activeArticles = document.querySelectorAll('.post.active');
    activeArticles.forEach(article => article.classList.remove('active'));

    const activeLinks = document.querySelectorAll('.titles a.active');
    activeLinks.forEach(link => link.classList.remove('active'));

    const clickedElement = event.currentTarget;
    clickedElement.classList.add('active');

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    console.log('Target Article Selector:', articleSelector);
    console.log('Target Article:', targetArticle);

    // Sprawdź, czy targetArticle nie jest null
    if (targetArticle) {
        targetArticle.classList.add('active');
    } else {
        console.error('Article not found for selector:', articleSelector);
    }
}

// Funkcja do obsługi kliknięć na tagi
function handleTagClick(event) {
    event.preventDefault();
    const clickedElement = event.currentTarget;
    const tag = clickedElement.innerHTML;

    console.log('Tag clicked:', tag);

    const articles = document.querySelectorAll('.post');
    articles.forEach(article => {
        const articleTags = article.querySelectorAll('.post-tags a');
        let hasTag = false;
        articleTags.forEach(articleTag => {
            if (articleTag.innerHTML === tag) {
                hasTag = true;
            }
        });
        article.classList.toggle('active', hasTag);
    });
}

// Funkcja do obsługi kliknięć na autorów
function handleAuthorClick(event) {
    event.preventDefault();

    const clickedElement = event.currentTarget;
    console.log('Author clicked:', clickedElement.textContent);

    const authorName = clickedElement.textContent.trim();
    console.log('Author Name:', authorName);

    const targetArticles = document.querySelectorAll('.post');
    let authorFound = false;

    targetArticles.forEach(article => {
        const articleAuthor = article.querySelector('.post-author').innerHTML.replace('by ', '').trim();
        console.log('Checking article with author:', articleAuthor);

        if (articleAuthor === authorName) {
            authorFound = true;
            article.classList.add('active');
        } else {
            article.classList.remove('active');
        }
    });

    if (!authorFound) {
        console.error('No articles found for author:', authorName);
    }
}

// Dodaj nasłuchiwanie na kliknięcia na liście tytułów
function addClickListenersToTitles() {
    const links = document.querySelectorAll('.titles a');
    links.forEach(link => link.addEventListener('click', handleTitleClick));
}

// Dodaj nasłuchiwanie na kliknięcia na tagach
function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('.tag-link');
    tagLinks.forEach(tag => tag.addEventListener('click', handleTagClick));
}

// Dodaj nasłuchiwanie na kliknięcia na autorach
function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll('.author-link');
    authorLinks.forEach(author => author.addEventListener('click', handleAuthorClick));
}

// Uruchomienie wszystkich funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    generateTitleList();
    generateTags();
    generateAuthors();
    addClickListenersToTitles();
    addClickListenersToTags();    // Dodajemy obsługę kliknięć na tagach
    addClickListenersToAuthors(); // Dodajemy obsługę kliknięć na autorach
});
