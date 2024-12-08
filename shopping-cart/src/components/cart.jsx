import React, { useState } from 'react';
import { Button, Table, Form, Modal, Row, Col, Card } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; // For the toggle button (cart icon)

const Cart = ({ cart, updateQuantity, onCheckout }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const filteredCart = cart.filter(item => item.quantity > 0);
  const total = filteredCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) {
      setItemToRemove(item);
      setShowModal(true);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const confirmRemoval = () => {
    if (itemToRemove) {
      updateQuantity(itemToRemove.id, 0);
      setItemToRemove(null);
      setShowModal(false);
    }
  };

  const cancelRemoval = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(prev => !prev);
  };

  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    right: isSidebarVisible ? '0' : '-350px', // Manage slide in/out
    width: '350px',
    height: '100%',
    backgroundColor: '#fff',
    boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
    padding: '20px',
    zIndex: 1000,
    transition: 'right 0.3s ease',
    borderRadius: '12px 0 0 12px',
    overflowY: 'auto',
  };

  return (
    <>
      {/* Cart Icon Button */}
      <Button 
        className="cart-toggle-btn" 
        onClick={toggleSidebar} 
        variant="outline-primary" 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          backgroundColor: '#f48fb1',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '30px',
          color: '#fff',
        }}
      >
        <FaShoppingCart /> Cart
      </Button>

      {/* Sidebar with Cart */}
      <div className={`cart-sidebar ${isSidebarVisible ? 'show' : ''}`} style={sidebarStyles}>
        <div className="cart-header" style={{ marginBottom: '20px' }}>
          <Button 
            variant="outline-danger" 
            onClick={toggleSidebar} 
            style={{ padding: '8px 12px', fontSize: '1.1rem', borderRadius: '25px' }}
          >
            Close
          </Button>
        </div>

        <h2 className="my-4" style={{ color: '#f06292' }}>Your Shopping Cart</h2>
        
        {/* Empty Cart State */}
        {filteredCart.length === 0 ? (
          <Card className="text-center p-4 shadow-sm" style={{ backgroundColor: '#fce4ec' }}>
            <Card.Body>
              <Card.Title style={{ color: '#f06292' }}>Your cart is empty!</Card.Title>
              <Card.Text style={{ color: '#333' }}>
                Looks like you haven't added anything yet. Start shopping now!
              </Card.Text>
              <Button variant="primary" href="/shop" style={{
                backgroundColor: '#f48fb1', 
                borderRadius: '25px', 
                padding: '12px 20px', 
                fontSize: '1rem',
                border: 'none',
              }}>
                Go to Shop
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            {/* Cart Table */}
            <Table striped bordered hover responsive className="shadow-sm">
              <thead className="bg-light" style={{ backgroundColor: '#fce4ec' }}>
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filteredCart.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>
                      <img 
                        src={item.images.length > 0 ? item.images[0].image : "https://via.placeholder.com/100"} 
                        alt={item.title} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      {/* Quantity Controls with Buttons */}
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleQuantityChange(item, item.quantity - 1)} 
                          disabled={item.quantity <= 1}
                          style={{ borderRadius: '12px' }}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                          style={{ borderRadius: '12px' }}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Total Price Section */}
            <Row className="my-3">
              <Col md={6} className="d-flex justify-content-between align-items-center">
                <h4 style={{ color: '#f06292' }}>Total:</h4>
                <h4 style={{ color: '#f06292' }}>${total.toFixed(2)}</h4>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Button variant="primary" onClick={onCheckout} style={{
                  backgroundColor: '#f06292',
                  borderRadius: '25px',
                  padding: '12px 20px',
                  fontSize: '1rem',
                  border: 'none',
                }}>
                  Checkout
                </Button>
              </Col>
            </Row>
          </>
        )}

        {/* Modal for Item Removal */}
        <Modal show={showModal} onHide={cancelRemoval} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: '#f06292' }}>Remove Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {itemToRemove && (
              <p style={{ color: '#333' }}>
                Are you sure you want to remove <strong>{itemToRemove.title}</strong> from your cart?
              </p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelRemoval} style={{ borderRadius: '25px' }}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmRemoval} style={{ borderRadius: '25px' }}>
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Cart;
