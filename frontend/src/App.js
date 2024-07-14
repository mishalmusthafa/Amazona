import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { useContext } from 'react';
import { Store } from './store';

function App() {
    const { state } = useContext(Store);
    const { cart } = state;
    return (
        <BrowserRouter>
            <div className="d-flex flex-column site-contianer">
                <header>
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <LinkContainer to="/">
                                <Navbar.Brand>Amazona</Navbar.Brand>
                            </LinkContainer>
                            <Nav className="me-auto">
                                <Link to="/cart" className="nav-link">
                                    Cart{' '}
                                    {cart.cartItems.length > 0 && (
                                        <Badge pill bg="danger">
                                            {cart.cartItems.reduce(
                                                (a, c) => a + c.quantity,
                                                0
                                            )}
                                        </Badge>
                                    )}
                                </Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>
                <main>
                    <Container className="mt-3">
                        {' '}
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route
                                path="/product/:slug"
                                element={<ProductPage />}
                            />
                        </Routes>
                    </Container>
                </main>
                <footer>
                    <div className="text-center">All right reserved</div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
