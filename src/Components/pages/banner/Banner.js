import React, { useState, Fragment, useEffect } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import { toast } from "react-toastify";
import ReactDatatable from "@mkikets/react-datatable";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  useDeleteBannerMutation,
  useGetBannerQuery,
  useUpdateBannerMutation,
} from "../../../redux/bannerApi";
import BannerAddModal from "../../partial/banner/BannerAddModal";
import { bannerType, showBannerEnum, topEnum } from "../../constant/enum";

export const Banner = () => {
  const { data: record } = useGetBannerQuery();
  const [updateProBanner] = useUpdateBannerMutation();
  const [deleteProBanner] = useDeleteBannerMutation();
  const [filterTab,setFilterTab]=useState(topEnum)
  const [filterRecord,setFilterRecord]=useState([])
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
      key: "banner",
      text: "Banner",
      className: "Banner",
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
      key: "title",
      text: "Title",
      className: "title",
      align: "left",
      sortable: true,
    },
    {
      key: "type",
      text: "Type",
      className: "title",
      align: "left",
      sortable: true,
      cell: (record) => {
        let filter = bannerType.filter((list) => list.value === record.type)
        return (
          <Fragment>
            {filter[0]?.key}
          </Fragment>
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
      key: "status",
      text: "Status",
      className: "Action ",
      align: "left",
      sortable: true,
      cell: (record) => {
        return (
          <>
            <button
              style={{
                border: "1px solid #fff",
                borderRadius: "3px",
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
            <Link to="" onClick={() => deleteBanner(record.id)} title="Delete banner">
              <span className="mdi mdi-trash-can-outline"></span>
            </Link>
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

  const bannerDeleteApi = async (id) => {
    let data = {
      id,
    };
    deleteProBanner(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
      }
    });
  };
  const bannerUpdateStatus = async (id,show_banner) => {
    let data = {
      id,
      show_banner
    };
    updateProBanner(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
      }
    });
  };
  const deleteBanner = (Deleteid) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => bannerDeleteApi(Deleteid),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const updateAlert = (id,show_banner) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => bannerUpdateStatus(id,show_banner),
        },
        {
          label: "No",
        },
      ],
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
                  <b>Banner List</b>
                </h2>
                <div className="d-flex">
                <div className="filter-option">
                   {showBannerEnum.map((list)=>{
                    return (<button className={`btn ${list.value===filterTab?"active-btn":""}`} onClick={()=>{setFilterTab(list.value)}} key={list.value}>{list.key}</button>)
                   })}
                </div>
                <div className="add-product-btn ">
                  <button
                    onClick={() => handleShow()}
                    className="btn btn-primary fees_list_btn"
                  >
                    Add Banner
                  </button>
                </div>
                </div>
              </div>

              <div className="product-list-outer card p-3 fees_list_page">
               
                <ReactDatatable
                  config={config}
                  records={filterRecord}
                  columns={columns}
                />

                <BannerAddModal show={show} setShow={setShow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
