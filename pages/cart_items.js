import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import {
  Container,
  Nav,
  Tab,
  Col,
  Row,
  Dropdown,
  Table,
} from "react-bootstrap";
import Headerlanding from "../components/headerlanding";
const inter = Inter({ subsets: ["latin"] });
import cartImg2 from "../public/images/card-img2.svg";
import airMini from "../public/images/air-mini.svg";
import uploader from "../public/images/uploader.svg";
import no_image from "../public/images/no_image.jpg";
import { useRouter } from "next/router";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Cart() {
  const context = useContext(UserContext);
  const {
    getCartItemsFn,
    calculateTotalCartPrice,
    cartItems,
    totalPrice,
    settotalPrice,
    setcartItems,
    closeRefRegisterModalandOpenLogin,
  } = context;
  const selectedUser = useSelector(selectUser);
  const [num, setNum] = useState(1);
  // rx file
  const [rawFile, setrawFile] = useState(null);
  const [previewUrl, setpreviewUrl] = useState(null);
  const [rxSeclectedItem, setrxSeclectedItem] = useState({});
  // cart items
  // const [cartItems, setcartItems] = useState([]);
  // logged in user
  const [loggedInUser, setloggedInUser] = useState({});
  // total cart price
  // const [totalPrice, settotalPrice] = useState(0);
  const [discountApplied, setdiscountApplied] = useState(false);
  // rx title
  const [rx_title, setrx_title] = useState(
    "I will send my prescription to JANZ"
  );
  // upload rx ref
  const uploadRfRef = useRef();

  const router = useRouter();

  // console.log(rx_title, "rx title");
  // counter increment
  const handleChangeIncrement = (index, item) => {
    // setNum(e.target.value);
    setcartItems((previous) => {
      return previous.map((prev, prev_index) => {
        if (prev_index === index) {
          let qtyIncreased = parseInt(prev.qty) + 1;
          updateCartFn(item, qtyIncreased);
          return { ...prev, qty: parseInt(prev.qty) + 1 };
        } else {
          return prev;
        }
      });
    });
  };
  // counter decrement
  const handleChangeDecrement = (index, item) => {
    // setNum(e.target.value);
    setcartItems((previous) => {
      return previous.map((prev, prev_index) => {
        if (prev_index === index) {
          if (parseInt(prev.qty) == 1) {
            return prev;
          } else {
            let qtyDecreased = parseInt(prev.qty) - 1;
            updateCartFn(item, qtyDecreased);
            return { ...prev, qty: parseInt(prev.qty) - 1 };
          }
        } else {
          return prev;
        }
      });
    });
  };

  // update function from the cart
  const updateCartFn = async (item, qty) => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let product = item;
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}product/addtocart`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          product_id: product?.product_id,
          product_variant_id: product?.product_variant_id,
          customer_id: user ? user.customer_id : "",
          variant_msrp: product?.variant_msrp ? product?.variant_msrp : "",
          variant_store_price: product?.variant_store_price
            ? product?.variant_store_price
            : "",
          variant_sale_price: product?.variant_sale_price
            ? product?.variant_sale_price
            : "",
          variant_weight: product?.variant_weight
            ? product?.variant_weight
            : "",
          variant_unit: product?.variant_unit ? product?.variant_unit : "",
          qty: qty,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        getCartItemsFn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeFileFun = (e) => {
    let file = e.target.files[0];
    setrawFile(file);
  };
  // console.log(rawFile, "RAW");
  // console.log(previewUrl, "PREVIEW");

  useEffect(() => {
    if (!rawFile) {
      setpreviewUrl(null);
      return;
    }
    const objectURL = URL.createObjectURL(rawFile);
    setpreviewUrl(objectURL);
  }, [rawFile]);

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
  //       calculateTotalCartPrice(response?.data?.cart_products);
  //       setcartItems(response?.data?.cart_products);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // remove item from cart
  const removeItemFromCart = async (item) => {
    // console.log(item);
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let product = item;
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}product/cartproduct/delete`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          product_variant_id: product?.product_variant_id,
          customer_id: user ? user.customer_id : "",
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        getCartItemsFn();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // calculate item price
  const calculateItemPrice = (item) => {
    // console.log(item?.variant_sale_price)
    let price = item?.variant_sale_price ? item?.variant_sale_price : 0;
    let qty = item?.qty;
    return price * qty;
  };

  // // calculate total cart price
  // const calculateTotalCartPrice = (data) => {
  //   let price = 0;
  //   for (let i = 0; i < data.length; i++) {
  //     console.log(data[i]?.variant_sale_price);
  //     price += parseInt(data[i]?.variant_sale_price) * parseInt(data[i]?.qty);
  //   }
  //   settotalPrice(price);
  // };

  // console.log(cartItems, "cart items");

  // proceed to checkout button
  const proceedToCheckOutBtn = () => {
    let user = JSON.parse(localStorage.getItem("janz_medical_user"));
    if (!user) {
      closeRefRegisterModalandOpenLogin.current.click();
    } else {
      router.push("/checkout");
    }
  };

  // upload rx button
  const uploadRxButton = (item) => {
    let user = JSON.parse(localStorage.getItem("janz_medical_user"));
    if (!user) {
      closeRefRegisterModalandOpenLogin.current.click();
    } else {
      // router.push("/checkout");
      // console.log("yes starting uploading process");
      // uploadRfRef.current.click();
      const modal = uploadRfRef.current;
      modal.setAttribute("aria-hidden", "false");
      modal.classList.add("show");
      document.body.classList.add("modal-open");
      setrxSeclectedItem(item);
    }
  };
  const uploadRxButtonToApi = async () => {
    // console.log(rxSeclectedItem);
    if (!rawFile) {
      return;
    }
    try {
      let formdata = new FormData();
      formdata.append(
        "product_variant_id",
        rxSeclectedItem?.product_variant_id
      );
      formdata.append("rx_file", rawFile);
      formdata.append("rx_title", rx_title);

      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let token = localStorage.getItem("janz_medical_login_token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/rxupload`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formdata,
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        getCartItemsFn();
        const modal = uploadRfRef.current;
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        setrawFile(null);
        setpreviewUrl(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkSubscription = (item) => {
    return item?.is_subscription === "Y" ? true : false;
  };
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("janz_medical_user"));
    setloggedInUser(user);
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
  }, []);
  //
  // console.log(rawFile, "raw");
  // console.log(previewUrl, "prev");
  return (
    <>
      <Headerlanding></Headerlanding>
      <div className="">
        <Container>
          <div className="row">
            <div className="col-md-8">
              <h5 className="fs-22 fw-bold py-4">Shopping Cart</h5>
              <div className="rounded-2 shadow">
                <Table className="table-cartitems">
                  <colgroup>
                    <col width="60%" />
                    <col />
                  </colgroup>
                  <thead className="">
                    <tr className="px-3">
                      <th scope="col">Product</th>
                      <th scope="col">Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div>
                            <div
                              className="card mb-3 px-2 "
                              style={{ maxWidth: "540px" }}
                            >
                              <div className="g-0 d-flex">
                                <div
                                  className=""
                                  style={{
                                    maxWidth: "140px",
                                    minWidth: "140px",
                                  }}
                                >
                                  <Image
                                    className="img-fluid rounded-start"
                                    width={150}
                                    height={150}
                                    src={
                                      item?.mproduct?.product_image[0]
                                        ?.image_file
                                        ? `${process.env.NEXT_PUBLIC_MEDIA}${item?.mproduct?.product_image[0]?.image_file}`
                                        : no_image
                                    }
                                    alt="..."
                                  />
                                </div>
                                <div className="ms-3">
                                  <div className="">
                                    <h5
                                      className="card-title"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        if (item?.product_variant) {
                                          router.push(
                                            `/product_detail/cart_items/${item?.product_variant?.variant_permlink}`
                                          );
                                        }
                                      }}
                                    >
                                      {item?.mproduct?.product_name}
                                    </h5>
                                    <p>{item?.mproduct?.brand?.brand_name}</p>
                                    <p>
                                      <label className="form-check pb-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={checkSubscription(item)}
                                        />
                                        <span className="form-check-label">
                                          {
                                            item?.mproduct
                                              ?.subscription_description
                                          }
                                        </span>
                                      </label>
                                    </p>
                                    {/* <p>Color: White</p> */}
                                  </div>
                                </div>
                              </div>
                              {item?.mproduct?.rx_required?.toLowerCase() ==
                                "y" && (
                                <>
                                  {item?.product_variant?.rxdetails ? (
                                    <div className="file-import d-flex ai-center mt-10">
                                      <img
                                        src={`${process.env.NEXT_PUBLIC_MEDIA}${item?.product_variant?.rxdetails?.rx_file}`}
                                        style={{
                                          width: "40px",
                                          height: "30px",
                                          margin: "5px",
                                          marginRight: "10px",
                                        }}
                                        alt="doc"
                                      />
                                      <span style={{ marginRight: "auto" }}>
                                        {
                                          item?.product_variant?.rxdetails
                                            ?.rx_title
                                        }
                                      </span>
                                      {/* <label
                                        htmlFor="fileUpload2"
                                        className="mr-10"
                                      >
                                        <svg
                                          className="icon"
                                          style={{
                                            width: "18px",
                                            height: "18px",
                                          }}
                                        >
                                          <use href="#icon_edit"></use>
                                        </svg>
                                      </label> */}
                                      <button
                                        onClick={() => {
                                          setpreviewUrl(null);
                                          setrawFile(null);
                                        }}
                                      >
                                        <svg
                                          className="icon"
                                          style={{
                                            width: "20px",
                                            height: "20px",
                                          }}
                                        >
                                          <use href="#icon_fileclose"></use>
                                        </svg>
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
                                      <div>
                                        <span className="text-danger fw-bold">
                                          Missing RX
                                        </span>
                                      </div>
                                      <div
                                        className="w-auto"
                                        style={{ maxWidth: "140px" }}
                                      >
                                        <select
                                          className="form-select"
                                          aria-label="Default select example"
                                          id="rx_title"
                                          value={rx_title}
                                          onChange={(e) =>
                                            setrx_title(e.target.value)
                                          }
                                        >
                                          {/* <option selected>
                                          Upload My RX Now
                                        </option> */}
                                          <option value="I will send my prescription to JANZ">
                                            I will send my prescription to JANZ
                                          </option>
                                          <option value="My prescription is on file">
                                            My prescription is on file
                                          </option>
                                          <option value="Upload my RX now">
                                            Upload my RX now
                                          </option>
                                        </select>
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          // data-bs-target="#exampleModalToggleUpload"
                                          // data-bs-toggle="modal"
                                          onClick={() => uploadRxButton(item)}
                                        >
                                          Upload Rx
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>Covered with Insurance</td>
                        <td>
                          <div className="d-inline-flex shadow-allside mb-3">
                            <button
                              className="btn p-0 bg-grey rounded-0 mmwh-28"
                              type="button"
                              onClick={() => handleChangeDecrement(index, item)}
                              title="Minus"
                            >
                              <svg className="icon">
                                <use href="#icon_dash"></use>
                              </svg>
                            </button>
                            <input
                              type="text"
                              className="form-control rounded-0 mmw-36px p-0 text-center border-0"
                              aria-label=""
                              value={item?.qty}
                            />
                            <button
                              className="btn p-0 bg-grey rounded-0 mmwh-28"
                              type="button"
                              id="button-addon2"
                              onClick={() => handleChangeIncrement(index, item)}
                              title="Plus"
                            >
                              <svg className="icon">
                                <use href="#icon_plus"></use>
                              </svg>
                            </button>
                          </div>
                          <span
                            className="text-primary fs-12 d-block"
                            style={{ cursor: "pointer" }}
                            onClick={() => removeItemFromCart(item)}
                          >
                            Remove item
                          </span>
                          {/* <div>
                            <button
                              type="button"
                              className="btn btn-primary mt-2"
                              onClick={() => updateCartFn(item)}
                            >
                              Update
                            </button>
                          </div> */}
                        </td>
                        <td>${calculateItemPrice(item)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="col-md-4">
              <h5 className="fs-22 fw-bold py-4">
                {loggedInUser ? (
                  <>Customer ID: {loggedInUser?.customer_id}</>
                ) : (
                  ""
                )}
              </h5>
              <div className="bg-light px-3 py-3 rounded-2">
                <p className="fw-bold">Pricing Summary</p>
                <hr />
                <p>Apply Discount Coupon</p>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control bg-light me-3 w-75 r"
                  />
                  {discountApplied ? (
                    <button
                      type="button"
                      className="btn btn-green px-4 w-50 d-flex justify-content-center align-items-center"
                      onClick={() => setdiscountApplied(!discountApplied)}
                    >
                      <svg className="icon fs-22 me-2">
                        <use href="#icon_checkcoupan"></use>
                      </svg>
                      Applied
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-green px-4 w-50 d-flex justify-content-center align-items-center"
                      onClick={() => setdiscountApplied(!discountApplied)}
                    >
                      Apply
                    </button>
                  )}
                </div>
                <hr />
                <div className="d-flex pb-2">
                  <span>Subtotal ({cartItems?.length} Items)</span>
                  <span className="ms-auto">${totalPrice}</span>
                </div>
                {/* <div className="d-flex pb-2">
                  <span>Delivery Fees</span>
                  <span className="ms-auto">$40.00</span>
                </div> */}
                {/* <div className="d-flex text-green pb-2">
                  <span>Discount</span>
                  <span className="ms-auto">$40.00</span>
                </div> */}
                <hr />
                <div className="d-flex pb-2">
                  <span>Order Total</span>
                  <span className="ms-auto">${totalPrice}</span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary w-100 my-4"
                onClick={proceedToCheckOutBtn}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div
        className="modal fade"
        id="exampleModalToggleUpload"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        ref={uploadRfRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header pb-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  const modal = uploadRfRef.current;
                  modal.classList.remove("show");
                  modal.setAttribute("aria-hidden", "true");
                  document.body.classList.remove("modal-open");
                  setrawFile(null);
                  setpreviewUrl(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <h4 className="text-center pb-3 fs-22">Upload Rx</h4>
              <div className="upload-box p-3">
                <label className="drag-box input-file">
                  {/* <img src={uploader}></img> */}
                  <Image
                    className="img-fluid rounded-start"
                    width={80}
                    height={55}
                    src={uploader}
                    alt="..."
                  />
                  <input
                    type="file"
                    accept="image/jpeg,application/pdf"
                    id="fileUpload2"
                    onChange={handleChangeFileFun}
                  />
                  <span>
                    Drag and drop your image or <a href="">browse file</a> on
                    your computer
                  </span>
                </label>
              </div>
              <div className="d-block rounded-2 p-1 my-2">
                {previewUrl ? (
                  <div
                    className="file-import d-flex ai-center mt-10"
                    id="remove_${inputid}"
                  >
                    <img
                      src={previewUrl}
                      style={{
                        width: "40px",
                        height: "30px",
                        margin: "5px",
                        marginRight: "10px",
                      }}
                      alt="doc"
                    />
                    <span style={{ marginRight: "auto" }}>{rawFile?.name}</span>
                    <label htmlFor="fileUpload2" className="mr-10">
                      <svg
                        className="icon"
                        style={{ width: "18px", height: "18px" }}
                      >
                        <use href="#icon_edit"></use>
                      </svg>
                    </label>
                    <button
                      onClick={() => {
                        setpreviewUrl(null);
                        setrawFile(null);
                      }}
                    >
                      <svg
                        className="icon"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <use href="#icon_fileclose"></use>
                      </svg>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-1">
                <label
                  // htmlFor="fileUpload2"
                  className="button button-blue upload-btn w-100 py-2 fs-20"
                  onClick={() => uploadRxButtonToApi()}
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
