import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table} from "react-bootstrap";
import { decrementQuantity, incrementQuantity, removeFromCart } from "../slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  
  // Make sure you're accessing the correct slice of the state
  const cartItems = useSelector((state) => state.products.selectedProducts);  
  
  console.log(cartItems);

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.prix * item.quantity, // Use `price` field
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
                <td>${item.prix}</td> {/* Use item.price */}
                <td>{item.quantity}</td> {/* Correct quantity */}
                <td>
                  <button
                    className="btn btn-outline-success mx-1"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-outline-info mx-1"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-danger btn-xs"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div
          className="d-flex justify-content-between align-items-center px-3 py-2"
          style={{ borderTop: "1px solid #ddd" }}
        >
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
