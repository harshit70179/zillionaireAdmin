import React, { useState, Fragment } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import { toast } from "react-toastify";
import ReactDatatable from "@mkikets/react-datatable";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDeleteExploreMutation, useGetExploreQuery, useUpdateExploreMutation } from "../../../redux/exploreApi";
import AddExploreModal from "../../partial/explore/AddExploreModal";
import { useGetMainCategoryQuery } from "../../../redux/mainCategoryApi";

export const Explore = () => {
  const { data: record } = useGetExploreQuery();
  const { data: mainCategory } = useGetMainCategoryQuery()
  const [updateExplore] = useUpdateExploreMutation();
  const [deleteExplore] = useDeleteExploreMutation();
  const [show, setShow] = useState(false);

  const handleShow = (id) => {
    setShow(true);
  };

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
      key: "image",
      text: "Image",
      className: "image",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <Fragment>
            <img style={{ height: "50px" }} src={record.image} alt="" />
          </Fragment>
        );
      },
    },

    {
      key: "name",
      text: "Category",
      className: "title",
      align: "left",
      sortable: true,
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
    {
      key: "status",
      text: "Status",
      className: "Action ",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <>
            <button className="btn"
              style={{
                
                background: record.status === "1" ? "green" : "#d10202",
              }}
              onClick={() => {
                updateAlert(record.id,record.show_banner);
              }}
              title={record.status === "1" ? "Inactive" : "Active"}
            >
              <i className="fa fa-lock" style={{ color: "#fff" }}></i>
            </button>
          </>
        );
      },
    },
    {
      key: "action",
      text: "Action",
      className: "Action",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <Fragment>
            <button className="btn btn-primary" onClick={() => deleteAlert(record.id)} title="Delete banner">
              <span className="mdi mdi-trash-can-outline"></span>
            </button>
          </Fragment>
        );
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

  const exploreDeleteApi = async (id) => {
    let data = {
      id,
    };
    deleteExplore(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
      }
    });
  };

  const deleteAlert = (Deleteid) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => exploreDeleteApi(Deleteid),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const updateAlert = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => exploreUpdateStatus(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const exploreUpdateStatus = async (id) => {
    let data = {
      id
    };
    updateExplore(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
      }
    });
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
                  <b>Explore List</b>
                </h2>
                <div className="d-flex">
            
                <div className="add-product-btn ">
                  <button 
                    onClick={() => handleShow()}
                    className="btn btn-primary fees_list_btn"
                  >
                    Add Explore
                  </button>
                </div>
                </div>
              </div>
              <div className="product-list-outer card p-3 fees_list_page">
               
                <ReactDatatable
                  config={config}
                  records={record}
                  columns={columns}
                />

                <AddExploreModal show={show} setShow={setShow} mainCategory={mainCategory}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
