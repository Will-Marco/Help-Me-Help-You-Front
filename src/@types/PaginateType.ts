export interface PaginateType {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>, 
    currentPage: number, 
    totalPages: number
}
  