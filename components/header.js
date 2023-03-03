import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../public/images/logo.svg";
import { useRouter } from "next/router";
import MyAccountDropdown from "./MyAccountDropdown";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import Greeting from "./Greeting";

export default function Header() {
  const context = useContext(UserContext);
  const { cartItems } = context;
  const router = useRouter();
  // const [cartItems, setcartItems] = useState([]);
  const [user, setUser] = useState("");
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  useEffect(() => {
    let userParsed = JSON.parse(localStorage.getItem("janz_medical_user"));
    setUser(userParsed?.customer_name);
  }, []);

  return (
    <>
      <Offcanvas className="menu-list-box" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <aside className="left-aside menu-box">
            <div className="col-auto logo-box">
              <Link className="logo" href={" "}>
                <Image
                  width={150}
                  height={60}
                  src={logo}
                  alt="logo"
                  onClick={() => router.push("/")}
                />
              </Link>
            </div>
            <div className="d-flex justify-content-center pt-4">
              <h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    // fontSize: "5px",
                  }}
                >
                  <Greeting />
                  <div style={{ marginLeft: "5px" }}> {user}</div>
                </div>
              </h2>
            </div>
            <button
              typeof="button"
              className="button button-blue w-100 l"
              // onClick={() => router.push("/index")}
            >
              Continue Shopping
            </button>
            <ul>
              <li>
                <Link href={"/my_order"} className="nav-link">
                  <span>
                    <svg className="icon">
                      <use href="#icon_kart"></use>
                    </svg>
                  </span>
                  <strong>My Order</strong>
                </Link>
              </li>
              <hr />
              <li>
                <Link href={"/subscription"} className="nav-link">
                  <span>
                    <svg className="icon">
                      <use href="#icon_subscription"></use>
                    </svg>
                  </span>
                  <strong>Subscriptions</strong>
                </Link>
              </li>
              <hr />
              <li>
                <Link href={"/wishlist"} className="nav-link">
                  <span>
                    <svg className="icon">
                      <use href="#icon_subscription"></use>
                    </svg>
                  </span>
                  <strong>Wishlist</strong>
                </Link>
              </li>
              <hr />
              <li>
                <Link href={""} className="nav-link">
                  <span>
                    <svg className="icon">
                      <use href="#icon_user"></use>
                    </svg>
                  </span>
                  <strong>Account Setting</strong>
                </Link>
              </li>
              <li>
                <Link href={"/profile_details"} className="nav-link">
                  <strong className="small">Profile Details</strong>
                </Link>
              </li>
              <li>
                <Link href={"/insurance_details"} className="nav-link">
                  <strong className="small">Insurance Details</strong>
                </Link>
              </li>
              <hr />
              <li>
                <Link
                  href={""}
                  className="nav-link d-flex justify-content-between"
                >
                  <div className="d-flex align-item-center">
                    <div className="logout">
                      <span>
                        <svg className="icon">
                          <use href="#icon_signout"></use>
                        </svg>
                      </span>
                    </div>
                    <strong>Sign Out</strong>
                  </div>
                  <svg className="icon">
                    <use href="#icon_arrow"></use>
                  </svg>
                </Link>
              </li>
            </ul>
          </aside>
        </Offcanvas.Body>
      </Offcanvas>
      <header>
        <div className="container-fluid">
          <div className="row">
            <div className="col-auto menu-list">
              <button onClick={handleShow}>
                <span>
                  <svg className="icon">
                    <use href="#icon_list"></use>
                  </svg>
                </span>
              </button>
            </div>
            <div className="col-auto logo-box">
              <Link className="logo" href={"/"}>
                <Image width={219} height={70} src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col align-self-center">
              <div className="col-md-12 d-flex justify-content-end">
                <div className="nav-btn">
                  <Link href={"/"}>
                    <button type="button" className="button button-blue fs-20">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
                <div className="header-btn">
                  <MyAccountDropdown />
                </div>
                <div className="header-icon">
                  <div className="icon-count">{cartItems?.length}</div>
                  <div className="d-flex align-items-center">
                    <Link href={"/cart_items"} className="link">
                      <div className="kart">
                        <svg className="icon">
                          <use href="#icon_cart"></use>
                        </svg>
                        <span>Cart</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
