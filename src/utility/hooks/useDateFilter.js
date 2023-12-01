import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useDateFilter = ({ action }) => {
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const { startDate, endDate } = dateFilter;

  //Redux state
  const { adminAuthtoken } = useSelector((state) => state.adAuth);

  //Redux action dispatcher
  const dispatch = useDispatch();

  //Methods
  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      onDateFilterHandler();
    }
  }, [startDate, endDate]);

  const onDateChange = (e) => {
    const { value, name } = e.target;
    setDateFilter((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onDateFilterHandler = () => {
    const data = {
      adminAuthtoken,
      query: {
        ...dateFilter,
      },
    };
    dispatch(action(data));
  };

  const clearFilter = () => {
    setDateFilter({
      startDate: "",
      endDate: "",
    });
  };

  return {
    dateFilter,
    onDateChange,
    onDateFilterHandler,
    clearFilter,
  };
};

export default useDateFilter;
