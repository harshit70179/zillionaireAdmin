import React,{useState} from "react";
import ReactDatatable from "@mkikets/react-datatable";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import {
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateStatusFaqMutation,
} from "../../../redux/faqApi";
import AddFaqModal from "../../partial/faq/AddFaqModal";
import UpdateFaqModal from "../../partial/faq/UpdateFaqModal";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";

function Faq() {
  const { data: record } = useGetFaqQuery();
  const [updateStatusFaq] = useUpdateStatusFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [show, setShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({})

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
      key: "question",
      text: "Question",
      className: "question",
      align: "left",
      sortable: true,
    },
    {
      key: "answer",
      text: "Answer",
      className: "answer",
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
                updateAlert(record.id);
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
          <>
            <button className="btn btn-primary me-2"
              onClick={() => deleteAlert(record.id)}
              title="Delete banner"
            >
              <span className="mdi mdi-trash-can-outline"></span>
            </button>
            <button className="btn btn-primary"
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

  const updateAlert = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => UpdateStatus(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const UpdateStatus = async (id) => {
    let data = {
      id,
    };
    updateStatusFaq(data).then((result) => {
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
          onClick: () => faqDelete(Deleteid),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const faqDelete = async (id) => {
    let data = {
      id,
    };
    deleteFaq(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
      }
    });
  };

  const handleShow = (id) => {
    setShow(true);
  };

  const edit=(record)=>{
    setUpdateShow(true)
    setCurrentRecord(record)
  }

  return (
    <div id="layout-wrapper">
      <Header />
      <Navbar />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="section-heading">
              <h2>
                <b>Faq List</b>
              </h2>
              <div className="add-product-btn ">
                <button className="btn btn-primary" onClick={() => handleShow()}>Add Faq</button>
              </div>
            </div>

            <div className="product-list-outer card p-3 lastchil_w">
              
              <ReactDatatable
                config={config}
                records={record}
                columns={columns}
              />
            </div>
            <AddFaqModal show={show} setShow={setShow} />
            <UpdateFaqModal updateShow={updateShow} setUpdateShow={setUpdateShow} currentRecord={currentRecord}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
