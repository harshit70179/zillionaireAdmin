import React,{useState} from "react";
import Header from "../../Widgets/Header";
import Navbar from "../../Widgets/Navbar";
import moment from "moment";
import ReactDatatable from "@mkikets/react-datatable";
import { useGetMainCategoryQuery } from "../../../redux/mainCategoryApi";
import AddMainCategoryModal from "../../partial/mainCategory/AddMainCategoryModal";
import UpdateMainCategoryModal from "../../partial/mainCategory/UpdateMainCategoryModal";

function MainCategory() {
    const { data } = useGetMainCategoryQuery()
    const [addModal,setAddModal]=useState(false)
    const [updateModal,setUpdateModal]=useState(false)
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
            key: "name",
            text: "Name",
            className: "name",
            align: "left",
            sortable: true,
        },
        {
            key: "total_category",
            text: "Total Category",
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
            key: "action",
            text: "Action",
            className: "Action",
            align: "left",
            sortable: true,
            cell: (record) => {
              return (
                <>
                  <button onClick={()=>{editFee(record)}}>
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

    const handleShow=()=>{
        setAddModal(true)
    }

    const editFee=(record)=>{
        setUpdateModal(true)
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
                                <b>Main Category List</b>
                            </h2>
                            <div className="add-product-btn ">
                                <button
                                    onClick={() => handleShow()}
                                    className="btn btn-primary fees_list_btn"
                                >
                                    Add Main Category
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
            <AddMainCategoryModal addModal={addModal} setAddModal={setAddModal}/>
            <UpdateMainCategoryModal updateModal={updateModal} setUpdateModal={setUpdateModal} currentRecord={currentRecord}/>
        </div>
    )
}

export default MainCategory
