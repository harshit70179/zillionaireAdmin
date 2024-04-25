import React, { useState, useEffect } from 'react'
import Header from '../../Widgets/Header'
import Navbar from '../../Widgets/Navbar'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useGetSubCategoryQuery } from '../../../redux/subCategoryApi';
import { useGetCategoryQuery } from '../../../redux/categoryApi';
import { useGetMainCategoryQuery } from '../../../redux/mainCategoryApi';
import { InputValid } from '../../validations/InputValid';
import { finishingEnum } from '../../constant/enum';
import { toast } from 'react-toastify';
import { useSetProductMutation } from '../../../redux/productsApi';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const navigate=useNavigate()
    const [setProduct] = useSetProductMutation()
    const { data: mainCategoryList } = useGetMainCategoryQuery()
    const { data: categoryList } = useGetCategoryQuery()
    const { data: subCategoryList } = useGetSubCategoryQuery()
    const [categoryData, setCategoryData] = useState([])
    const [subCategoryData, setSubCategoryData] = useState([])
    const [mainCategoryId, setMainCategoryId] = useState("")
    const [mainCategoryIdErr, setMainCategoryIdErr] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [title, setTitle] = useState("")
    const [titleErr, setTitleErr] = useState("")
    const [finishingCategory, setfinishingCategory] = useState("")
    const [sizeData, setSizeData] = useState([])
    const [size, setSize] = useState("")
    const [price, setPrice] = useState("")
    const [priceErr, setPriceErr] = useState("")
    const [images, setImages] = useState([]);
    const [imageURLS, setImageURLs] = useState([]);
    const [priceData, setPriceData] = useState([])
    const [description, setDescription] = useState("")
    const [descriptionErr, setDescriptionErr] = useState("")

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }
    console.log(imageURLS)
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "mainCategoryId") {
            setMainCategoryId(value)
            const filterCategory = categoryList.filter((list) => list.main_category_id === parseInt(value))
            setCategoryData(filterCategory)
            if (value === "") {
                setMainCategoryIdErr("This field is required")
            }
            setMainCategoryIdErr("")
        }
        if (name === "categoryId") {
            setCategoryId(value)
            const filterSubCategory = subCategoryList.filter((list) => list.category_id === parseInt(value))
            const filterCategory = categoryList.filter((list) => list.id === parseInt(value))
            setSubCategoryData(filterSubCategory)
            setSizeData(JSON.parse(filterCategory[0]?.size))
        }
        if (name === "subCategoryId") {
            setSubCategoryId(value)
        }
        if (name === "title") {
            setTitle(value);
            const err = InputValid(name, value);
            setTitleErr(err);
        }
        if (name === "finishingCategory") {
            setfinishingCategory(value)
        }
        if (name === "size") {
            setSize(value)
        }
        if (name === "price") {
            setPrice(value)
            if (value === "") {
                setPriceErr("This field is required")
            }
            setPriceErr("")
        }
    }

    const removeImage = (i) => {
        let newImageUrl = [...imageURLS];
        newImageUrl.splice(i, 1);
        setImageURLs(newImageUrl);
        let newFiles = [...images];
        newFiles.splice(i, 1);
        setImages(newFiles);
    }

    const addProduct = (e) => {
        e.preventDefault()
        if (mainCategoryId === "") {
            setMainCategoryIdErr("This field is required")
            return false
        }
        if (title === "") {
            setTitleErr("This field is required")
            return false
        }
        if (images.length === 0) {
            toast.error("Please add atleast one image")
            return false
        }
        if (description === "") {
            setDescriptionErr("This field is required")
            return false
        }
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("main_category_id", mainCategoryId);
        formdata.append("description", description);
        formdata.append("category_id", categoryId);
        formdata.append("sub_category_id", subCategoryId);
        formdata.append("price", JSON.stringify(priceData));
        for (let i = 0; i < images.length; i++) {
            formdata.append("images", images[i]);
          }
    
        setProduct(formdata).then((result) => {
            if (result.data.status) {
                toast.dismiss();
                toast.success(result.data.message)
                navigate("/product")
            } else {
                toast.dismiss();
                toast.error(result.data.message);
            }
        });

    }

    const addPrice = () => {
        if(price===""){
            setPriceErr("This field is required")
            return false
        }
        let filter = priceData.filter((list) => { return list.size === size && finishingCategory === list.finishingCategory })
        if (filter.length > 0) {
            toast.error("Already added this prize")
            return false
        }
        let data = {
            size: size,
            price: price,
            finishingCategory: finishingCategory
        }
        setPriceData([...priceData, data])
        setPrice("")
        setSize("")
        setfinishingCategory("")
    }
  
    const removePriceData=(i)=>{
        let newPriceData = [...priceData];
        newPriceData.splice(i, 1);
        setPriceData(newPriceData);
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
                                <b>Add Product</b>
                            </h2>
                        </div>
                        <div className="product-list-outer card p-3 fees_list_page">
                            <Form onSubmit={addProduct}>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label> Main Category <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Select
                                                name="mainCategoryId"
                                                onChange={handleChange}
                                                value={mainCategoryId}
                                            >
                                                <option value="">Select Main Category</option>
                                                {
                                                    mainCategoryList?.map((list) => {
                                                        return (
                                                            <option value={list.id} key={list.id}>{list.name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                            <span style={{ color: "red" }}>{mainCategoryIdErr}</span>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select
                                                name="categoryId"
                                                onChange={handleChange}
                                                value={categoryId}
                                            >
                                                <option value="">Select Category</option>
                                                {
                                                    categoryData?.map((list) => {
                                                        return (
                                                            <option value={list.id} key={list.id}>{list.name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Sub Category</Form.Label>
                                            <Form.Select
                                                name="subCategoryId"
                                                onChange={handleChange}
                                                value={subCategoryId}
                                            >
                                                <option value="">Select Sub Category</option>
                                                {
                                                    subCategoryData?.map((list) => {
                                                        return (
                                                            <option value={list.id} key={list.id}>{list.name}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label> Title <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                name="title"
                                                onChange={handleChange}
                                                type="text"
                                                value={title}
                                            ></Form.Control>
                                            <span style={{ color: "red" }}>{titleErr}</span>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-6'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label> Image <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                type="file"
                                                multiple accept="image/.png, image/.jpg, image/.jpeg" onChange={onImageChange} value=""
                                            ></Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='d-flex'>
                                        {imageURLS.map((imageSrc, index) => (
                                            <div className="image-preview">
                                                <img src={imageSrc} alt="not fount" width={"250px"} key={index} />
                                                <button onClick={() => { removeImage(index) }} className="btn btn-danger btn-sm" type='button'><i className="fa fa-trash"></i></button>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                    <div className='col-md-4'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Finishing Category</Form.Label>
                                            <Form.Select
                                                name="finishingCategory"
                                                onChange={handleChange}
                                                value={finishingCategory}
                                            >
                                                <option value="">Select Finishing Category</option>
                                                {
                                                    finishingEnum?.map((list) => {
                                                        return (
                                                            <option value={list.value} key={list.key}>{list.key}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Size</Form.Label>
                                            <Form.Select
                                                name="size"
                                                onChange={handleChange}
                                                value={size}
                                            >
                                                <option value="">Select Size</option>
                                                {
                                                    sizeData?.map((list) => {
                                                        return (
                                                            <option value={list} key={list}>{list}</option>
                                                        )
                                                    })
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-3'>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label> Price ($) <span style={{ color: "red" }}>*</span></Form.Label>
                                            <Form.Control
                                                name="price"
                                                onChange={handleChange}
                                                type="number"
                                                value={price}
                                            ></Form.Control>
                                            <span style={{ color: "red" }}>{priceErr}</span>
                                        </Form.Group>
                                    </div>
                                    <div className='col-md-2'>
                                        <Button onClick={addPrice}> Add Price</Button>
                                    </div>
                                    <div className='col-md-12'>
                                        <label>Description <span style={{ color: "red" }}>*</span></label>
                                        <CKEditor
                                            editor={ClassicEditor}
                                            data={description}

                                            config={{
                                                toolbar: [
                                                    "heading",
                                                    "|",
                                                    "fontSize",
                                                    "|",
                                                    "bold",
                                                    "italic",
                                                    "link",
                                                    "bulletedList",
                                                    "numberedList",

                                                    "blockQuote",
                                                ],

                                                heading: {
                                                    options: [
                                                        {
                                                            model: "paragraph",
                                                            title: "Paragraph",
                                                            class: "ck-heading_paragraph",
                                                        },
                                                        {
                                                            model: "heading1",
                                                            view: "h1",
                                                            title: "Heading 1",
                                                            class: "ck-heading_heading1",
                                                        },
                                                        {
                                                            model: "heading2",
                                                            view: "h2",
                                                            title: "Heading 2",
                                                            class: "ck-heading_heading2",
                                                        },
                                                        {
                                                            model: "heading3",
                                                            view: "h3",
                                                            title: "Heading 3",
                                                            class: "ck-heading_heading3",
                                                        },
                                                    ],
                                                },
                                                fontSize: {
                                                    options: ['tiny', 'small', 'default', 'big', 'bigger'],
                                                },
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                setDescription(data);
                                                if (data) {

                                                    setDescriptionErr("")
                                                }
                                            }}
                                        />
                                        <p className="text-danger">{descriptionErr}</p>
                                    </div>
                                    {priceData.length > 0 && <div className='col-md-12'>
                                        <table className='w-100'>
                                            <thead>
                                                <tr>
                                                    <th>Finishing</th>
                                                    <th>Size</th>
                                                    <th>Price</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {priceData?.map((list,index) => {
                                                    return (
                                                        <tr>
                                                            <td>{list.finishingCategory}</td>
                                                            <td>{list.size}</td>
                                                            <td>{list.price}</td>
                                                            <td>  <button onClick={() => { removePriceData(index) }} className="btn btn-danger btn-sm" type='button'><i className="fa fa-trash"></i></button></td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                    </div>}
                                    <div>
                                        <Button type='submit' className='btn btn-primary'>Add Product</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
