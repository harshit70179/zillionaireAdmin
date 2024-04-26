import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import { useGetHomeTitleByIdMutation, useSetProductHomeTitleMutation } from '../../../redux/homeTitleApi'
import { toast } from 'react-toastify'
import { useGetProductQuery } from '../../../redux/productsApi';

function HomeProduct() {
    const { id } = useParams()
    const [setProductHomeTitle] = useSetProductHomeTitleMutation()
    const [getHomeTitleById,{ data }] = useGetHomeTitleByIdMutation()
    const { data: products } = useGetProductQuery()
    const [productsId, setProductsId] = useState([])

    useEffect(()=>{
     if(id){
        getHomeTitleById({id})
     }
    },[id])

    useEffect(() => {
        if (data) {
            setProductsId(data[0]?.product_ids ? JSON.parse(data[0]?.product_ids) : [])
        }
    }, [data])

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
                                background: productsId.includes(record.id) ? "green" : "#d10202",
                            }}
                            onClick={() => {
                                handlechange(record.id);
                            }}
                            title={productsId.includes(record.id) ? "Inactive" : "Active"}
                        >
                            <i className="fa fa-lock" style={{ color: "#fff" }}></i>
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

    const handlechange = (id) => {
        const index = productsId.indexOf(id);
        if (index !== -1) {
            // If exists, remove it
            const updatedIds = [...productsId];
            updatedIds.splice(index, 1);
            setProductsId(updatedIds);
            addProduct(updatedIds)
        } else {
            // If doesn't exist, add it
            setProductsId([...productsId, id]);
            addProduct([...productsId, id])
        }
    }

    const addProduct = (products) => {
        const sendData = {
            product_ids: JSON.stringify(products),
            total_products: products.length,
            id: id
        }
        setProductHomeTitle(sendData).then((result) => {
            if (result.data.status) {
            }
            else {
                toast.dismiss();
                toast.error(result.data.message);
            }
        })
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
                                <b>Product List</b>
                            </h2>
                        </div>
                        <div className="product-list-outer card p-3 fees_list_page mt-4">
                            <ReactDatatable
                                config={config}
                                records={products}
                                columns={columns}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeProduct
