import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const CustomPagination = ({totalPosts, postsPerPage, setCurrentPage, currentPage}) => {

    let pages=[];

    for(let i =1; i<=Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>

               <Pagination
               className="pagination justify-content-center mb-0"
               listClassName="justify-content-end mb-0"
             >
                {pages.map((page, index) => {
                    return <PaginationItem key={index}  className={currentPage===page?"active":""}  >
                    <PaginationLink
                    onClick={(e)=>{
                        e.preventDefault();
                        setCurrentPage(page)}}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                })} </Pagination>

        </div>
    )
}

export default CustomPagination