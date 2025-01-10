import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.carts.cartItems);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.prix * item.quantity,
    0
  );

  return (
    <div className="container mt-5 py-4">
      {cartItems.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.prix}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <Button
                      variant="outline-success mx-1"
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-info mx-1"
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      -
                    </Button>
                    <Button
                      variant="danger "
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center px-3 py-2">
            <h5>Total Amount</h5>
            <h6>${totalAmount.toFixed(2)}</h6>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
