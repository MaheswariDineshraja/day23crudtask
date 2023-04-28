import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

function AddFruit() {
    const fruitName = useRef("");
    const quantity = useRef("");
    const price = useRef("");
    const imagesUrl = useRef("");

    const navigate = useNavigate()

    const addFruitHandler = () => {
        var payload = {
            name: fruitName.current.value,
            quantity: quantity.current.value ? Number(quantity.current.value):0,
            cost: price.current.value ? Number(price.current.value):0,
            imageUrl: imagesUrl.current.value
        }
        axios.post("http://localhost:4000/fruits",payload)
        .then((response) => 
        { navigate("/")})
        
    }
    return ( 
    <>
    <legend>Create </legend>
    <Form>
    <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" ref={fruitName}/>        
    </Form.Group>
    <Form.Group className="mb-3" controlId="formQuantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="number" ref={quantity}/>        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formCost">
        <Form.Label>Cost</Form.Label>
        <Form.Control type="number" ref={price} />        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" ref={imagesUrl} />        
      </Form.Group>
      <Button variant="primary" type="button" onClick={addFruitHandler}>
        Submit
      </Button>
    </Form>
    </>
    );

}

export default AddFruit;