import React, { useState } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import { useGetCategoryQuery, useUpdateCategoryStatusMutation } from "../../../redux/categoryApi";
import AddCategoryModal from "../../partial/category/AddCategoryModal";
import UpdateCategoryModal from "../../partial/category/UpdateCategoryModal";
import { useGetMainCategoryQuery } from "../../../redux/mainCategoryApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

function Category() {
    const { data } = useGetCategoryQuery()
    const [updateCategoryStatus] = useUpdateCategoryStatusMutation();
    const { data: mainCategory } = useGetMainCategoryQuery()
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
            key: "main_category_name",
            text: "Main Category Name",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "name",
            text: "Name",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "total_sub_category",
            text: "Total Sub Category",
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
                        <button className="btn btn-primary" onClick={() => { editFee(record) }}>
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

    const handleShow = () => {
        setAddModal(true)
    }

    const editFee = (record) => {
        setUpdateModal(true)
        setCurrentRecord(record)
    }
    const updateAlert = (id, show_banner) => {
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => categoryUpdateStatus(id),
                },
                {
                    label: "No",
                },
            ],
        });
    };

    const categoryUpdateStatus = async (id) => {
        let data = {
            id,
        };
        updateCategoryStatus(data).then((result) => {
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
                                <b>Category List</b>
                            </h2>
                            <div className="add-product-btn ">
                                <button
                                    onClick={() => handleShow()}
                                    className="btn btn-primary fees_list_btn"
                                >
                                    Add Category
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
                    </div>
                </div>
            </div>
            <AddCategoryModal addModal={addModal} setAddModal={setAddModal} mainCategory={mainCategory} />
            <UpdateCategoryModal updateModal={updateModal} setUpdateModal={setUpdateModal} mainCategory={mainCategory} currentRecord={currentRecord} />
        </div>
    )
}

export default Category
