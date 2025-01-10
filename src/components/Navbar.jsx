import { Link } from "react-router-dom";
// import ModalCart from "./ModalCart";
import { FaCartShopping } from "react-icons/fa6";

import { useSelector } from "react-redux";
// import Cart from "./Cart";

const Navbar = () => {
  const cartItems = useSelector((state) => state.products.selectedProducts);
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#c6934b", padding: "10px 20px" }}>
      <Link className="navbar-brand mx-5" to="/" style={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}>
        Shopping Cart
      </Link>
      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
              style={{
                backgroundColor: "#5c2c0e",
                color: "#fff",
                border: "none",
                padding: "5px 15px",
              }}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#carts"
              href="/cart"
            >
              
              <Link style={{ textDecoration: "none" }}  to="/Cart">
              <FaCartShopping style={{ marginRight: "5px" }} /> 
              <span className="badge badge-light ml-2" style={{ marginLeft: "8px", backgroundColor: "#f5c6a5", color: "#5c2c0e" }}>{cartItems.length}</span>
          
              </Link>
            </button>
          </li>
        </ul>
      </div>
      {/* <Cart></Cart> */}
    </nav>
  );
};

export default Navbar;
