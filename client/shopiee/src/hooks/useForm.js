import { useState } from 'react';
const useFrom = (submitCb, defaultValue) => {
  const [state, setState] = useState(defaultValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitCb();
  };
  const handleChange = (e) => {
    if (e) {
      e.persist();

      setState((state) => ({ ...state, [e.target.name]: e.target.value }));
    } else {
      setState({});
    }
  };
  return [state, handleChange, handleSubmit, setState];
};
export default useFrom;
