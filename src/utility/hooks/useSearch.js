import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSearch = ({ action }) => {
  const [search, setSearch] = useState("");

  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  const onSearchHandler = () => {
    const data = {
      adminAuthtoken,
      query: {
        search,
      },
    };
    dispatch(action(data));
  };

  return {
    search,
    onSearchChange,
    onSearchHandler,
  };
};

export default useSearch;
