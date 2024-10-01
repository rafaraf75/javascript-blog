'use strict';

// Options
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list-horizontal a',
  optTagsListSelector = '.tags',
  optArticleAuthorSelector = '.post-author',
  optAuthorsListSelector = '.authors',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

// Function to generate a list of article titles
function generateTitleLinks(articles = document.querySelectorAll(optArticleSelector)) {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';

  articles.forEach (article => {

    // Get the article ID
    const articleId = article.getAttribute('id');

    // Get the article title
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // Create HTML code for the link
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  });

  // Add all links to the list in the left column
  titleList.innerHTML = html;

  // Add event listeners for clicking on titles
  const links = document.querySelectorAll(`${optTitleListSelector} a`);
  links.forEach(link => link.addEventListener('click', handleTitleClick));
}

// Function to handle clicking on an article title
function handleTitleClick(event) {
  event.preventDefault();

  document.querySelectorAll(`${optArticleSelector}.active`).forEach(article => article.classList.remove('active'));
  document.querySelectorAll(`${optTitleListSelector} a.active`).forEach(link => link.classList.remove('active'));

  // Add the active class to the clicked link
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  // Display the associated article
  const articleSelector = clickedElement.getAttribute('href');
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.add('active');
}

// Function to generate the tag cloud
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

// Function to generate a list of tags
function generateTags() {

  // Find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  let allTags = {};

  articles.forEach(article => {
    const tagsWrapper = article.querySelector('.post-tags ul');
    const articleTags = article.querySelectorAll(optArticleTagsSelector);
    let html = '';

    articleTags.forEach(tag => {
      const tagText = tag.innerHTML;
      const tagHTML = `<li><a href="#">${tagText}</a></li>`;
      html += tagHTML;

      allTags[tagText] = allTags[tagText] ? allTags[tagText] + 1 : 1;
    });
    tagsWrapper.innerHTML = html;
  });

  // Parameters for calculating tag size
  const tagsParams = { min: Math.min(...Object.values(allTags)), max: Math.max(...Object.values(allTags)) };
  const tagList = document.querySelector(optTagsListSelector);
  tagList.innerHTML = '';

  for (const tag in allTags) {
    const tagLinkHTML = `<li><a href="#" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}</a></li>`;
    tagList.innerHTML += tagLinkHTML;
  }

  addClickListenersToTags();
}

// Unified function to handle filtering
function handleFilterClick(event, criteria) {
  event.preventDefault();

  // Remove the active class from all tags and authors
  document.querySelectorAll('.tags a.active').forEach(tag => tag.classList.remove('active'));
  document.querySelectorAll('.authors a.active').forEach(author => author.classList.remove('active'));

  // Add the active class to the clicked element
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  // Remove active class from all articles
  document.querySelectorAll(`${optArticleSelector}.active`).forEach(article => article.classList.remove('active'));

  // Filter articles by criteria
  const filterValue = clickedElement.innerHTML.trim().replace('by ','');
  const filteredArticles = filterArticlesBy(criteria, filterValue);

  generateTitleLinks(filteredArticles);

  if (filteredArticles.length > 0) {
    filteredArticles[0].classList.add('active');
  }
}

// Function to filter articles by tag or author
function filterArticlesBy(criteria, value) {
  const articles = document.querySelectorAll(optArticleSelector);
  return Array.from(articles).filter(article => {
    if (criteria === 'tag') {
      return Array.from(article.querySelectorAll(optArticleTagsSelector)).some(articleTag => articleTag.textContent.trim() === value);
    } else if (criteria === 'author') {
      return article.querySelector(optArticleAuthorSelector).textContent.trim().replace('by ', '') === value;
    }
  });
}

// Function to add click event listeners to tags
function addClickListenersToTags() {
  document.querySelectorAll('.tags a').forEach(tagLink => {
    tagLink.addEventListener('click', event => handleFilterClick(event, 'tag'));
  });
}

// Function to add click event listeners to authors
function addClickListenersToAuthors() {
  document.querySelectorAll('.author-link').forEach(authorLink => {
    authorLink.addEventListener('click', event => handleFilterClick(event, 'author'));
  });
}

// Function to generate a list of authors
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  let allAuthors = {};

  // Collect all authors
  articles.forEach(article => {
    const author = article.querySelector(optArticleAuthorSelector).textContent.trim();
    allAuthors[author] = allAuthors[author] ? allAuthors[author] + 1 : 1;
  });

  // Generate the list of authors
  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML = '';
  for (const author in allAuthors) {
    const authorHTML = `<li><a href="#" class="author-link">${author}</a></li>`;
    authorsList.innerHTML += authorHTML;
  }

  // Add click event listeners to authors
  addClickListenersToAuthors();
}

// Initialize functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  generateTitleLinks();
  generateTags();
  generateAuthors();
});

