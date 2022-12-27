import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthCtx";
import useFetch from "./useFetch";

export const useLike = (post) => {
  const { profile } = useContext(AuthContext);
  const [likes, setLikes] = useState(post?.likes);
  const ROUT = `/posts/${post._id}/likes`;
  const usePostLike = useFetch(ROUT);
  const like = () => {
    const requestOpt = {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `bearer ${profile.token}`,
      },
    };
    usePostLike.performFetch(requestOpt);
  };
  return {
    like: {
      isLoading: usePostLike.isLoading,
      isSuccess: usePostLike.isSuccess,
      perform: like,
      isError: usePostLike.error,
      cancel: usePostLike.cancelFetch,
    },
    likes,
    setLikes,
  };
};
