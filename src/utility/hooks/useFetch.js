import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useFetch = ({ search = "", action, currentPage, itemsPerPage }) => {
  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Methods

  useEffect(() => {
    if (search === "") {
      const data = {
        adminAuthtoken,
        values: {
          pageNo: currentPage,
          pageSize: itemsPerPage,
        },
      };
      dispatch(action(data));
    }
  }, [adminAuthtoken, currentPage, itemsPerPage, search, dispatch, action]);
  return;
};

export default useFetch;
