import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { useUpdateFaqMutation } from "../../../redux/faqApi";

function UpdateFaqModal(props) {
  const [updateFaq] = useUpdateFaqMutation();
  const [question, setQuestion] = useState("");
  const [questionErr, setQuestionErr] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerErr, setAnswerErr] = useState("");
  const [id, setId] = useState("")

  useEffect(() => {
    if (props.currentRecord) {
      setQuestion(props.currentRecord.question)
      setAnswer(props.currentRecord.answer)
      setId(props.currentRecord.id)
    }
  }, [props])


  const handleClose = () => {
    setQuestion("");
    setQuestionErr("");
    setAnswer("");
    setAnswerErr("");
    props.setUpdateShow(false);
  };
  const handlechange = (e) => {
    let { name, value } = e.target;
    if (name === "question") {
      setQuestion(value);
      const err = InputValid(name, value);
      setQuestionErr(err);
    }
    if (name === "answer") {
      setAnswer(value);
      const err = InputValid(name, value);
      setAnswerErr(err);
    }
  };

  const onsubmit = async (e) => {
    const checkQuestion = InputValid("question", question);
    if (checkQuestion) {
      setQuestionErr(checkQuestion);
      return false;
    }
    const checkAnswer = InputValid("role", answer);
    if (checkAnswer) {
      setAnswerErr(checkAnswer);
      return false;
    }

    const data = {
      question,
      answer,
      id
    };
    updateFaq(data).then((result) => {
      if (result.data.status) {
        toast.dismiss();
        toast.success(result.data.message);
        handleClose();
      } else {
        toast.dismiss();
        toast.error(result.data.message);
      }
    });
  };
  return (
    <div>
      <Modal show={props.updateShow} onHide={handleClose}>
        <Modal.Header closeButton>
          {" "}
          <Modal.Title style={{ color: "black" }}>Add FAQ</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Question </Form.Label>
              <Form.Control
                name="question"
                onChange={handlechange}
                type="text"
                value={question}
              ></Form.Control>
              <span style={{ color: "red" }}>{questionErr}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> Answer </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="answer"
                onChange={handlechange}

                value={answer}
              ></Form.Control>
              <span style={{ color: "red" }}>{answerErr}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onsubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UpdateFaqModal;
