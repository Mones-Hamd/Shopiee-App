import React, { useContext, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { PaginationItem } from '@mui/material';
import { Link } from 'react-router-dom';
import { PostsContext } from '../context/PostsCtx';

const Paginate = ({ page,render}) => {
  const {numberOfPages ,getPosts }=useContext(PostsContext)
  console.log(render)
  useEffect(()=>{
   getPosts(`http://localhost:5000/api/posts?page=${page}`)
  },[page,render])
  return (
    <Stack spacing={2}>
      <Pagination count={numberOfPages||1} variant="outlined" shape="rounded" 
        renderItem={item=>(
          <PaginationItem {...item} component={Link} to={`?page=${item.page}`} />
        )} 
      />
    </Stack>
  )
}

export default Paginate
