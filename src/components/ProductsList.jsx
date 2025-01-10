import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchFromAPI, filterProducts } from "../slices/ProductSlice";
import { FaShoppingCart } from "react-icons/fa";
import { Form, Button, Card, Col, Row, Container } from "react-bootstrap";

const ProductsList = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { filteredProducts, loading, error } = useSelector(
    (state) => state.products
  );

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchFromAPI());
  }, [dispatch]);

  // Apply filters
  useEffect(() => {
    dispatch(filterProducts({ category, searchTerm }));
  }, [category, searchTerm, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Products List</h1>

      {/* Filters */}
      <div className="mb-4">
        <Row className="g-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="accessories">Accessories</option>
            </Form.Select>
          </Col>
        </Row>
      </div>

      {/* Product List */}
      <Row className="g-4">
        {filteredProducts.map((product) => (
          <Col md={4} key={product.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <strong>Price:</strong> {product.prix} $
                </Card.Text>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => dispatch(addToCart(product))}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsList;
