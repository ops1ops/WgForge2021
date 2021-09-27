const SEPARATOR = '-';

const splitPagesBySubsets = (pages) => pages.reduce((accumulator, currentPage, index) => {
  const isPageInSubset = currentPage === pages[index - 1] + 1;
  const isPageLastInSubset = isPageInSubset && currentPage !== pages[index + 1] - 1;

  if (isPageLastInSubset) {
    return [...accumulator, SEPARATOR, currentPage];
  }

  if (!isPageInSubset) {
    return [...accumulator, currentPage];
  }

  return accumulator;
}, []);

const separatorWithComasRegExp = new RegExp(`,${SEPARATOR},`, 'g');

const formatPagesToString = (pages) => pages.join(',').replace(separatorWithComasRegExp, SEPARATOR);

const solve = (fileData) => {
  const pages = fileData.split(',').map(Number);
  const uniquePages = [...new Set(pages)].sort((a, b) => a - b);

  const pagesWithSubsets = splitPagesBySubsets(uniquePages);

  return formatPagesToString(pagesWithSubsets);
};
