import React, { useContext, useEffect, useRef, useState } from "react";
import { Container, Nav, Tab, Col, Row, Dropdown } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import logo from "../public/images/logo.svg";
import logoWhite from "../public/images/logo-white.svg";
import signUpLeft from "../public/images/signup-left.svg";
import loginBlue from "../public/images/login-blue.svg";
import forgotLeft from "../public/images/forgot-left.svg";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import UserState from "../context/UserState";
import UserContext from "../context/UserContext";
import MyAccountDropdown from "./MyAccountDropdown";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Headerlanding() {
  const context = useContext(UserContext);

  const {
    closeRefRegisterModalandOpenLogin,
    productsData,
    setProductsData,
    checkLoginUser,
    loginUserAvalilable,
    setloginUserAvalilable,
    getCartItemsFn,
    cartItems,
    fetchData,
  } = context;
  // console.log(closeRefRegisterModalandOpenLogin, "LOGIN TOGGLE");
  // const [productsData, setProductsData] = useState(null);
  // console.log(props, "PROPS");
  const selectedUser = useSelector(selectUser);
  // console.log(productsData, "pdata");
  const [preset, setPreset] = useState({
    one: true,
    two: false,
    three: false,
  });
  // console.log(process.env.NEXT_PUBLIC_URL, "ROOT URL");
  // const [publicPath] = useState(process.env.NEXT_PUBLIC_URL);
  const [regiterDetails, setregiterDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    eyeShown: false,
  });
  const [loginDetails, setloginDetails] = useState({
    email: "",
    password: "",
    eyeShown: false,
  });
  // Password validation
  const [passwordValidation, setpasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });
  // otp
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]).current;
  const [showRules, setShowRules] = useState(false);
  const [forgotPasswordShowRules, setForgotPasswordShowRules] = useState(false);

  // login logout if user already logged in
  // const [loginUserAvalilable, setloginUserAvalilable] = useState(false);

  // Toggle
  const [activeKey, setActiveKey] = useState("0");
  // cart items
  // const [cartItems, setcartItems] = useState([]);

  const handleChange = (e, index) => {
    if (e.target.value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value.length === 1 && inputRefs[index + 1]) {
      inputRefs[index + 1].current.focus();
    }
  };
  // Modal
  const [showModal, setShowModal] = useState({
    "toggle-1": false,
    "toggle-2": false,
    "toggle-3": false,
    "toggle-4": false,
    "toggle-5": false,
    "toggle-6": false,
    "toggle-7": false,
  });

  const handleDropdownOpen = (id) => {
    // setShowModal({ [id]: true });
    // document.getElementById(id).classList.add('show');
    document.getElementById(id).click();
  };
  const handleDropdownClose = (id) => {
    // setShowModal({ ...showModal, [id]: false });
    // document.getElementById(id).classList.remove('show');
    document.getElementById(id).click();
  };

  // console.log(showModal, "SHOW MODAL");

  const closeRefLoginModal = useRef();
  // After typing email and reset button otp model has to open
  const otpModalRef = useRef();
  const router = useRouter();

  // Register details onchange
  const registerDetailsChangeFn = (e) => {
    if (e.target.id === "password") {
      let value = e.target.value;
      if (value.length > 0) {
        setShowRules(true);
      } else {
        setShowRules(false);
      }
      setpasswordValidation({
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#\$%^&*?_~]/.test(value),
      });
    }
    setregiterDetails({ ...regiterDetails, [e.target.id]: e.target.value });
  };
  // console.log(passwordValidation, "password validation");
  // Login details onchnage
  const loginDetailsChangeFn = (e) => {
    if (e.target.id === "password") {
      let value = e.target.value;
      setpasswordValidation({
        length: value.length >= 8,
        lowercase: /[a-z]/.test(value),
        uppercase: /[A-Z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#\$%^&*?_~]/.test(value),
      });
    }
    setloginDetails({ ...loginDetails, [e.target.id]: e.target.value });
  };

  const checkDisbledCreateAccountBtn = async () => {
    const isValid = Object.values(passwordValidation).every(
      (val) => val === true
    );
    // console.log(isValid, "IS VALID");
    return isValid;
  };
  // Onclick create account function
  const createAccountFn = async () => {
    let isValid = checkDisbledCreateAccountBtn();

    if (isValid) {
      try {
        var CryptoJSAesJson = {
          stringify: function (cipherParams) {
            var j = {
              ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64),
            };
            if (cipherParams.iv) j.iv = cipherParams.iv.toString();
            if (cipherParams.salt) j.s = cipherParams.salt.toString();
            return JSON.stringify(j);
          },
        };
        const key = "JAnz23M4o6m";
        let encrypted = CryptoJS.AES.encrypt(
          JSON.stringify(regiterDetails.password),
          key,
          {
            format: CryptoJSAesJson,
          }
        ).toString();
        encrypted = JSON.parse(encrypted);
        const response = await axios({
          url: `${process.env.NEXT_PUBLIC_URL}register`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
          data: {
            name: regiterDetails.first_name + " " + regiterDetails.last_name,
            customer_first_name: regiterDetails.first_name,
            customer_last_name: regiterDetails.last_name,
            email: regiterDetails.email,
            encryptp: {
              ct: encrypted.ct,
              iv: encrypted.iv,
              s: encrypted.s,
            },
            password: "123",
          },
        });

        // console.log(response, "result");
        if (response.status == 200) {
          setregiterDetails({ email: "", password: "", eyeShown: false });
          setpasswordValidation({
            length: false,
            lowercase: false,
            uppercase: false,
            number: false,
            special: false,
          });
          // alert("Registration Successful");
          closeRefRegisterModalandOpenLogin.current.click();
        }
      } catch (error) {
        console.log(error);
        alert("Error");
      }
    } else {
      // alert("password must follow specified rules");
    }
    // console.log(isValid, "IS VALID");
  };

  // Login details submit button
  const loginDetailsSubmitFn = async () => {
    try {
      var CryptoJSAesJson = {
        stringify: function (cipherParams) {
          var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
          if (cipherParams.iv) j.iv = cipherParams.iv.toString();
          if (cipherParams.salt) j.s = cipherParams.salt.toString();
          return JSON.stringify(j);
        },
      };
      const key = "JAnz23M4o6m";
      let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(loginDetails.password),
        key,
        {
          format: CryptoJSAesJson,
        }
      ).toString();
      encrypted = JSON.parse(encrypted);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}login`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          email: loginDetails.email,
          encryptp: {
            ct: encrypted.ct,
            iv: encrypted.iv,
            s: encrypted.s,
          },
          password: "123",
        },
      });
      // console.log(response, "result");
      if (response.status == 200) {
        localStorage.setItem(
          "janz_medical_login_token",
          response?.data?.authorisation?.token
        );
        localStorage.setItem(
          "janz_medical_user",
          JSON.stringify(response?.data?.user)
        );
        setloginDetails({ email: "", password: "", eyeShown: false });
        setpasswordValidation({
          length: false,
          lowercase: false,
          uppercase: false,
          number: false,
          special: false,
        });
        // alert("Login Successful");

        closeRefLoginModal.current.click();
        checkLoginUser();
        router.push("/profile_details");
      } else {
        // alert("Error");
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };

  // Reset password Button
  const resetPasswordBtn = async () => {
    try {
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}password/resset`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: loginDetails.email,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
      } else {
        setPreset({
          one: false,
          two: true,
          three: false,
        });
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };

  const resetPasswordOtpBtn = async () => {
    try {
      let passwordStr = otp.join("");
      // console.log(passwordStr, "PSTR");

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}password/resset/verify`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: loginDetails.email,
          verify_code: passwordStr,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
      } else {
        setPreset({
          one: false,
          two: false,
          three: true,
        });
        setloginDetails({
          email: "",
          password: "",
          eyeShown: false,
        });
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  const resetPasswordLoginBtn = async () => {
    let isValid = checkDisbledCreateAccountBtn();
    if (!isValid) {
      return;
    }
    try {
      var CryptoJSAesJson = {
        stringify: function (cipherParams) {
          var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
          if (cipherParams.iv) j.iv = cipherParams.iv.toString();
          if (cipherParams.salt) j.s = cipherParams.salt.toString();
          return JSON.stringify(j);
        },
      };
      const key = "JAnz23M4o6m";
      let encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(loginDetails.password),
        key,
        {
          format: CryptoJSAesJson,
        }
      ).toString();
      encrypted = JSON.parse(encrypted);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}password/change`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          email: loginDetails.email,
          encryptp: {
            ct: encrypted.ct,
            iv: encrypted.iv,
            s: encrypted.s,
          },
          password: "123",
        },
      });
      // console.log(response, "result");
      if (response.data.status != false) {
        setPreset({
          one: true,
          two: false,
          three: false,
        });
        setloginDetails({
          email: "",
          password: "",
          eyeShown: false,
        });

        setpasswordValidation({
          length: false,
          lowercase: false,
          uppercase: false,
          number: false,
          special: false,
        });
        closeRefRegisterModalandOpenLogin.current.click();
      } else {
        // alert("Error");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  // Forgot pasword modal
  const forgotPasswordModal = () => {
    setPreset({
      one: true,
      two: false,
      three: false,
    });
    setloginDetails({
      email: "",
      password: "",
      eyeShown: false,
    });
    setOtp(["", "", "", ""]);
    setpasswordValidation({
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      special: false,
    });
    setForgotPasswordShowRules(false);
  };

  // console.log(productsData, "PRODUCTS DATA");

  const handleModalToggle = (id) => {
    setShowModal({ [id]: true });
    // if (!showModal[id]) {
    //   handleModalOpen(id);
    // }
  };

  // const getCartItemsFn = async () => {
  //   try {
  //     let user = JSON.parse(localStorage.getItem("janz_medical_user"));
  //     const response = await axios({
  //       url: `${process.env.NEXT_PUBLIC_URL}product/cartproducts`,
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: {
  //         customer_id: user ? user.customer_id : "",
  //       },
  //     });

  //     // console.log(response, "result");
  //     if (response.data.status == false) {
  //       console.log("Error");
  //     } else {
  //       console.log(response?.data);
  //       setcartItems(response?.data?.cart_products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
    if (!selectedUser.menu_content_fetched) {
      fetchData();
    }
    checkLoginUser();
  }, []);
  return (
    <>
      <div className="landing-header">
        <div className="header-row">
          <nav className="bg-light">
            <div className="container d-flex align-items-center">
              <div className="navbar-brand">
                <Link href={"/"}>
                  <Image width={219} height={70} src={logo} alt="..." />
                </Link>
              </div>
              <div className="ms-auto">
                <form className="d-flex form-box " role="search">
                  <div className="main">
                    <div className="form">
                      <a className="search-button">
                        <span>
                          <svg className="icon">
                            <use href="#icon_search"></use>
                          </svg>
                        </span>
                      </a>
                      <input type="text" placeholder="Search" />
                    </div>
                  </div>
                  {/*   className="dropdown-arrow " */}
                  {loginUserAvalilable ? (
                    <div className="header-btn   drop-arrow ">
                      <MyAccountDropdown headerlanding />
                    </div>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-primary ms-5"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenterOne"
                      >
                        Register
                      </button>
                      <button
                        className="btn btn-outline-primary ms-5 me-4"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenter"
                      >
                        Login
                      </button>
                    </>
                  )}

                  <div className="header-icon">
                    <div className="icon-count">{cartItems?.length}</div>
                    <div className="d-flex align-items-center">
                      <Link href={"/cart_items"} className="link">
                        <div className="kart">
                          <svg className="icon text-secondary">
                            <use href="#icon_cart"></use>
                          </svg>
                          <span className="text-secondary d-none d-lg-block">
                            Cart
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <Navbar bg="primary" expand="lg" className="p-0 navbar">
          <Container>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-lg-0 w-100 d-flex justify-content-between"
                navbarScroll
              >
                <Dropdown
                  className="has-megamenu"
                  onMouseLeave={() => {
                    handleDropdownClose("dropdown1");
                    setActiveKey("0");
                  }}
                >
                  <Dropdown.Toggle
                    id="dropdown1"
                    onMouseEnter={() => handleDropdownOpen("dropdown1")}
                    className="text-white m-0 dropdown-btn"
                  >
                    Products
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="megamenu p-3 rounded-0 border-white"
                    show={showModal["toggle-1"]}
                  >
                    <Tab.Container
                      id="left-tabs-example"
                      activeKey={activeKey}
                      defaultActiveKey="0"
                    >
                      <Row>
                        <Col sm={3}>
                          <Nav
                            variant="pills"
                            className="flex-column border-end"
                          >
                            {productsData?.categories?.map((item, index) => (
                              <Nav.Item key={index}>
                                <Nav.Link
                                  eventKey={`${index}`}
                                  className="rg-arrow"
                                  onMouseEnter={() => {
                                    setActiveKey(`${index}`);
                                  }}
                                >
                                  <strong
                                    onClick={() => {
                                      router.push(
                                        `/category/${item?.category_slug}`
                                      );
                                    }}
                                  >
                                    {item?.category_name}
                                  </strong>
                                </Nav.Link>
                              </Nav.Item>
                            ))}
                          </Nav>
                        </Col>
                        <Col sm={9}>
                          <Tab.Content>
                            {productsData?.categories?.map((item, index) => (
                              <Tab.Pane eventKey={`${index}`} key={index}>
                                <div className="container">
                                  <div className="row row-cols-1 row-cols-md-4">
                                    {item?.children?.map(
                                      (child, child_index) => (
                                        <div
                                          className="col"
                                          key={child?.category_name}
                                        >
                                          <h5
                                            className="pb-2"
                                            onClick={() => {
                                              router.push(
                                                `/category/${item?.category_slug}/${child?.category_slug}`
                                              );
                                            }}
                                            style={{ cursor: "pointer" }}
                                          >
                                            {child?.category_name}
                                          </h5>
                                          <ul>
                                            {child?.children?.map(
                                              (
                                                grand_child,
                                                grand_child_index
                                              ) => (
                                                <li
                                                  onClick={() => {
                                                    router.push(
                                                      `/category/${item?.category_slug}/${child?.category_slug}/${grand_child?.category_slug}`
                                                    );
                                                  }}
                                                  key={
                                                    grand_child.category_name
                                                  }
                                                >
                                                  {grand_child.category_name}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </Tab.Pane>
                            ))}
                          </Tab.Content>
                        </Col>
                      </Row>
                    </Tab.Container>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                  className="pntr-none"
                  onMouseLeave={() => handleDropdownClose("dropdown2")}
                >
                  <Dropdown.Toggle
                    id="dropdown2"
                    onMouseEnter={() => handleDropdownOpen("dropdown2")}
                    className="text-white m-0 dropdown-btn pnt-none"
                  >
                    Brands
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    className="brand-btn mt-0 border-0"
                    show={showModal["toggle-2"]}
                  >
                    <div className="container">
                      <div className="row row-cols-1 row-cols-md-4">
                        {productsData?.brands?.map((item, index) => (
                          <div
                            className="col"
                            key={index}
                            onClick={() =>
                              router.push(`/shop_by_brand/${item?.brand_slug}`)
                            }
                          >
                            <ul>
                              <li>{item?.brand_slug}</li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                  className="pntr-none"
                  onMouseLeave={() => handleDropdownClose("dropdown3")}
                >
                  <Dropdown.Toggle
                    id="dropdown3"
                    className="text-white m-0 dropdown-btn pnt-none"
                    onMouseEnter={() => handleDropdownOpen("dropdown3")}
                  >
                    Insurances
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="head-list mt-0 border-0"
                    show={showModal["toggle-3"]}
                  >
                    <ul>
                      {productsData?.insurance?.map((item, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            router.push(
                              `/insurance_accepted/${item?.insurance_slug}`
                            )
                          }
                        >
                          {item?.insurance_name}
                        </li>
                      ))}
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                  className="pntr-none"
                  onMouseLeave={() => handleDropdownClose("dropdown4")}
                >
                  <Dropdown.Toggle
                    id="dropdown4"
                    className="text-white m-0 dropdown-btn pnt-none"
                    onMouseEnter={() => handleDropdownOpen("dropdown4")}
                  >
                    Services
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="list-w mt-0 border-0"
                    show={showModal["toggle-4"]}
                  >
                    <ul>
                      <li>Lactation Support Mother Pumping</li>
                      <li>Doula Support</li>
                    </ul>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown
                  className="pntr-none"
                  onMouseLeave={() => handleDropdownClose("dropdown5")}
                >
                  <Dropdown.Toggle
                    id="dropdown5"
                    className="text-white m-0 dropdown-btn pnt-none"
                    onMouseEnter={() => handleDropdownOpen("dropdown5")}
                  >
                    Resources
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="resources-btn mt-0 border-0"
                    show={showModal["toggle-5"]}
                  >
                    <div className="container">
                      <div className="row row-cols-1 row-cols-md-2">
                        <div className="col">
                          <h5 className="pb-2">Patient Education</h5>
                          <ul>
                            <li>Breast Pump</li>
                            <li>Respiratory </li>
                            <li>Compression Education</li>
                            <li>Mobility Education</li>
                            <li>Monitoring Devices</li>
                          </ul>
                        </div>
                        <div className="col">
                          <h5 className="pb-2">New Patient Packet</h5>
                          <h5 className="pb-2">Product Warranty</h5>
                          <ul>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown
                  className="about-btn-box pntr-none career-btn"
                  onMouseLeave={() => handleDropdownClose("toggle-6")}
                >
                  <Dropdown.Toggle
                    id="toggle-6"
                    className="text-white m-0 dropdown-btn pnt-none  "
                    onMouseEnter={() => handleDropdownOpen("toggle-6")}
                  >
                    About Us
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="about-btn mt-0 border-0 pnt-none"
                    show={showModal["toggle-6"]}
                  >
                    <div className="container">
                      <div className="row row-cols-1 row-cols-md-4">
                        {productsData?.stores?.map((item, index) => (
                          <div className="col" key={item?.continent_name}>
                            <h5 className="pb-2">{item?.continent_name}</h5>
                            <ul>
                              {item?.stores?.map((item, index) => {
                                return (
                                  <li style={{ fontSize: "17px" }} key={index}>
                                    {item?.store_name}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                        <div
                          className="col"
                          style={{
                            position: "absolute",
                            bottom: "50px",
                            right: "0px",
                          }}
                        >
                          <button type="button" className="btn btn-primary">
                            Contact Us
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
                <div className="career-btn">
                  <button type="button" className="text-white m-0 dropdown-btn">
                    Careers
                  </button>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      {/* Signup */}
      <div
        className="modal fade"
        id="exampleModalCenterOne"
        tabIndex="-1"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
          <div className="modal-content border-0 rounded-md-4 overflow-hidden">
            <div className="modal-body p-0">
              <div className="bg-primary py-2 px-4 d-block text-center d-md-none position-relative">
                <button
                  type="button"
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  // ref={closeRefRegisterModal}
                >
                  <svg className="icon">
                    <use href="#icon_loginclose"></use>
                  </svg>
                </button>
                <Image width={100} height={30} src={logoWhite} alt="..." />
              </div>
              <button
                type="button"
                className="btn-close position-absolute d-none d-md-block end-0 top-0 me-3 mt-3"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowRules(false)}
              ></button>
              <div className="row m-0">
                <div className="col-md-5 p-4 bg-primary text-white d-none d-md-block">
                  <div>
                    <h4 className="pb-3">
                      Looks like you’re new to JANZ Medical Supply
                    </h4>
                    <p className="pb-3 fs-5">
                      SignUp with your email to get started
                    </p>
                  </div>
                  <div className="d-flex justify-content-center mt-5">
                    <Image
                      width={200}
                      height={180}
                      src={signUpLeft}
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-7 p-4 pt-5">
                  <form className="login-form">
                    <h3 className="text-center d-block d-md-none pb-3">
                      Create Account
                    </h3>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPws0" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={regiterDetails.first_name}
                        onChange={registerDetailsChangeFn}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPws0" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={regiterDetails.last_name}
                        onChange={registerDetailsChangeFn}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPws0" className="form-label">
                        Email (username)
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={regiterDetails.email}
                        // autoComplete="current-password"
                        onChange={registerDetailsChangeFn}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputPws01" className="form-label">
                        Set Password
                      </label>
                      <div className="position-relative">
                        <input
                          type={regiterDetails.eyeShown ? "text" : "password"}
                          className="form-control"
                          id="password"
                          value={regiterDetails.password}
                          onChange={registerDetailsChangeFn}
                          // onFocus={() => setShowRules(true)}
                          // autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="vision"
                          onClick={() =>
                            setregiterDetails({
                              ...regiterDetails,
                              eyeShown: !regiterDetails.eyeShown,
                            })
                          }
                        >
                          {/* <svg className="icon">
                            <use href="#icon_vision"></use>
                          </svg> */}
                          {regiterDetails.eyeShown ? (
                            <svg className="icon">
                              <use href="#icon_vision_withoutslash"></use>
                            </svg>
                          ) : (
                            <svg className="icon">
                              <use href="#icon_vision"></use>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    {showRules && (
                      <div className="mb-2">
                        <div className="reset-tick-box pb-2">
                          <span className="me-2">
                            <svg className="icon">
                              {passwordValidation.length ? (
                                <use href="#icon_green-tick"></use>
                              ) : (
                                <use href="#icon_wrong-tick"></use>
                              )}
                            </svg>
                          </span>
                          <span>Atleast 8 character</span>
                        </div>
                        <div className="reset-tick-box pb-2">
                          <span className="me-2">
                            <svg className="icon">
                              {passwordValidation.lowercase ? (
                                <use href="#icon_green-tick"></use>
                              ) : (
                                <use href="#icon_wrong-tick"></use>
                              )}
                            </svg>
                          </span>
                          <span>Atleast One Lower case</span>
                        </div>
                        <div className="reset-tick-box pb-2">
                          <span className="me-2">
                            <svg className="icon">
                              {passwordValidation.uppercase ? (
                                <use href="#icon_green-tick"></use>
                              ) : (
                                <use href="#icon_wrong-tick"></use>
                              )}
                            </svg>
                          </span>
                          <span>Atleast One Upper case</span>
                        </div>
                        <div className="reset-tick-box pb-2">
                          <span className="me-2">
                            <svg className="icon">
                              {passwordValidation.number ? (
                                <use href="#icon_green-tick"></use>
                              ) : (
                                <use href="#icon_wrong-tick"></use>
                              )}
                            </svg>
                          </span>
                          <span>Atleast One Number</span>
                        </div>
                        <div className="reset-tick-box pb-2">
                          <span className="me-2">
                            <svg className="icon">
                              {passwordValidation.special ? (
                                <use href="#icon_green-tick"></use>
                              ) : (
                                <use href="#icon_wrong-tick"></use>
                              )}
                            </svg>
                          </span>
                          <span>
                            Atleast One Special Character (! @ # $ % ^ & % * ? _
                            ~)
                          </span>
                        </div>
                      </div>
                    )}
                    <p>
                      By Continuing you are agree to Janz Medical Supply’s
                      Privacy and Terms of use
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary w-100 login-btn my-2"
                      onClick={createAccountFn}
                    >
                      Create Account
                    </button>
                    <button
                      type="button"
                      className="btn btn-light w-100 login-btn my-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalCenter"
                      ref={closeRefRegisterModalandOpenLogin}
                    >
                      Existing user? Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Forget */}

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-2"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
          <div className="modal-content border-0 rounded-md-4 overflow-hidden">
            <div className="modal-body p-0">
              <div className="bg-primary py-2 px-4 d-block text-center d-md-none position-relative">
                <button
                  type="button"
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg className="icon">
                    <use href="#icon_loginclose"></use>
                  </svg>
                </button>
                <Image width={100} height={30} src={logoWhite} alt="..." />
              </div>
              <button
                type="button"
                className="btn-close position-absolute d-none d-md-block end-0 top-0 me-3 mt-3"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeRefLoginModal}
              ></button>
              <div className="row m-0">
                <div className="col-md-5 p-4 bg-primary text-white d-none d-md-block">
                  <h3>Login</h3>
                  <h5 className="py-3">Forgot Password</h5>
                  <p className="pb-3">
                    We Directl Bill Tricare CPAP Supply For Easy Breathing
                    Materniny Care for New Moms
                  </p>
                  <p>
                    Get Acess to your order, Insurance Wishlist and
                    recommendations
                  </p>

                  <div className="d-flex justify-content-center">
                    <Image width={200} height={200} src={loginBlue} alt="..." />
                  </div>
                </div>
                <div className="col-md-7 p-5">
                  <form className="login-form">
                    <h3 className="text-center d-block d-md-none pb-3">
                      Login
                    </h3>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        value={loginDetails.email}
                        className="form-control"
                        id="email"
                        onChange={loginDetailsChangeFn}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="position-relative">
                        <input
                          type={loginDetails.eyeShown ? "text" : "password"}
                          className="form-control"
                          id="password"
                          value={loginDetails.password}
                          onChange={loginDetailsChangeFn}
                        />
                        <button
                          type="button"
                          className="vision"
                          onClick={() =>
                            setloginDetails({
                              ...loginDetails,
                              eyeShown: !loginDetails.eyeShown,
                            })
                          }
                        >
                          {/* <svg className="icon">
                            <use href="#icon_vision"></use>
                          </svg> */}
                          {loginDetails.eyeShown ? (
                            <svg className="icon">
                              <use href="#icon_vision_withoutslash"></use>
                            </svg>
                          ) : (
                            <svg className="icon">
                              <use href="#icon_vision"></use>
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="forgot-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenterTwo"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <p className="py-4">
                      By Continuing you are agree to Janz Medical Supply’s
                      Privacy and Terms of use
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary w-100 login-btn"
                      onClick={loginDetailsSubmitFn}
                    >
                      Login
                    </button>
                    <p className="text-center pt-4">
                      New to Janz Medical Supply?
                    </p>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="create-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalCenterOne"
                      >
                        Create an account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalCenterTwo"
        tabIndex="-2"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
          <div className="modal-content border-0 rounded-md-4 overflow-hidden">
            <div className="modal-body p-0">
              <div className="bg-primary py-2 px-4 d-block text-center d-md-none position-relative">
                <button
                  type="button"
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 close-btn"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg className="icon">
                    <use href="#icon_loginclose"></use>
                  </svg>
                </button>
                <Image width={100} height={30} src={logoWhite} alt="..." />
              </div>
              <button
                type="button"
                className="btn-close position-absolute d-none d-md-block end-0 top-0 me-3 mt-3"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={forgotPasswordModal}
              ></button>
              <div className="row m-0">
                <div className="col-md-5 p-4 bg-primary text-white d-none d-md-block">
                  <h3>Forgot Password</h3>
                  <h5 className="py-3">Forgot Password</h5>
                  <p className="pb-3">
                    We Directl Bill Tricare CPAP Supply For Easy Breathing
                    Materniny Care for New Moms
                  </p>
                  <p>
                    Get Acess to your order, Insurance Wishlist and
                    recommendations
                  </p>

                  <div className="d-flex justify-content-center">
                    <Image
                      width={200}
                      height={200}
                      src={forgotLeft}
                      alt="..."
                    />
                  </div>
                </div>
                <div className="col-md-7 p-5">
                  {preset.one && (
                    <form className="login-form">
                      <h3 className="text-center d-block d-md-none pb-3">
                        Forgot Password
                      </h3>
                      <p className="py-4 text-center">
                        Please enter your email to receive a Verification code
                      </p>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail3"
                          className="form-label"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          value={loginDetails.email}
                          className="form-control"
                          id="email"
                          onChange={loginDetailsChangeFn}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary w-100 login-btn my-3"
                        // onClick={() => setPreset(true)}
                        onClick={resetPasswordBtn}
                      >
                        Reset Password
                      </button>
                    </form>
                  )}
                  {preset.two && (
                    <form className="login-form">
                      <h3 className="text-center d-block d-md-none pb-3">
                        Forgot Password
                      </h3>
                      <p className="py-4 text-center">
                        Please enter 4 digit Verification code sent to{" "}
                        {loginDetails.email}
                      </p>
                      <div className="mb-3 d-flex">
                        {otp.map((value, index) => (
                          <input
                            key={index}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(e, index)}
                            ref={inputRefs[index]}
                            className="form-control me-3 ms-3"
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary w-100 login-btn my-3"
                        onClick={resetPasswordOtpBtn}
                      >
                        Reset Password
                      </button>
                    </form>
                  )}
                  {preset.three && (
                    <form className="login-form">
                      <h3 className="text-center d-block d-md-none pb-3">
                        Reset Password
                      </h3>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPws4"
                          className="form-label"
                        >
                          New Password
                        </label>
                        <div className="position-relative">
                          <input
                            type={loginDetails.eyeShown ? "text" : "password"}
                            className="form-control"
                            id="password"
                            value={loginDetails.password}
                            onChange={loginDetailsChangeFn}
                            onFocus={() => setForgotPasswordShowRules(true)}
                          />
                          <button
                            type="button"
                            className="vision"
                            onClick={() =>
                              setloginDetails({
                                ...loginDetails,
                                eyeShown: !loginDetails.eyeShown,
                              })
                            }
                          >
                            {loginDetails.eyeShown ? (
                              <svg className="icon">
                                <use href="#icon_vision_withoutslash"></use>
                              </svg>
                            ) : (
                              <svg className="icon">
                                <use href="#icon_vision"></use>
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {forgotPasswordShowRules && (
                        <div className="mb-2">
                          <div className="reset-tick-box pb-2">
                            <span className="me-2">
                              <svg className="icon">
                                {passwordValidation.length == true ? (
                                  <use href="#icon_green-tick"></use>
                                ) : (
                                  <use href="#icon_wrong-tick"></use>
                                )}
                              </svg>
                            </span>
                            <span>Atleast 8 character</span>
                          </div>
                          <div className="reset-tick-box pb-2">
                            <span className="me-2">
                              <svg className="icon">
                                {passwordValidation.lowercase == true ? (
                                  <use href="#icon_green-tick"></use>
                                ) : (
                                  <use href="#icon_wrong-tick"></use>
                                )}
                              </svg>
                            </span>
                            <span>Atleast One Lower case</span>
                          </div>
                          <div className="reset-tick-box pb-2">
                            <span className="me-2">
                              <svg className="icon">
                                {passwordValidation.uppercase == true ? (
                                  <use href="#icon_green-tick"></use>
                                ) : (
                                  <use href="#icon_wrong-tick"></use>
                                )}
                              </svg>
                            </span>
                            <span>Atleast One Upper case</span>
                          </div>
                          <div className="reset-tick-box pb-2">
                            <span className="me-2">
                              <svg className="icon">
                                {passwordValidation.number == true ? (
                                  <use href="#icon_green-tick"></use>
                                ) : (
                                  <use href="#icon_wrong-tick"></use>
                                )}
                              </svg>
                            </span>
                            <span>Atleast One Number</span>
                          </div>
                          <div className="reset-tick-box pb-2">
                            <span className="me-2">
                              <svg className="icon">
                                {passwordValidation.special == true ? (
                                  <use href="#icon_green-tick"></use>
                                ) : (
                                  <use href="#icon_wrong-tick"></use>
                                )}
                              </svg>
                            </span>
                            <span>
                              Atleast One Special Character (! @ # $ % ^ & % * ?
                              _ ~)
                            </span>
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn btn-primary w-100 login-btn mt-2"
                        onClick={resetPasswordLoginBtn}
                      >
                        Login
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
