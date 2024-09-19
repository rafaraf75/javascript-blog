'use strict';

//Opcje
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list-horizontal a',
  optTagsListSelector = '.tags',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = 5,  // liczba klas rozmiaru
  optCloudClassPrefix = 'tag-size-';

// Funkcja do generowania listy tytułów artykułów
function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  //Pobranie wszystkich artykułów
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  //Pętla po wszystkich artykułach
  for (const article of articles) {

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
  for (const link of links) {
    link.addEventListener('click', handleTitleClick);
  }
}

// Funkcja do obsługi kliknięcia na tytuł artykułu
function handleTitleClick(event) {
  event.preventDefault();

  // Usunięcie klasy active ze wszystkich artykułów
  const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
  activeArticles.forEach(article => article.classList.remove('active'));

  // Usunięcie klasy active ze wszystkich linków do artykułów
  const activeLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
  activeLinks.forEach(link => link.classList.remove('active'));

  // Usunięcie klasy active ze wszystkich tagów i autorów
  const activeTags = document.querySelectorAll('.tags a.active');
  activeTags.forEach(tag => tag.classList.remove('active'));

  const activeAuthors = document.querySelectorAll('.authors a.active');
  activeAuthors.forEach(author => author.classList.remove('active'));

  // Dodanie klasy active do klikniętego linku
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  // Wyświetlenie powiązanego artykułu
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
}

// Funkcja do generowania chmury tagów
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

// Funkcja do generowania listy tagów
function generateTags() {

  // Znalezienie wszystkich artykułów
  const articles = document.querySelectorAll(optArticleSelector);
  let allTags = {};

  // Dla każdego artykułu
  for (const article of articles) {
    const tagsWrapper = article.querySelector('.post-tags ul');
    const articleTags = article.querySelectorAll(optArticleTagsSelector);
    let html = '';

    for (const tag of articleTags) {
      const tagText = tag.innerHTML;
      const tagHTML = `<li><a href="#">${tagText}</a></li>`;
      html += tagHTML;

      if (!allTags[tagText]) {
        allTags[tagText] = 1;
      } else {
        allTags[tagText]++;
      }
    }
    tagsWrapper.innerHTML = html;
  }

  // Parametry do obliczenia wielkości tagów
  const tagsParams = {
    min: Math.min(...Object.values(allTags)),
    max: Math.max(...Object.values(allTags))
  };

  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = '';

  for (const tag in allTags) {
    const tagLinkHTML = `<li><a href="#" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}</a></li>`;
    tagList.innerHTML += tagLinkHTML;
  }

  addClickListenersToTags();
}

// Funkcja do obsługi kliknięcia na tag
function handleTagClick(event) {
  console.log('Kliknięto na tag');
  event.preventDefault();

  // Usunięcie klasy active ze wszystkich tagów
  const activeTags = document.querySelectorAll('.tags a.active');
  activeTags.forEach(tag => tag.classList.remove('active'));

  // Dodanie klasy active do klikniętego tagu
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');
  console.log(clickedElement);

  // Usunięcie klasy active ze wszystkich artykułów i autorów
  const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
  activeArticles.forEach(article => article.classList.remove('active'));

  const activeAuthors = document.querySelectorAll('.authors a.active');
  activeAuthors.forEach(author => author.classList.remove('active'));

  // Usunięcie klasy active ze wszystkich linków do artykułów
  const activeArticleLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
  activeArticleLinks.forEach(link => link.classList.remove('active'));

  // Przefiltrowanie artykułów po tagach
  const tag = clickedElement.innerHTML.trim();
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
  const tagLinks = document.querySelectorAll('.tags a');
  for (const tagLink of tagLinks) {
    tagLink.addEventListener('click', handleTagClick);
  }
}

// Funkcja do generowania listy autorów
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  const allAuthors = {};

  for (const article of articles) {
    const authorElement = article.querySelector(optArticleAuthorSelector);
    const authorText = authorElement.textContent.replace('by ', '').trim();

    if (!allAuthors[authorText]) {
      allAuthors[authorText] = 1;
    } else {
      allAuthors[authorText]++;
    }
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML = '';

  for (const author in allAuthors) {
    const authorHTML = `<li><a href="#" class="author-link">${author}</a></li>`;
    authorsList.innerHTML += authorHTML;
  }

  addClickListenersToAuthors();
}

// Funkcja do obsługi kliknięcia na autora
function handleAuthorClick(event) {
  event.preventDefault();

  // Usunięcie klasy active ze wszystkich autorów
  const activeAuthors = document.querySelectorAll('.authors a.active');
  activeAuthors.forEach(author => author.classList.remove('active'));

  // Dodanie klasy active do klikniętego autora
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  // Usunięcie klasy active ze wszystkich artykułów i tagów
  const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
  activeArticles.forEach(article => article.classList.remove('active'));

  const activeTags = document.querySelectorAll('.tags a.active');
  activeTags.forEach(tag => tag.classList.remove('active'));

  // Usunięcie klasy active ze wszystkich linków do artykułów
  const activeArticleLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
  activeArticleLinks.forEach(link => link.classList.remove('active'));

  // Przefiltrowanie artykułów po autorze
  const author = clickedElement.textContent.trim();
  const articles = document.querySelectorAll(optArticleSelector);

  articles.forEach(article => {
    const articleAuthor = article.querySelector(optArticleAuthorSelector).textContent.trim().replace('by ', '');

    if (articleAuthor === author) {
      article.classList.add('active');
    }
  });
}

// Funkcja do dodania nasłuchiwania na kliknięcia w autorów
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.author-link');

  for (const authorLink of authorLinks) {
    authorLink.addEventListener('click', handleAuthorClick);
  }
}

// Uruchomienie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
  generateTitleLinks();
  generateTags();
  generateAuthors();
});

