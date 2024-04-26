import React, { useState } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import { useDeleteHomeTitleMutation, useGetHomeTitleQuery, useUpdateHomeTitleStatusMutation } from "../../../redux/homeTitleApi";
import AddHomeTitleModal from "../../partial/hometitle/AddHomeTitleModal";
import UpdateHomeTitleModal from "../../partial/hometitle/UpdateHomeTitle";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function HomeTitle() {
    const { data } = useGetHomeTitleQuery()
    const [updateHomeTitleStatus] = useUpdateHomeTitleStatusMutation();
    const [deleteHomeTitle] = useDeleteHomeTitleMutation();
    const [addModal, setAddModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
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
            key: "title",
            text: "Title",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "total_products",
            text: "Total Products",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "createAt",
            text: "Date",
            className: "date",
            align: "left",
            sortable: true,
            cell: (record) => {
                const date = record.createAt;
                return <>{moment(date).format("DD/MM/YYYY")}</>;
            },
        },
        {
            key: "products",
            text: "Add products",
            className: "Action",
            align: "left",
            sortable: true,
            cell: (record) => {
                return (
                    <>
                        <Link to={`/home-product/${record.id}`} className="btn btn-primary">
                          Add
                        </Link>
                    </>
                );
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
                                updateAlert(record.id, record.show_banner);
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
                        <button onClick={() => { editFee(record) }}>
                            <span className="mdi mdi-square-edit-outline"></span>
                        </button>
                        <button onClick={() => deleteAlert(record.id)} title="Delete Title">
                            <span className="mdi mdi-trash-can-outline"></span>
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

    const handleShow = () => {
        setAddModal(true)
    }

    const editFee = (record) => {
        setUpdateModal(true)
        setCurrentRecord(record)
    }

    const deleteAlert = (id) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteTitle(id),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const deleteTitle = async (id) => {
        let data = {
            id,
        };
        deleteHomeTitle(data).then((result) => {
            if (result.data.status) {
                toast.dismiss();
                toast.success(result.data.message);
            }
        });
    };

    const updateAlert = (id) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => titleUpdateStatus(id),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const titleUpdateStatus = async (id) => {
        let data = {
            id,
        };
        updateHomeTitleStatus(data).then((result) => {
            if (result.data.status) {
                toast.dismiss();
                toast.success(result.data.message);
            }
        });
    };

    return (
        <div id="layout-wrapper">
            <Header />
            <Navbar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="section-heading">
                            <h2>
                                <b>Home Title List</b>
                            </h2>
                            <div className="add-product-btn ">
                                <button
                                    onClick={() => handleShow()}
                                    className="btn btn-primary fees_list_btn"
                                >
                                    Add Home Title
                                </button>
                            </div>
                        </div>
                        <div className="product-list-outer card p-3 fees_list_page">
                            <ReactDatatable
                                config={config}
                                records={data}
                                columns={columns}
                            />
                        </div>
                        <AddHomeTitleModal addModal={addModal} setAddModal={setAddModal} />
                        <UpdateHomeTitleModal updateModal={updateModal} setUpdateModal={setUpdateModal} currentRecord={currentRecord} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTitle
