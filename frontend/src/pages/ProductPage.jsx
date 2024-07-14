import { useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Badge from 'react-bootstrap/esm/Badge';
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import CardBody from 'react-bootstrap/esm/CardBody';
import Button from 'react-bootstrap/esm/Button';
import Rating from '../components/Rating';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../store';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return { ...state };
    }
}

function ProductPage() {
    const params = useParams();
    const { slug } = params;
    const [{ loading, product, error }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                console.log(error);
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [slug]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const addToCartHandler = () => {
        ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity: 1 },
        });
    };

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant={'danger'}>{error}</MessageBox>
    ) : (
        <div>
            <Helmet>
                <title>{product.name}</title>
            </Helmet>
            <Row>
                <Col md={6}>
                    <img
                        className="img-large"
                        src={product.image}
                        alt={product.name}
                    ></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            {/* <Helmet> */}
                            <title>{product.name}</title>
                            {/* </Helmet> */}
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            ></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Pirce : ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description:
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <CardBody>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0 ? (
                                                <Badge bg="success">
                                                    In Stock
                                                </Badge>
                                            ) : (
                                                <Badge bg="danger">
                                                    Unavailable
                                                </Badge>
                                            )}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button
                                                variant="primary"
                                                onClick={addToCartHandler}
                                            >
                                                Add to Cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </CardBody>
                </Col>
            </Row>
        </div>
    );
}

export default ProductPage;
