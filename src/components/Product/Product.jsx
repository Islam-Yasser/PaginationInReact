import React from "react";
import "./Product.module.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Product(props) {

  return <div className="d-flex flex-row mb-5">
        <img width={250} src={props.value?.urlToImage} />
        <div>
          <Card className="text-center">
            <Card.Header>{props.value?.source?.name}</Card.Header>
            <Card.Body>
              <Card.Title>{props.value?.title}</Card.Title>
              <Card.Text>{props.value?.description}</Card.Text>
              <Button variant="primary">{props.value?.author}</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              {props.value?.publishedAt}
            </Card.Footer>
          </Card>
        </div>
      </div>
    
  
}

export default Product;
