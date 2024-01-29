import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const CustomPagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      <Pagination
        className="pagination justify-content-center mb-0"
        listClassName="justify-content-end mb-0"
      >
        <PaginationItem className="">
          <PaginationLink
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage==1? currentPage: currentPage-1);
            }}
            tabIndex="-1"
          >
            <i className="fas fa-angle-left" />
            <span className="sr-only">Previous</span>
          </PaginationLink>
        </PaginationItem>
        {pages.map((page, index) => {
          if (page<=currentPage+3 && page>=currentPage-3){
          return (
            <PaginationItem
              key={index}
              className={currentPage === page ? "active" : ""}
            >
              <PaginationLink
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );}
        })}{" "}
        <PaginationItem>
          <PaginationLink
            onClick={(e) => {
              e.preventDefault();
                setCurrentPage(currentPage=== pages.length?currentPage:currentPage+1);
            }}
          >
            <i className="fas fa-angle-right" />
            <span className="sr-only">Next</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
