import React from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import {
  useGetallUserQuery,
} from "../../../redux/UserApi";

export const UserData = () => {
  const { data: record } = useGetallUserQuery();

  const columns = [
    {
      key: "srno.",
      text: "Sr.No.",
      className: "sr_no.",
      align: "left",
      sortable: true,
      cell: (row, index) => index + 1,
    },
    {
      key: "id",
      text: "UID",
      className: "user_name",
      align: "left",
      sortable: true,
    },
    {
      key: "first_name",
      text: "First Name",
      className: "user_name",
      align: "left",
      sortable: true,
    },
    {
      key: "last_name",
      text: "Last Name",
      className: "user_name",
      align: "left",
      sortable: true,
    },
    {
      key: "email",
      text: "Email",
      className: "user_name",
      align: "left",
      sortable: true,
    },
    {
      key: "createdAt",
      text: "Date",
      className: "date",
      align: "left",
      sortable: true,
      cell: (record) => {
        const date = record.createdAt;
        return <>{moment(date).format("DD/MM/YYYY hh:mm:ss")}</>;
      },
    },
  ];

  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    filename: "Fund Request List",
    no_data_text: "No record found!",
    button: {
      print: true,
      csv: true,
    },
    language: {
      filter: "Search in records...",

      pagination: {
        first: "First",
        previous: "Previous",
        next: "Next",
        last: "Last",
      },
    },
    show_length_menu: true,
    show_filter: true,
    show_pagination: true,
    show_info: true,
  };

  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Navbar />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="section-heading">
                <h2>
                  <b>User List</b>
                </h2>
              </div>
              <div className="product-list-outer card p-3 fees_list_page">
                <ReactDatatable
                  config={config}
                  records={record}
                  columns={columns}
                  loading={record ? false : true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
