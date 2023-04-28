import axios from "axios";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteConfirmation from "../components/DeleteConfirmation";

function AllFruits() {
    const [allFruits, setAllFruits] = useState([]);
    const [showModal, setshowModal] = useState(false);
    const [itemIdToDelete, setitemIdToDelete] = useState(0);

    let navigate = useNavigate();
    const routeChange = () =>{ 
      let path = `/add-fruit`; 
      navigate(path);
    }

    useEffect(() => { 
        axios.get("http://localhost:4000/fruits").then( (response) => {
        setAllFruits((previousState) => {
        return response.data;
        }); 
      });
    },[]); 

    const openDeleteConfirmaModalHandler = (id) => {
      setshowModal(true);
      setitemIdToDelete(id);

    }

    const closeModalHandler = () => {
      setshowModal(false);
      setitemIdToDelete(0);
    }

    const confirmDeleteHandler = () => {
      axios.delete(`http://localhost:4000/fruits/${itemIdToDelete}`)
      .then(() => {
        setAllFruits( (previousState) => { 
          return previousState.filter( _ => _.id !== itemIdToDelete);
        });
        setitemIdToDelete(0);
        setitemIdToDelete(false);
      })      

    }
    
    

    return (
    <>
    <DeleteConfirmation
    showModal={showModal}
      title= "Delete Warning!"
      body="Do you want to Delete this item?"
      closeModalHandler = {closeModalHandler}
      confirmDeleteHandler = {confirmDeleteHandler}
    >
    </DeleteConfirmation>
    <Row className="mt-2">
        <Col md={{span:4,offset:4}}>
        <Button variant="primary" type="button" onClick= {routeChange}>
        Add A New Fruit
        </Button>
        </Col>
    </Row>
    <Row xs={1} md={3} className="g-4">
    {allFruits.map((item) => (
      <Col key={item.id}>
        <Card>
          <Card.Img variant="top" src={item.imageUrl} style={{height:250}}/>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              Quantity(KG Units) - {item.quantity}
            </Card.Text>
            <Card.Text>
              Cost - {item.cost}
            </Card.Text>
            <Button 
              variant="primary" 
              type="button" 
              onClick= {() => navigate(`/edit-fruit/${item.id}`)}>
              Edit
          </Button>
          <Button 
              variant="danger" 
              type="button" 
              onClick= {() => openDeleteConfirmaModalHandler(item.id)}
          >
              Delete
          </Button>
          </Card.Body>         

        </Card>
      </Col>
    ))}
  </Row> 
  </>
    );
}
export default AllFruits;