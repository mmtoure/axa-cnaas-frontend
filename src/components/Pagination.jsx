export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        ⬅
      </button>

      <span className="px-4 py-1">
        Page {currentPage + 1} / {totalPages}
      </span>

      <button
        disabled={currentPage + 1 === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        ➡
      </button>
    </div>
  );
};