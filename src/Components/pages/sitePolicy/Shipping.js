import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InputValid } from "../../validations/InputValid";

function Shipping(props) {
  const [shipping, setShipping] = useState("");
  const [shippingErr, setShippingErr] = useState("");
  useEffect(() => {
    if (props.data) {
      const propsData = props.data;
      setShipping(propsData.shipping?propsData.shipping:"");
    }
  }, [props.data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkshipping = InputValid("shipping", shipping);
      if(checkshipping){
        setShippingErr(checkshipping)
        return false
      }
      const propsData = props.data;
      const data = {
        tac: propsData ? propsData.TAC : "",
        shipping: shipping ,
        return_policy:propsData? propsData.return_policy:"",
      };
      props.onHandleSubmit(data)
  };
  return (
    <div className="p-2">
      <h4 className="mb-3">Shipping</h4>
      <Form>
        <div className="row">
          <div className="col-12">
            <CKEditor
              editor={ClassicEditor}
              data={shipping}
              config={{
                toolbar: [
                  "heading",
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
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setShipping(data);
              }}
            />
             <span style={{ color: "red" }}>
                {shippingErr}
              </span>
          </div>

          <div className="col-12">
            <button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="btn btn-primary mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Shipping;