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

  // Loop through all articles
  for (const article of articles) {

    // Get the article ID
    const articleId = article.getAttribute('id');

    // Get the article title
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    // Create HTML code for the link
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    html += linkHTML;
  }

  // Add all links to the list in the left column
  titleList.innerHTML = html;

  // Add event listeners for clicking on titles
  const links = document.querySelectorAll(`${optTitleListSelector} a`);
  for (const link of links) {
    link.addEventListener('click', handleTitleClick);
  }
}

// Function to handle clicking on an article title
function handleTitleClick(event) {
  event.preventDefault();

  // Remove the active class from all articles
  const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
  activeArticles.forEach(article => article.classList.remove('active'));

  // Remove the active class from all article links
  const activeLinks = document.querySelectorAll(`${optTitleListSelector} a.active`);
  activeLinks.forEach(link => link.classList.remove('active'));

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

  // For each article
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

  // Parameters for calculating tag size
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

// Function to filter articles by tag or author
function filterArticlesBy(criteria, value) {
  const articles = document.querySelectorAll(optArticleSelector);
  const filteredArticles = [];

  articles.forEach(article => {
    if (criteria === 'tag') {
      const articleTags = article.querySelectorAll(optArticleTagsSelector);
      articleTags.forEach(articleTag => {
        if (articleTag.textContent.trim() === value) {
          filteredArticles.push(article);
        }
      });
    } else if (criteria === 'author') {
      const articleAuthor = article.querySelector(optArticleAuthorSelector).textContent.trim().replace('by ', '');
      if (articleAuthor === value) {
        filteredArticles.push(article);
      }
    }
  });

  return filteredArticles;
}

// Function to handle clicking on a tag
function handleTagClick(event) {
  event.preventDefault();

  // Remove the active class from all tags and authors
  const activeTags = document.querySelectorAll('.tags a.active');
  const activeAuthors = document.querySelectorAll('.authors a.active');
  activeTags.forEach(tag => tag.classList.remove('active'));
  activeAuthors.forEach(author => author.classList.remove('active'));

  // Add the active class to the clicked tag
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');
  console.log(clickedElement);

  // Remove active articles before filtering
  const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
  activeArticles.forEach(article => article.classList.remove('active'));

  // Filter articles by tag
  const tag = clickedElement.innerHTML.trim();
  const filteredArticles = filterArticlesBy('tag', tag);

  generateTitleLinks(filteredArticles);

  if (filteredArticles.length > 0) {
    filteredArticles[0].classList.add('active');
  }
}

// Function to handle clicking on an author
function handleAuthorClick(event) {
  event.preventDefault();

  // Remove the active class from all authors and tags
  const activeAuthors = document.querySelectorAll('.authors a.active');
  const activeTags = document.querySelectorAll('.tags a.active');
  activeAuthors.forEach(author => author.classList.remove('active'));
  activeTags.forEach(tag => tag.classList.remove('active'));

  // Add the active class to the clicked author
  const clickedElement = event.currentTarget;
  clickedElement.classList.add('active');

  // Remove active articles before filtering
  const activeArticles = document.querySelectorAll(`${optArticleSelector}.active`);
  activeArticles.forEach(article => article.classList.remove('active'));

  // Filter articles by author
  const author = clickedElement.innerHTML.trim().replace('by ','');
  const filteredArticles = filterArticlesBy('author', author);
  console.log(`Articles filtered by author (${author}): ${filteredArticles.length}`);
  generateTitleLinks(filteredArticles);

  if (filteredArticles.length > 0) {
    filteredArticles[0].classList.add('active');
  }
}

// Function to add click event listeners to tags
function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll('.tags a');
  for (const tagLink of tagLinks) {
    tagLink.addEventListener('click', handleTagClick);
  }
}

// Function to add click event listeners to authors
function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.author-link');

  for (const authorLink of authorLinks) {
    authorLink.addEventListener('click', handleAuthorClick);
  }
}

// Function to generate a list of authors
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  let allAuthors = {};

  // Collect all authors
  articles.forEach(article => {
    const author = article.querySelector(optArticleAuthorSelector).textContent.trim();
    if (!allAuthors[author]) {
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  });

  // Generate the list of authors
  const authorsList = document.querySelector(optAuthorsListSelector);
  let html = '';
  for (const author in allAuthors) {
    const authorHTML = `<li><a href="#" class="author-link">${author}</a></li>`;
    html += authorHTML;
  }
  authorsList.innerHTML = html;

  // Add click event listeners to authors
  addClickListenersToAuthors();
}

// Initialize functions after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  generateTitleLinks();
  generateTags();
  generateAuthors();
  addClickListenersToAuthors();
});

