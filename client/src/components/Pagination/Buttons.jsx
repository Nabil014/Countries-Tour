export default function Buttons ({ currentPage, totalItems, itemPerPage, onPageChange }) {
  const totalPages = Math.ceil(totalItems / itemPerPage)

  const rangeStart = Math.max(1, currentPage - 1)
  const rangeEnd = Math.min(totalPages, rangeStart + 3)

  const pageNumbers = []
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pageNumbers.push(i)
  }

  const handleNextPage = (pageNumber) => {
    onPageChange(pageNumber)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 50)
  }

  return (
    <div className="relative flex w-80 justify-center gap-3 text-sm mx-auto bg-[#237096] rounded-full py-3 text-white">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => handleNextPage(number)}
          disabled={currentPage === number}
          className={`rounded-full px-3 transition-all ${currentPage === number ? "items-center text-lg scale-125 bg-[#000933a6] text-slate-100 hover:scale-125" : "bg-slate-100 text-[#1D5B79] hover:bg-slate-200 hover:scale-125"}`}
        >
          {number}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => handleNextPage(currentPage + 1)}
          className="rounded-full px-3 bg-slate-100 hover:scale-105 text-[#1c4c64] font-medium ml-3 hover:bg-slate-200"
        >
          ... Next
        </button>
      )}
    </div>
  )
}