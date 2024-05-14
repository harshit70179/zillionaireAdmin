import React from 'react'
import Header from '../../Widgets/Header'
import Navbar from '../../Widgets/Navbar'
import ReactDatatable from "@mkikets/react-datatable";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import "react-confirm-alert/src/react-confirm-alert.css";
import moment from "moment";
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteRoleMutation, useGetRoleQuery } from '../../../redux/RoleApi';


function RoleList() {
  const navigate=useNavigate()
    const { data: record } = useGetRoleQuery();
    const [deleteRole] = useDeleteRoleMutation();
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
          key: "email",
          text: "Email",
          className: "email",
          align: "left",
          sortable: true,
        },
        {
          key: "mobile_number",
          text: "Mobile No.",
          className: "mobileNo",
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
            key: "action",
            text: "Action",
            className: "Action",
            align: "left",
            sortable: true,
            cell: (record) => {
              return (
                <>
                  <button onClick={()=>{deleteRoleAlert(record.id)}} className="me-3">
                    <span className="mdi mdi-trash-can-outline"></span>
                  </button>
                  <button onClick={()=>{editRole(record.id)}}>
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
      const RoleDeleteApi = async (id) => {
        let data = {
          id,
        };
        deleteRole(data).then((result) => {
          if (result.data.status) {
            toast.dismiss();
            toast.success(result.data.message);
          }
        });
      };
      const deleteRoleAlert = (Deleteid) => {
        confirmAlert({
          title: "Confirm to submit",
          message: "Are you sure to do this.",
          buttons: [
            {
              label: "Yes",
              onClick: () => RoleDeleteApi(Deleteid),
            },
            {
              label: "No",
            },
          ],
        });
      };
      const editRole=(id)=>{
        navigate('/edit-role/'+id)
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
              <b>Role List</b>
            </h2>
          </div>
          
              <div className="product-list-outer card p-3">
              <div className="add-product-btn ">
                    <Link
                      to='/add-role'
                      className="btn btn-primary"
                    >
                      Add Role
                    </Link>
                  </div>
                <ReactDatatable
                  config={config}
                  records={record}
                  columns={columns}
                />
              
              </div>
         
        </div>
      </div>
    </div>
  </div>
  )
}

export default RoleList
