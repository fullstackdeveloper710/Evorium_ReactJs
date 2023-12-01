import React from "react";
import { Image } from "react-bootstrap";
import { view } from "../../assets/icons/admin";
import { ReactDataTable } from "../../components/common";
import { dateFormater } from "../../utility/methods";
import { useSelector } from "react-redux";
import {
  useDateFilter,
  useFetch,
  usePagination,
  useSearch,
} from "../../utility/hooks";
import { totalItems, itemsPerPage } from "../../utility/methods";
import {
  filterAdminPaymentbyDate,
  getAdminPaymentList,
  searchAdminPaymentList,
} from "../../redux/thunk/admin/adPayment";
import "../../styles/admin/categories.scss";
function Payment() {
  //Redux state
  const { adminPayments } = useSelector((state) => state.adPayment);
  const { data, count } = adminPayments;

  //Custom hooks
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setItemsPerPage,
    onSelectPage,
  } = usePagination({ totalItems: count, itemsPerPage });

  const { search, onSearchChange, onSearchHandler } = useSearch({
    action: searchAdminPaymentList,
  });

  const { dateFilter, onDateChange, clearFilter } = useDateFilter({
    action: filterAdminPaymentbyDate,
  });

  useFetch({ search, action: getAdminPaymentList, currentPage, itemsPerPage });

  //Datatable columns
  const columns = [
    {
      name: "Payment Id",
      selector: (row, index) => <div>{row.payment_id}</div>,
    },
    {
      name: "Payment Mode",
      selector: (row) => <div>Payment Mode</div>,
    },
    {
      name: "Date",
      selector: (row) => <div>{dateFormater(row.createdAt)}</div>,
    },
    {
      name: "Price",
      selector: (row) => <div>{row.amount}</div>,
    },
    {
      name: "Status",
      selector: (row) => <div>{row.status}</div>,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="actions_btns">
          <button className="action_btn">
            <Image src={view} />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="categories_section payment_section">
      <ReactDataTable
        data={data}
        columns={columns}
        pagination={true}
        searchBar={true}
        showDateFilter={true}
        header="Payments"
        subHeader={true}
        onSearch={onSearchHandler}
        onSearchChange={onSearchChange}
        onDateChange={onDateChange}
        dateFilter={dateFilter}
        // onDateFilter={onDateFilterHandler}
        clearFilter={clearFilter}
        search={search}
        paginationFields={{
          currentPage,
          totalPages,
          nextPage,
          prevPage,
          goToPage,
          setItemsPerPage,
          onSelectPage,
        }}
      />
    </div>
  );
}

export default Payment;

// <div className="top_bar">
// <h3 className="title pt-2 mb-0 pb-0">Payments</h3>
// <div className="right_search_bar">
//   <div className="search_block">
//     <input type="text" placeholder="Search" />
//     <button type="" className="search_btn">
//       Search
//     </button>
//   </div>
//   <div className="date_block">
//     <div className="input_wraper">
//       <label>From Date</label>
//       <input type="date" />
//     </div>
//     <div className="input_wraper">
//       <label>To date</label>
//       <input type="date" />
//     </div>
//   </div>
// </div>
// </div>
// <div className="categories_logs_section">
// <div className="categories_logs_table comn_table">
//   <Table striped>
//     <thead>
//       <tr>
//         <th>Payment Id</th>
//         <th>Payment Mode</th>
//         <th>Date</th>
//         <th className="text-center">Price</th>
//         <th>Status</th>
//         <th className="text-center">Action</th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//       <tr>
//         <td>Id:123456</td>
//         <td>Credit Crad</td>
//         <td>14 Nov,22</td>
//         <td>$1</td>
//         <td>Completed</td>
//         <td>
//           <div className="delete_action">
//             <Link to="#" className="delete_btn">
//               <Image src={trash} className="" />
//             </Link>
//           </div>
//         </td>
//       </tr>
//     </tbody>
//   </Table>
// </div>
// </div>
