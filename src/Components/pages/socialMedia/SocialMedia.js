import React, { useState, Fragment, useEffect } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import {socialMediaEnum } from "../../constant/enum";
import AddSocialModal from "../../partial/socialMedia/AddSocialModal";
import { useDeleteSocialMediaMutation, useGetSocialMediaQuery } from "../../../redux/socialmediaApi";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import UpdateSocialModal from "../../partial/socialMedia/UpdateSocialModal";

export const SocialMedia = () => {
  const { data: record } = useGetSocialMediaQuery();
  const [deleteSocialMedia] = useDeleteSocialMediaMutation();
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentRecord,setCurrentRecord]=useState({})

  const handleShow = (id) => {
    setAddModal(true);
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
    {
      key: "action",
      text: "Action",
      className: "Action",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <>
            <button
              onClick={() => deleteAlert(record.id)}
              title="Delete banner"
            >
              <span className="mdi mdi-trash-can-outline"></span>
            </button>
            <button
              onClick={() => edit(record)}
              title="Update Announcement"
            >
              <span className="mdi mdi-square-edit-outline"></span>
            </button>
          </>
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

  const edit=(record)=>{
    setCurrentRecord(record)
    setUpdateModal(true)
  }

  const deleteAlert = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => socialMediaDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const socialMediaDelete = async (id) => {
    let data = {
      id,
    };
    deleteSocialMedia(data).then((result) => {
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
            <AddSocialModal setAddModal={setAddModal} addModal={addModal}/>
            <UpdateSocialModal setUpdateModal={setUpdateModal} updateModal={updateModal} currentRecord={currentRecord}/>
          </div>
        </div>
      </div>
    </>
  );
};
