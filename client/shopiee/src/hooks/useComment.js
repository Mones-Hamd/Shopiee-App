import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthCtx';
import useFetch from './useFetch';

export const useComment = (post) => {
  const { profile } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(post.comments);
  const commentsRef = useRef();
  const ROUTE = `/comments/${post._id}`;
  const onReceived = (data) => {
    setComments(data.data.comments);
  };
  const useSetComment = useFetch(ROUTE, onReceived);
  const setUserComment = (userComment) => {
    const requestOpt = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${profile.token}`,
      },
      body: JSON.stringify({ userComment }),
    };
    useSetComment.performFetch(requestOpt);
  };

  return {
    setUserComment: {
      isLoading: useSetComment.isLoading,
      isSuccess: useSetComment.isSuccess,
      perform: setUserComment,
      isError: useSetComment.error,
      cancel: useSetComment.cancelFetch,
    },
    getComment: {
      comment,
      setComment,
    },
    getComments: {
      comments,
      setComments,
    },
    commentsRef,
  };
};
