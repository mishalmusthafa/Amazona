import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';

function Product(props) {
    const { product } = props;
    return (
        <div>
            <Card>
                <Link to={`/product/${product.slug}`}>
                    <div>
                        <img
                            className="card-img-top"
                            src={product.image}
                            alt={product.name}
                        />
                    </div>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product.slug}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Text>${product.price}</Card.Text>
                    <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                    />
                    <Button>Add to cart</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Product;
