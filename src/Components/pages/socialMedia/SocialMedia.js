import React, { useState, Fragment, useEffect } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import {
  useGetBannerQuery,
} from "../../../redux/bannerApi";
import {socialMediaEnum } from "../../constant/enum";

export const Banner = () => {
  const { data: record } = useGetBannerQuery();
  const [show, setShow] = useState(false);

  const handleShow = (id) => {
    setShow(true);
  };
  
  useEffect(()=>{
  if(filterTab && record?.length>0){
     const filterData=record?.filter((list)=>list.show_banner===filterTab)
     setFilterRecord(filterData)
  }
  },[record,filterTab])

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
        key: "title",
        text: "Title",
        className: "title",
        align: "left",
        sortable: true,
        cell: (record) => {
          let filter = socialMediaEnum?.filter((list) => list.value === record.title)
          return (
            <Fragment>
              {filter[0]?.key}
            </Fragment>
          );
        },
      },
    {
      key: "url",
      text: "Url",
      className: "title",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <>
            <a href={record.url} target="_blank">{record.url}</a>
          </>
        );
      },
    },
    {
      key: "create_at",
      text: "Date",
      className: "date",
      align: "left",
      sortable: true,
      cell: (record) => {
        const date = record.create_at;
        return <>{moment(date).format("DD/MM/YYYY")}</>;
      },
    },
  ];
  const config = {
    page_size: 10,
    length_menu: [10, 20, 50],
    filename: "Fund Request List",
    no_data_text: "No record found!",
    button: {
      // print: true,
      // csv: true,
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
                  <b>Social Media List</b>
                </h2>
                <div className="add-product-btn ">
                  <button
                    onClick={() => handleShow()}
                    className="btn btn-primary fees_list_btn"
                  >
                    Add Social Media
                  </button>
                </div>
              </div>

              <div className="product-list-outer card p-3 fees_list_page">
                
                <ReactDatatable
                  config={config}
                  records={record}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
