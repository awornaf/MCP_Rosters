import Pagination from 'react-bootstrap/Pagination'
import React, {useState, useEffect} from "react";


const PaginationBasic = (props) =>{
  let active = 1;
  let items = [];
  for (let number = 1; number <= props.page_max; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
     </Pagination.Item>,
   );
  }
  
  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <br />
      <Pagination class="text-center">{items}</Pagination>
      <br />
    </div>
  )
};

export default PaginationBasic;