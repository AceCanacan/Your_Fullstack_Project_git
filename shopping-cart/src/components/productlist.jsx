import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Pagination, Row, Spinner } from 'react-bootstrap';
import './productlist.css'; // or your actual CSS file path

const ProductList = ({ addToCart, purchasedItems }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading
  const productsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/products/');
        const data = await res.json();
        setProducts(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => !purchasedItems.includes(product.id))
    .filter(product =>
      product.title.toLowerCase().includes(filter.toLowerCase())
    );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 1000);
  };

  return (
    <Container className="my-5">
      {/* Filter Input */}
      <Row className="my-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search products by name"
            value={filter}
            onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}
            debounceTimeout={500} // Add debounce effect
            className="rounded-pill"
          />
        </Col>
      </Row>

      {/* Loading State */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="light" /> {/* Use light color for loading spinner */}
        </div>
      ) : (
        <>
          {/* Product List */}
          <Row>
            {currentProducts.map(product => (
              <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                <Card className="product-card border-0 shadow-sm rounded-3">
                  {product.images.length > 0 ? (
                    <Card.Img variant="top" src={product.images[0].image} />
                  ) : (
                    <Card.Img variant="top" src="https://via.placeholder.com/300" />
                  )}
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>

                    <Card.Text className="text-center text-muted">${product.price}</Card.Text>
                    <Button
                      variant={addedToCart === product.id ? "secondary" : "success"}
                      onClick={() => handleAddToCart(product)}
                      disabled={addedToCart === product.id}
                      className="w-100 rounded-pill"
                    >
                      {addedToCart === product.id ? "Added!" : "Add to Cart"}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Row>
            <Col className="d-flex justify-content-center">
              <Pagination className="pagination-custom">
                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => paginate(idx + 1)}>
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductList;
