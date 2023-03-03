import { useContext, useEffect, useState } from "react";
import Header from "../components/header";
import Asidebar from "../components/asidebar";
import Image from "next/image";
import breastPump from "../public/images/breast-pump.svg";
import no_image from "../public/images/no_image.jpg";
import breastPumpMeter from "../public/images/breast-pump-meter.svg";
import UserContext from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, set_data_fetched } from "../features/userSlice";
import axios from "axios";
import { getOrderedItems } from "../components/FunctionCalls";

export default function Myorder() {
  // const [publicPath] = useState(process.env.NEXT_PUBLIC_URL);
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const selectedUser = useSelector(selectUser);
  const [editCancel, setEditCancel] = useState(false);
  const [numbereditCancel, setNumberEditCancel] = useState(false);
  const [formedit, setFormEdit] = useState(false);
  const [editform, setEditForm] = useState(false);
  const [allOrderedItems, setallOrderedItems] = useState([]);
  const editForm = (item) => {
    setEditForm(!editform);
  };
  const selectedItems = useSelector(selectUser);
  console.log(selectedItems, "slectedItem");
  const dispatch = useDispatch();

  const [table, setTable] = useState([
    { id: 1, isShown: false },
    { id: 2, isShown: false },
    { id: 3, isShown: false },
    { id: 4, isShown: false },
  ]);
  const [tableDelete, setTableDelete] = useState(false);
  function handleClickOpen() {
    setTableDelete((tableDelete) => !tableDelete);
  }
  let toggleClassOpen = tableDelete ? " show" : "";

  const [btnState, setBtnState] = useState(false);
  function handleClick() {
    setBtnState((btnState) => !btnState);
  }
  let toggleClassCheck = btnState ? " show" : "";

  const [formShow, setFormShow] = useState(false);
  function handleClickForm() {
    setFormShow((formShow) => !btnState);
  }
  let toggleClassForm = btnState ? " show-form" : "";

  // console.log(allOrderedItems, "allorders");
  // get orders
  const getOrderedDate = (ordered_date) => {
    if (ordered_date) {
      const dateString = ordered_date;

      const date = new Date(dateString);

      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return formattedDate;
    }

    return "";
  };

  const callingGetOrdersFunction = async () => {
    const result = await getOrderedItems();
    dispatch(
      set_data_fetched({
        orderedItems: result,
        ordered_items_fetched: true,
      })
    );
  };
  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
    if (!selectedUser.ordered_items_fetched) {
      callingGetOrdersFunction();
    }
  }, []);

  return (
    <>
      <Header></Header>
      <Asidebar></Asidebar>
      <div className="wrapper pb-2">
        <div className="row">
          <div className="col text-center py-4">
            <h2>Order History</h2>
          </div>
        </div>
        {selectedUser?.orderedItems?.map((order, order_index) => (
          <div className="row mb-4 " key={order_index}>
            <div className="col-12">
              <div className="card border-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col">
                      <div className="d-sm-flex align-items-end align-items-center">
                        <h5 className="pe-3">Order#{order?.order_number}</h5>
                        <small className="opacity-75">
                          {getOrderedDate(order?.created_at)}
                        </small>
                      </div>
                    </div>
                    <div className="col-auto">
                      <h5>Total: ${order?.total_amount}</h5>
                    </div>
                    <div className="col-12">
                      <hr className="mt-2" />
                    </div>
                  </div>
                  {order?.order_product?.map(
                    (order_product, order_product_index) => (
                      <>
                        <div className="row" key={order_product_index}>
                          <div className="col-lg-5 col-sm-12">
                            <div className="d-flex">
                              <div className="order-imgbox">
                                <Image
                                  width={200}
                                  height={200}
                                  src={
                                    order_product?.product?.product_image[0]
                                      ?.image_file
                                      ? `${process.env.NEXT_PUBLIC_MEDIA}${order_product?.product?.product_image[0]?.image_file}`
                                      : no_image
                                  }
                                  alt="Breast Pump"
                                />
                              </div>
                              <div className="d-block align-self-center ps-3 ps-sm-4">
                                <h6>{order_product?.product?.product_name}</h6>
                                <ul className="list-inline mb-0 mt-3">
                                  <li className="list-inline-item pe-3">
                                    <strong className="me-2">SKU:</strong>
                                    <span>
                                      {order_product?.product?.product_sku}
                                    </span>
                                  </li>
                                  <li className="list-inline-item">
                                    <strong className="me-2">Qty:</strong>
                                    <span>{order_product?.qty}</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg col-sm-12 ">
                            <h6 className="mt-20px">
                              {order?.orderstatus?.status_name}
                            </h6>
                          </div>
                          <div className="col-lg-auto col-sm-12">
                            <div className="d-flex mt-20px mb-2">
                              <a className="text-primary fw-bold text-decoration-none">
                                <svg className="icon me-2">
                                  <use href="#icon_files"></use>
                                </svg>
                                <span className="text-decoration-underline">
                                  Upload Authorization\RX
                                </span>
                              </a>
                            </div>
                            <div className="d-flex">
                              <a className="text-danger fw-bold text-decoration-none">
                                <svg className="icon me-2">
                                  <use href="#icon_cancel"></use>
                                </svg>
                                <span className="text-decoration-underline">
                                  Cancel Order
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <br />
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Examples */}
        {/* <div className="row mb-4 ">
          <div className="col-12">
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="d-sm-flex align-items-end align-items-center">
                      <h5 className="pe-3">Order#100</h5>
                      <small className="opacity-75">November 15, 2022</small>
                    </div>
                  </div>
                  <div className="col-auto">
                    <h5>Total: $750.00</h5>
                  </div>
                  <div className="col-12">
                    <hr className="mt-2" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">
                    <div className="d-flex">
                      <div className="order-imgbox">
                        <Image
                          width={200}
                          height={200}
                          src={breastPump}
                          alt="Breast Pump"
                        />
                      </div>
                      <div className="d-block align-self-center ps-3 ps-sm-4">
                        <h6>Elive Stride Electic Breast Pump</h6>
                        <ul className="list-inline mb-0 mt-3">
                          <li className="list-inline-item pe-3">
                            <strong className="me-2">SKU:</strong>
                            <span>ES001-3</span>
                          </li>
                          <li className="list-inline-item">
                            <strong className="me-2">Qty:</strong>
                            <span>1</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-sm-12 ">
                    <h6 className="mt-20px">Processing</h6>
                  </div>
                  <div className="col-lg-auto col-sm-12">
                    <div className="d-flex mt-20px mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_files"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Upload Authorization\RX
                        </span>
                      </a>
                    </div>
                    <div className="d-flex">
                      <a className="text-danger fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_cancel"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Cancel Order
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4 ">
          <div className="col-12">
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="d-sm-flex align-items-end">
                      <h5 className="pe-3">Order#100</h5>
                      <small className="opacity-75">November 15, 2022</small>
                    </div>
                  </div>
                  <div className="col-auto">
                    <h5>Total: $750.00</h5>
                  </div>
                  <div className="col-12">
                    <hr className="mt-2" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">
                    <div className="d-flex">
                      <div className="order-imgbox">
                        <Image
                          width={200}
                          height={200}
                          src={breastPump}
                          alt="Breast Pump"
                        />
                      </div>
                      <div className="d-block align-self-center ps-3 ps-sm-4">
                        <h6>Elive Stride Electic Breast Pump</h6>
                        <ul className="list-inline mb-0 mt-3">
                          <li className="list-inline-item pe-3">
                            <strong className="me-2">SKU:</strong>
                            <span>ES001-3</span>
                          </li>
                          <li className="list-inline-item">
                            <strong className="me-2">Qty:</strong>
                            <span>1</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-sm-12 ">
                    <h6 className="mt-20px">Shipped</h6>
                  </div>
                  <div className="col-lg-auto col-sm-12">
                    <div className="d-flex mt-20px mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_location"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Track order
                        </span>
                      </a>
                    </div>
                    <div className="d-flex mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_files"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          View Authorization\RX
                        </span>
                      </a>
                    </div>
                    <div className="d-flex">
                      <a className="text-danger fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_cancel"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Cancel Order
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4 ">
          <div className="col-12">
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="d-sm-flex align-items-end">
                      <h5 className="pe-3">Order#100</h5>
                      <small className="opacity-75">November 15, 2022</small>
                    </div>
                  </div>
                  <div className="col-auto">
                    <h5>Total: $750.00</h5>
                  </div>
                  <div className="col-12">
                    <hr className="mt-2" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">
                    <div className="d-flex">
                      <div className="order-imgbox">
                        <Image
                          width={200}
                          height={200}
                          src={breastPump}
                          alt="Breast Pump"
                        />
                      </div>
                      <div className="d-block align-self-center ps-3 ps-sm-4">
                        <h6>Elive Stride Electic Breast Pump</h6>
                        <ul className="list-inline mb-0 mt-3">
                          <li className="list-inline-item pe-3">
                            <strong className="me-2">SKU:</strong>
                            <span>ES001-3</span>
                          </li>
                          <li className="list-inline-item">
                            <strong className="me-2">Qty:</strong>
                            <span>1</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-sm-12 ">
                    <h6 className="mt-20px text-primary">Delivered</h6>
                  </div>
                  <div className="col-lg-auto col-sm-12">
                    <div className="d-flex mt-20px mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_location"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Problem with order
                        </span>
                      </a>
                    </div>
                    <div className="d-flex mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_files"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          View Authorization\RX
                        </span>
                      </a>
                    </div>
                    <div className="d-flex mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_review"></use>
                        </svg>
                        <span
                          className="text-decoration-underline"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalCenter"
                        >
                          Rate & Review
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-4 ">
          <div className="col-12">
            <div className="card border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <div className="d-sm-flex align-items-end">
                      <h5 className="pe-3">Order#100</h5>
                      <small className="opacity-75">November 15, 2022</small>
                    </div>
                  </div>
                  <div className="col-auto">
                    <h5>Total: $750.00</h5>
                  </div>
                  <div className="col-12">
                    <hr className="mt-2" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-sm-12">
                    <div className="d-flex">
                      <div className="order-imgbox">
                        <Image
                          width={200}
                          height={200}
                          src={breastPumpMeter}
                          alt="Breast Pump"
                        />
                      </div>
                      <div className="d-block align-self-center ps-3 ps-sm-4">
                        <h6>Elive Stride Electic Breast Pump</h6>
                        <ul className="list-inline mb-0 mt-3">
                          <li className="list-inline-item pe-3">
                            <strong className="me-2">SKU:</strong>
                            <span>ES001-3</span>
                          </li>
                          <li className="list-inline-item">
                            <strong className="me-2">Qty:</strong>
                            <span>1</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg col-sm-12 ">
                    <h6 className="mt-20px text-danger text-decoration-underline">
                      Action Required
                    </h6>
                  </div>
                  <div className="col-lg-auto col-sm-12">
                    <div className="d-flex mt-20px mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_location"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Track order
                        </span>
                      </a>
                    </div>
                    <div className="d-flex mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_files"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          View Authorization\RX
                        </span>
                      </a>
                    </div>
                    <div className="d-flex mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_review"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Problem with order
                        </span>
                      </a>
                    </div>
                    <div className="d-flex mb-2">
                      <a className="text-primary fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_subscription"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Manage Subscription
                        </span>
                      </a>
                    </div>
                    <div className="d-flex">
                      <a className="text-danger fw-bold text-decoration-none">
                        <svg className="icon me-2">
                          <use href="#icon_cancel"></use>
                        </svg>
                        <span className="text-decoration-underline">
                          Cancel Order
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className={`modal ${toggleClassCheck}`}>
          <div className="popup-body">
            <form className="d-flex">
              <div className="reset-box-blue">
                <h5>Reset Password</h5>
                <h6>Your new password must:</h6>
                <ul>
                  <li>Be atleast 8 character length</li>
                  <li>Not be same as your current password</li>
                </ul>
              </div>
              <div className="reset-box-white">
                <div className="pop-close">
                  <button className="pop-btn " onClick={handleClick}>
                    <span>
                      <svg className="icon">
                        <use href="#icon_close-btn"></use>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPws" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPws"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPws" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPws"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPws" className="form-label">
                    Conform Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPws"
                  />
                </div>
                <div className="mb-2">
                  <div className="reset-tick-box">
                    <span>
                      <svg className="icon">
                        <use href="#icon_green-tick"></use>
                      </svg>
                    </span>
                    <span>Atleast 8 character</span>
                  </div>
                  <div className="reset-tick-box">
                    <span>
                      <svg className="icon">
                        <use href="#icon_green-tick"></use>
                      </svg>
                    </span>
                    <span>Atleast One Lower case</span>
                  </div>
                  <div className="reset-tick-box">
                    <span>
                      <svg className="icon">
                        <use href="#icon_wrong-tick"></use>
                      </svg>
                    </span>
                    <span>Atleast One Upper case</span>
                  </div>
                  <div className="reset-tick-box">
                    <span>
                      <svg className="icon">
                        <use href="#icon_green-tick"></use>
                      </svg>
                    </span>
                    <span>Atleast One Number</span>
                  </div>
                  <div className="reset-tick-box">
                    <span>
                      <svg className="icon">
                        <use href="#icon_wrong-tick"></use>
                      </svg>
                    </span>
                    <span>
                      Atleast One Special Character (! @ # $ % ^ & % * ? _ ~)
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Verification Code
                  </label>
                  <input
                    type="email"
                    placeholder="Enter code sent to your email"
                    className="form-control"
                    id="exampleInputEmail"
                  />
                </div>
                <div className="reset-btn">
                  <button typeof="button">Resend Code</button>
                </div>
                <div className="reset-btn-box">
                  <button typeof="button" className="button button-blue">
                    Reset Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={`modal ${toggleClassOpen}`}>
          <div className="popup-body-delete">
            <div className="pop-delete-box">
              <div className="delete-pop-icon py-20">
                <div className="pop-icon">
                  <svg className="icon">
                    <use href="#icon_popdelete"></use>
                  </svg>
                </div>
              </div>
              <h1 className="small-heading d-flex justify-content-center">
                Delete this record?
              </h1>
              <p className="gray py-20 d-flex justify-content-center">
                Do you want to really delete this records?
              </p>
              <div className="d-flex justify-content-center pb-20">
                <button
                  type="button"
                  className="button button-blue same-btn mr-10"
                  onClick={handleClickOpen}
                >
                  Cancel
                </button>
                <button className="button button-default same-btn delete ml-10">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-2"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg ">
            <div className="modal-content border-0 rounded-md-4 overflow-hidden">
              <div className="modal-body p-0">
                <div className="bg-primary py-2 px-4 d-block text-center d-md-none position-relative">
                  <button
                    type="button"
                    className="position-absolute top-50 end-0 translate-middle-y ms-3 close-btn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <svg className="icon">
                      <use href="#icon_loginclose"></use>
                    </svg>
                  </button>
                  <h5 className="text-white">Rating & Review</h5>
                </div>
                <button
                  type="button"
                  className="btn-close position-absolute d-none d-md-block end-0 top-0 me-3 mt-3"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <div className="row p-4" style={{ color: "#4D5059" }}>
                  <div className="col-12 text-center py-4 d-none d-sm-block">
                    <h3>Rate & Review The Product</h3>
                  </div>
                  <div className="d-flex col-md-12">
                    <div
                      className="d-flex rounded-3 align-items-center justify-content-center shadow"
                      style={{ width: "160px", height: "160px" }}
                    >
                      <Image
                        width={140}
                        height={140}
                        src={breastPump}
                        alt="Breast Pump"
                      />
                    </div>
                    <div className="d-block align-self-center ps-3 ps-sm-4">
                      <h5 className="">Elive Stride Electic Breast Pump</h5>
                      <p className="fs-18 fw-normal pt-3">Rate this product</p>
                      <div className="pb-3">
                        <svg className="icon text-primary me-3">
                          <use href="#icon_review"></use>
                        </svg>
                        <svg className="icon text-primary me-3">
                          <use href="#icon_review"></use>
                        </svg>
                        <svg className="icon text-primary me-3">
                          <use href="#icon_review"></use>
                        </svg>
                        <svg className="icon text-primary me-3">
                          <use href="#icon_review"></use>
                        </svg>
                        <svg className="icon text-primary me-3">
                          <use href="#icon_review"></use>
                        </svg>
                      </div>
                      <p className="fs-18 fw-normal">Rate this product</p>
                    </div>
                  </div>
                </div>
                <div className="row py-2 px-4">
                  <div className="col-lg-3 d-none d-sm-block">
                    <span className="py-1 px-2 border border-secondary rounded-1 me-2">
                      4.4
                      <svg className="icon text-primary ms-2">
                        <use href="#icon_review"></use>
                      </svg>
                    </span>
                    <span>152 Ratings</span>
                  </div>
                  <div className="col-lg-9 col-sm-12">
                    <div className="w-100">
                      <div class="input-group">
                        <textarea
                          class="form-control"
                          placeholder="Enter your review"
                          aria-label="With textarea"
                          style={{ height: "100px" }}
                        />
                      </div>
                      <div className="py-3 text-center text-md-end">
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-3"
                        >
                          Cancel
                        </button>
                        <button type="button" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
