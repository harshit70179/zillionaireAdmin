import React from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import { useGetProductQuery } from "../../../redux/productsApi";
import { Link } from "react-router-dom";

function Product() {
    const { data } = useGetProductQuery()

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
            key: "category_name",
            text: "Category Name",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "title",
            text: "Title",
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
            key: "action",
            text: "Action",
            className: "Action",
            align: "left",
            sortable: true,
            cell: (record) => {
                return (
                    <>
                        <Link to={`/update-product/${record.id}`}>
                            <span className="mdi mdi-square-edit-outline"></span>
                        </Link>
                      
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

    return (
        <div id="layout-wrapper">
            <Header />
            <Navbar />
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="section-heading">
                            <h2>
                                <b>Product List</b>
                            </h2>
                            <div className="add-product-btn ">
                                <Link
                                    to="/add-product"
                                    className="btn btn-primary fees_list_btn"
                                >
                                    Add Product
                                </Link>
                            </div>
                        </div>
                        <div className="product-list-outer card p-3 fees_list_page mt-4">
                            <ReactDatatable
                                config={config}
                                records={data}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
