import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Container, ListGroup } from "react-bootstrap";
const BasicPagination = (props) => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);

  const getData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    const data = res.data;
    const slice = data.slice(offset, offset + perPage);
    const postData = slice.map((post) => (
      <ListGroup.Item key={post.id}>
        <h5>{post.title}</h5>
        <p>{post.body}</p>
      </ListGroup.Item>
    ));
    setData(postData);
    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getData();
  }, [offset]);
  return (
    <Container className="pt-5">
      <ListGroup>{data}</ListGroup>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        breakClassName={"ml-1"}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination mt-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
    </Container>
  );
};
export default BasicPagination;
