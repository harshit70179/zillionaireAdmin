import React, { useState,useEffect } from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import { useGetOrderMutation, useUpdateOrderStatusMutation } from "../../../redux/orderApi";
import { DeliveredEnum, PendingEnum, ProcessingEnum, ShippingEnum, statusEnum } from "../../constant/enum";
import OrderViewModal from "./OrderViewModal";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

export const OrderHistory = () => {
    const [getOrder, { data: record }] = useGetOrderMutation();
    const [updateOrderStatus]=useUpdateOrderStatusMutation()
    const [status, setStatus] = useState("Pending")
    const [currectRecord,setCurrectRecord]=useState({})
    const [show,setShow]=useState(false)

    useEffect(() => {
        if (status) {
            getOrder({ status })
        }
    }, [status])

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
            key: "order_id",
            text: "Order ID",
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
            key: "total",
            text: "Total ($)",
            className: "user_name",
            align: "left",
            sortable: true,
        },
        {
            key: "grand_total",
            text: "Grand Total ($)",
            className: "user_name",
            align: "left",
            sortable: true,
        },
        {
            key: "status",
            text: "Status",
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
        {
            key: "view",
            text: "View",
            className: "view",
            align: "left",
            sortable: true,
            cell: (record) => {
                return <button className="btn btn-primary" onClick={()=>{
                    showOrder(record)
                }}>View</button>;
            },
        },
        {
            key: "action",
            text: "Action",
            className: "action",
            align: "left",
            sortable: true,
            cell: (record) => {
                return <button className="btn btn-primary" onClick={()=>{
                    moveOrderAlert(record.status===PendingEnum?ProcessingEnum:record.status===ProcessingEnum?ShippingEnum:record.status===ShippingEnum?DeliveredEnum:"",record.id)
                }} disabled={record.status===DeliveredEnum}>{record.status===PendingEnum?"Move Processing":record.status===ProcessingEnum?"Move Shipping":record.status===ShippingEnum?"Move Delivered":"Delivered"}</button>;
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

    const showOrder=(record)=>{
        setCurrectRecord(record)
        setShow(true)
    }

    const moveOrderAlert=(status,id)=>{
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
              {
                label: "Yes",
                onClick: () => moveOrder(status,id),
              },
              {
                label: "No",
              },
            ],
          });
    }
   
    const moveOrder=(status,id)=>{
       const data={
        status,id
       }
       updateOrderStatus(data).then((result) => {
        if (result.data.status) {
          toast.dismiss();
          toast.success(result.data.message);
          getOrder({ status })
          setStatus(status)
        }
        else {
          toast.dismiss();
          toast.error(result.data.message);
        }
      })
    }

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
                                    <b>Order List</b>
                                </h2>
                                <div>
                                    <select value={status} onChange={(e)=>{setStatus(e.target.value)}} className="form-select">
                                        {statusEnum?.map((list)=>{
                                            return (<option value={list.value} key={list.key}>{list.key}</option>)
                                        })}
                                    </select>
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
                        <OrderViewModal setShow={setShow} show={show} currentRecord={currectRecord}/>
                    </div>
                </div>
            </div>
        </>
    );
};
