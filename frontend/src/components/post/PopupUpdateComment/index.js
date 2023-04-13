import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { Container,Alert } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";


const Popup_Comment_Edit = (props) => {
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [comment, setComments] = useState(props.comment);
    const [addComment, setAddComment] = useState("");
    const [commentId, setCommentId] = useState(props.id);

    const state = useSelector((state) => {
      
        return {
          userId: state.auth.userId,
          token: state.auth.token,
          userLikes: state.auth.userLikes,
          pfp: state.auth.pfp,
          
        };
      });
  //===============================================================
    
  //===============================================================

    const updateComment = async(e) => {
        try {
          const result = await axios.put(`http://localhost:5000/comments/${e.target.value}`,{comment:addComment},{
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          if (result.data.success) {
            setMessage("");
            setStatus(false)
          } else throw Error;
        } catch (error) {
          if (!error.response.data.success) {
            setStatus(true)
            return setMessage(error.response.data.message);
          }
          setStatus(true)
          setMessage("Error happened while update Comment, please try again");
        }
    }

  //===============================================================

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        update you'r comment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>new comment:</Form.Label>
                    <Form.Control name="img" onChange={(e) =>{setAddComment(e.target.value)}} defaultValue={comment} />
                </Modal.Body>

                <Modal.Footer>
                    <div className="addSubmit">
                        <Button value={commentId} variant="primary" onClick={(e) => {updateComment(e)}}>submit</Button>
                    </div>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
                
        <Container>
                  {status && <Alert variant="danger">{message}</Alert>}
        </Container>
            </Modal>
        </div>
    )
}

export default Popup_Comment_Edit