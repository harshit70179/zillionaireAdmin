import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputValid } from "../../validations/InputValid";
import { toast } from "react-toastify";
import { useSetFaqMutation } from "../../../redux/faqApi";

function AddFaqModal(props) {
  const [setFaq] = useSetFaqMutation();
  const [question, setQuestion] = useState("");
  const [questionErr, setQuestionErr] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerErr, setAnswerErr] = useState("");
  const handleClose = () => {
    setQuestion("");
    setQuestionErr("");
    setAnswer("");
    setAnswerErr("");
    props.setShow(false);
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
    };
    setFaq(data).then((result) => {
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
      <Modal show={props.show} onHide={handleClose}>
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

export default AddFaqModal;
