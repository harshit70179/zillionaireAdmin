import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InputValid } from "../../validations/InputValid";

function ReturnPolicy(props) {
  const [returnPolicy, setReturnPolicy] = useState("");
  const [returnPolicyErr, setReturnPolicyErr] = useState("");
  useEffect(() => {
    if (props.data) {
      const propsData = props.data;
      setReturnPolicy(propsData.return_policy?propsData.return_policy:"");
    }
  }, [props.data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let checkReturn = InputValid("returnPolicy", returnPolicy);
      if(checkReturn){
        setReturnPolicyErr(checkReturn)
        return false
      }
      const propsData = props.data;
      const data = {
        tac: propsData ? propsData.TAC : "",
        return_policy: returnPolicy ,
        shipping:propsData? propsData.shipping:"",
      };
      props.onHandleSubmit(data)
  };
  return (
    <div className="p-2">
      <h4 className="mb-3">Return policy</h4>
      <Form>
        <div className="row">
          <div className="col-12">
            <CKEditor
              editor={ClassicEditor}
              data={returnPolicy}
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
                setReturnPolicy(data);
              }}
            />
             <span style={{ color: "red" }}>
                {returnPolicyErr}
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

export default ReturnPolicy;