export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less we will show all the numbers
  // [1,2,3,4,5,6,7]
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  // if the current page is among the first 3 pages.
  // [1,2,3,'...', 9,10]
  if (currentPage <= 3) return [1, 2, 3, "...", totalPages - 1, totalPages];

  // if the current page is among the last 3 pages.
  // [1, 2, '...', 9, 10]
  if (currentPage >= totalPages - 2)
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];

  //if the current page is somewhere in between
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};
