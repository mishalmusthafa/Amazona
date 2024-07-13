// import data from '../data';
import axios from 'axios';
import { useEffect } from 'react';
import { useReducer } from 'react';
import Product from '../components/Product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Helmet } from 'react-helmet-async';
// import logger from 'use-reducer-logger';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return { ...state };
    }
}

function HomePage() {
    const [{ loading, products, error }, dispatch] = useReducer(reducer, {
        products: [],
        loading: true,
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_ERROR', payload: error });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Amazona</title>
            </Helmet>
            <h1>Featured Items</h1>
            <div className="products">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error.message}</div>
                ) : (
                    <Row>
                        {products.map((product) => (
                            <Col sm={6} md={4} lg={3} key={product.slug}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}

export default HomePage;
