import { Link } from 'react-router-dom';
// import data from '../data';
import axios from 'axios';
import { useEffect } from 'react';
import { useReducer } from 'react';
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
            <h1>Featured Items</h1>
            <div className="products">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>{error.message}</div>
                ) : (
                    products.map((product) => (
                        <div className="product" key={product.slug}>
                            <Link to={`/product/${product.slug}`}>
                                <div>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />
                                </div>
                            </Link>
                            <div className="product-info">
                                <Link to={`/product/${product.slug}`}>
                                    <p>{product.name}</p>
                                </Link>
                                <p>
                                    <strong>${product.price} </strong>
                                </p>
                                <button>Add to cart</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default HomePage;
