import React from 'react';
import { Container, Row, Col, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import './screen.css'; // Import custom CSS here

const Screen = ({ cart, addToCart, updateQuantity, purchasedItems }) => {
  const navigate = useNavigate();

  const navigateToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container fluid className="screen-container">
      {/* Navbar Section */}
      <Navbar expand="lg" className="navbar">
        <Navbar.Brand href="/">Amazing Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#shop">Shop</Nav.Link>
            <Nav.Link href="/cart">
              Cart ({cart.length})
            </Nav.Link>
            <Nav.Link onClick={navigateToCheckout}>Checkout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Header Section with Image */}
      <Row className="header-section">
        <Col>
          {/* Welcome Text Above the Image */}
          <div className="welcome-above-image">
            <h2>Welcome to Amazing Shop!</h2>
            <p>Your one-stop shop for the best deals and trending products. Start shopping now!</p>
          </div>

          <div className="header-content">
            <div className="header-image-wrapper">
              <img 
                src="https://img.pikbest.com/wp/202409/online-shopping-store-at-a-3d-on-your-smartphone-pink-background-with-floating-bag-and-discount-promotion-banner-render-illustration_9747426.jpg!bw700" 
                alt="Online shopping on smartphone with promotional banner"
                className="header-image" 
              />
            </div>
          </div>
        
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="main-content-row">
        {/* Product List Section */}
        <Col md={8}>
          <ProductList 
            addToCart={addToCart} 
            purchasedItems={purchasedItems} 
          />
        </Col>

        {/* Cart Sidebar */}
        <Col md={4} className="cart-col">
          <div className="cart-sidebar">
            <Cart 
              cart={cart} 
              updateQuantity={updateQuantity} 
              onCheckout={navigateToCheckout} 
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Screen;
