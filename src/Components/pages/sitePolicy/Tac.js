import React, { useState,useEffect } from "react";
import Form from "react-bootstrap/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { InputValid } from "../../validations/InputValid";

function Tac(props) {
  const [tac, setTac] = useState("");
  const [tacErr, setTacErr] = useState("");
  useEffect(() => {
    if (props.data) {
      const propsData = props.data;
      setTac(propsData.TAC?propsData.TAC:"");
    }
  }, [props.data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let checktac = InputValid("tac", tac);
    if (checktac) {
      setTacErr(checktac);
      return false;
    }
    const propsData = props.data;
    const data = {
      shipping:propsData? propsData.shipping:"",
      tac: tac,
      return_policy:propsData? propsData.return_policy:""
    };
    props.onHandleSubmit(data)
  };

  return (
    <div className="p-2">
      <h4 className="mb-3">Terms And Conditions</h4>
      <Form>
        <div className="row">
          <div className="col-12">
            <CKEditor
              editor={ClassicEditor}
              data={tac}
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
                setTac(data);
              }}
            />
            <span style={{ color: "red" }}>{tacErr}</span>
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

export default Tac;