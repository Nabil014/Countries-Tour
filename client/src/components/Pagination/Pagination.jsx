import Buttons from './Buttons'
import countriesStore from '../../store/countriesStore'
import { useContext, useEffect, useState } from 'react'
import { PaginationContext } from '../../context/paginationContext'

export default function Pagination ({ sendItems }) {
  const { data } = countriesStore()

  const { currentPage, setCurrentPage } = useContext(PaginationContext)
  const [itemPerPage, setItemPerPage] = useState(8)

  useEffect(() => {
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

    if (currentItems) {
      sendItems(currentItems);
    }
  }, [data, currentPage, itemPerPage]);

  return (
    <footer>
      <Buttons currentPage={currentPage} totalItems={data?.length} itemPerPage={itemPerPage} onPageChange={setCurrentPage} />
    </footer>
  )
}
