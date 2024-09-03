'use strict';

//Opcje
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

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

    // Dodanie nasłuchiwania na kliknięcia w linki
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', handleTitleClick);
    }
}

// Funkcja do obsługi kliknięcia na tytuł artykułu
function handleTitleClick(event) {
    event.preventDefault();

    const clickedElement = event.currentTarget;
    console.log('Clicked:', clickedElement.outerHTML);

    const activeArticles = document.querySelectorAll('.post.active');
    activeArticles.forEach(article => article.classList.remove('active'));

    const activeLinks = document.querySelectorAll('.titles a.active');
    activeLinks.forEach(link => link.classList.remove('active'));

    clickedElement.classList.add('active');

    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector);

    console.log('Target Article Selector:', articleSelector);
    console.log('Target Article:', targetArticle);

    if (targetArticle) {
        targetArticle.classList.add('active');
    } else {
        console.error('Article not found for selector:', articleSelector);
    }
}

// Uruchomienie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
    generateTitleLinks();
});

