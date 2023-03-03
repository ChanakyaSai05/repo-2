import { useContext, useEffect, useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import Header from "../components/header";
import Asidebar from "../components/asidebar";
import Form from "react-bootstrap/Form";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Country, State, City } from "country-state-city";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Profiledetails() {
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const selectedUser = useSelector(selectUser);
  const [loginDetails, setloginDetails] = useState({
    current_password: "",
    new_password: "",
    new_password_confirm: "",
    verification_code: "",
  });
  const [validzip, setvalidzip] = useState({ error: false, message: "" });
  // Password validation
  const [passwordValidation, setpasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const [formdata, setformdata] = useState({
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    gender: "",
    "inline-radio-1": "",
    "inline-radio-2": "",
  });
  // console.log(formdata);

  const [editCancel, setEditCancel] = useState(false);
  const [numbereditCancel, setNumberEditCancel] = useState(false);
  const [formedit, setFormEdit] = useState(false);
  const [editform, setEditForm] = useState(false);
  //password rules
  const [showRules, setshowRules] = useState(false);

  // us states
  const [usStates, setusStates] = useState([]);
  // profile details
  const [profileDetails, setprofileDetails] = useState({
    name: "",
    address1: "",
    address2: "",
    apoFpo: "yes",
    addressType: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    unitBox: "",
    us_states: "",
    address_id: "0",
    primary: "",
  });
  // set profile add and edit address
  // add new address=true and edit new address=false
  const [addButtonClicked, setaddButtonClicked] = useState(false);
  // Address list
  const [addressList, setaddressList] = useState([]);
  // selected delete item
  const [selectedDeleteAddress, setselectedDeleteAddress] = useState({});

  const handleProfileDetails = (e) => {
    if (e.target.id === "zipCode") {
      // console.log("target");
      if (e.target.value.length > 5) {
        return;
      }
    }
    setprofileDetails({ ...profileDetails, [e.target.id]: e.target.value });
  };
  // console.log(profileDetails, "PROFILE DETAILS type address no");

  const editForm = (item) => {
    setprofileDetails({
      ...profileDetails,
      address_id: item?.address_id,
      address1: item?.address1 ? item?.address1 : "",
      address2: item?.address2 ? item?.address2 : "",
      addressType: item?.address_type ? item?.address_type : "",
      city: item?.city ? item?.city : "",
      name: item?.contact_name ? item?.contact_name : "",
      country: item?.country ? item?.country : "",
      phone: item?.phone ? item?.phone : "",
      state: item?.state ? item?.state : "",
      unitBox: item?.unit_box ? item?.unit_box : "",
      zipCode: item?.zip_code ? item?.zip_code : "",
      primary: item?.address_default === "1" ? "on" : "",
      apoFpo:
        item?.state === "AE" || item?.state === "AP" || item?.state === "AA"
          ? "no"
          : "yes",
    });
    setEditForm(true);
  };

  const [table, setTable] = useState([
    { id: 1, isShown: false },
    { id: 2, isShown: false },
    { id: 3, isShown: false },
    { id: 4, isShown: false },
  ]);
  const [tableDelete, setTableDelete] = useState(false);
  function handleClickOpen(item) {
    setselectedDeleteAddress(item);
    setTimeout(() => {
      setTableDelete(true);
    }, 100);
  }
  // console.log(selectedDeleteAddress, "selected delte address");
  let toggleClassOpen = tableDelete ? " show" : "";

  const [btnState, setBtnState] = useState(false);

  let toggleClassCheck = btnState ? " show" : "";

  const [formShow, setFormShow] = useState(false);
  function handleClickForm() {
    setFormShow((formShow) => !btnState);
  }
  let toggleClassForm = btnState ? " show-form" : "";

  const handleFormData = (e) => {
    // console.log(e.target.checked);
    if (e.target.id == "inline-radio-1") {
      setformdata({
        ...formdata,
        "inline-radio-1": "on",
        "inline-radio-2": "off",
        gender: "male",
      });
    } else if (e.target.id == "inline-radio-2") {
      setformdata({
        ...formdata,
        "inline-radio-1": "off",
        "inline-radio-2": "on",
        gender: "female",
      });
    } else {
      setformdata({
        ...formdata,
        [e.target.id]: e.target.value,
      });
    }
  };

  // console.log(formdata, "formdata");

  const mouseEnterFn = (show) => {
    setTable((cate) =>
      cate.map((item, index) => {
        if (item.id === show.id) {
          return { ...item, isShown: true };
        } else {
          return item;
        }
      })
    );
  };

  const mouseLeaveFn = (show) => {
    setTable((cate) =>
      cate.map((item, index) => {
        if (item.id === show.id) {
          return { ...item, isShown: false };
        } else {
          return item;
        }
      })
    );
  };

  const phoneNumberSaveButton = () => {
    setNumberEditCancel(!numbereditCancel);
  };

  //
  const addressSaveButton = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/address/update`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          address_id: parseInt(profileDetails.address_id),
          address_default: profileDetails.primary === "on" ? 1 : 0,
          contact_name: profileDetails.name,
          address1: profileDetails.address1,
          address2: profileDetails.address2,
          address_type: profileDetails.addressType,
          unit_box: profileDetails.unitBox,
          state: profileDetails.state,
          country: profileDetails.country,
          city: profileDetails.city,
          zip_code: profileDetails.zipCode,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
        console.log("Error");
      } else {
        // console.log(response.data);
        setEditForm(false);
        setprofileDetails({
          name: "",
          address1: "",
          address2: "",
          apoFpo: "yes",
          addressType: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          unitBox: "",
          us_states: "",
          address_id: "0",
          primary: "",
        });
        getAddressList();
        // alert("Success");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  //get address list
  const getAddressList = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/address`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
        console.log("Error");
      } else {
        // console.log(response.data);
        setaddressList(response.data.address);
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };

  async function handleClick(e) {
    e.preventDefault();
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}password/resset`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: user.email,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        alert("otp sent to your email");
        setBtnState((btnState) => !btnState);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Resend code button
  async function resendCodeBtn(e) {
    e.preventDefault();
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}password/resset`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: user.email,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        alert("otp sent to your email");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const nameSaveButton = async () => {
    try {
      const token = localStorage.getItem("janz_medical_login_token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/profile`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          first_name: formdata.first_name,
          last_name: formdata.last_name,
          gender: formdata.gender,
          phone: formdata.phone,
        },
      });
      // console.log(response, "response");
      if (response.status == "200") {
        localStorage.setItem(
          "janz_medical_user",
          JSON.stringify(response?.data?.user)
        );
        alert("Profile updated successfully");
      } else {
        alert("Error");
        console.log(error);
      }
    } catch (error) {
      alert("Error");
      console.log(error);
    }
    setEditCancel(!editCancel);
  };
  const checkDisbledCreateAccountBtn = async () => {
    const isValid = Object.values(passwordValidation).every(
      (val) => val === true
    );
    // console.log(isValid, "IS VALID");
    return isValid;
  };
  // Login details onchnage
  const loginDetailsChangeFn = (e) => {
    if (e.target.id === "new_password") {
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
  // console.log(loginDetails, "LOGIN DETAILS");
  // console.log(passwordValidation, "PASSWORD VALIDATION");
  const resetPasswordLoginBtn = async (e) => {
    e.preventDefault();
    if (
      loginDetails.current_password === "" ||
      loginDetails.new_password === "" ||
      loginDetails.new_password_confirm === ""
    ) {
      return;
    }
    if (loginDetails.current_password === loginDetails.new_password) {
      alert("Password is same as current password");
      return;
    }
    if (loginDetails.new_password !== loginDetails.new_password_confirm) {
      alert("Password not matched");
      return;
    }
    let isValid = checkDisbledCreateAccountBtn();
    if (!isValid) {
      alert("Password must follow all rules as specified");
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
      let encryptedCurrent_Password = CryptoJS.AES.encrypt(
        JSON.stringify(loginDetails.current_password),
        key,
        {
          format: CryptoJSAesJson,
        }
      ).toString();
      let encryptedNew_Password = CryptoJS.AES.encrypt(
        JSON.stringify(loginDetails.new_password),
        key,
        {
          format: CryptoJSAesJson,
        }
      ).toString();

      encryptedCurrent_Password = JSON.parse(encryptedCurrent_Password);
      encryptedNew_Password = JSON.parse(encryptedNew_Password);
      const token = localStorage.getItem("janz_medical_login_token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/password/change`,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
        data: {
          current_password: {
            ct: encryptedCurrent_Password.ct,
            iv: encryptedCurrent_Password.iv,
            s: encryptedCurrent_Password.s,
          },
          new_password: {
            ct: encryptedNew_Password.ct,
            iv: encryptedNew_Password.iv,
            s: encryptedNew_Password.s,
          },
          verify_code: loginDetails.verification_code,
        },
      });
      // console.log(response, "result");
      if (response.data.status != false) {
        setBtnState((btnState) => !btnState);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // delete item from the table
  const deleteItemFromTable = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");
      // console.log(insurnace_id);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/address/delete`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          address_id: selectedDeleteAddress.address_id,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
        console.log("Error");
      } else {
        // console.log(response.data);
        setTableDelete(false);
        getAddressList();
        // alert("Success");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  // // Use effect
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    let states = State.getStatesOfCountry("US");
    setusStates(states);
    getAddressList();
    let user = JSON.parse(localStorage.getItem("janz_medical_user"));
    // console.log(user);
    setformdata({
      ...formdata,
      first_name: user?.customer_first_name ? user?.customer_first_name : "",
      last_name: user?.customer_last_name ? user?.customer_last_name : "",
      gender: user?.gender ? user?.gender : "",
      phone: user?.phone ? user?.phone : "",
      email: user?.email ? user?.email : "",
      "inline-radio-1": user?.gender
        ? user?.gender.toLowerCase() == "male"
          ? "on"
          : "off"
        : "off",
      "inline-radio-2": user?.gender
        ? user?.gender.toLowerCase() == "female"
          ? "on"
          : "off"
        : "off",
    });
  }, []);
  useEffect(() => {
    let { state, zipCode } = profileDetails;
    if (zipCode.length == 0) {
      setvalidzip({ ...validzip, error: false });
      return;
    }
    let zipArr = zipCode.split("");
    if (state === "AE") {
      // setprofileDetails({ ...profileDetails, zipCode: "09" });
      if (zipArr[0] != "0" || zipArr[1] != "9" || zipArr.length > 5) {
        setvalidzip({ error: true, message: "Please Enter valid zip code" });
      } else {
        setvalidzip({ error: false, message: "" });
      }
    }
    if (state === "AP") {
      // setprofileDetails({ ...profileDetails, zipCode: "962" });
      zipArr[0] != "9" ||
      zipArr[1] != "6" ||
      zipArr[2] != "2" ||
      zipArr.length > 6
        ? setvalidzip({ error: true, message: "Please Enter valid zip code" })
        : setvalidzip({ error: false, message: "" });
    }
    if (state === "AA") {
      // setprofileDetails({ ...profileDetails, zipCode: "340" });
      if (
        zipArr[0] != "3" ||
        zipArr[1] != "4" ||
        zipArr[2] != "0" ||
        zipArr.length > 6
      ) {
        setvalidzip({ error: true, message: "Please Enter valid zip code" });
      } else {
        setvalidzip({ error: false, message: "" });
      }
    }
  }, [profileDetails.state, profileDetails.zipCode]);

  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
  }, []);
  return (
    <>
      <Header></Header>
      <Asidebar></Asidebar>
      <div className="wrapper">
        <div className="row">
          <div className="col text-center py-4">
            <h2>Profile Details</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-8">
            <div className="row">
              <div className="col-auto">
                <h5 className="small-heading">Profile Details</h5>
              </div>
              <div className="col-auto ms-auto">
                {editCancel ? (
                  <button
                    className="border-btn"
                    onClick={() => setEditCancel(!editCancel)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="border-btn"
                    onClick={() => setEditCancel(!editCancel)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div className="row pb-4">
              <div className="col-sm-6">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  value={formdata.first_name}
                  disabled={!editCancel}
                  onChange={handleFormData}
                  className="form-control"
                  id="first_name"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formdata.last_name}
                  disabled={!editCancel}
                  onChange={handleFormData}
                  className="form-control"
                  id="last_name"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="mb-4">
                  <label htmlFor="inputGender">Your Gender</label>
                  <Form>
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Male"
                          name="group1"
                          type={type}
                          id={`inline-${type}-1`}
                          disabled={!editCancel}
                          onChange={handleFormData}
                          checked={
                            formdata["inline-radio-1"] == "on" ? true : false
                          }
                          // value={gender}
                        />
                        <Form.Check
                          inline
                          label="Female"
                          name="group1"
                          type={type}
                          id={`inline-${type}-2`}
                          disabled={!editCancel}
                          onChange={handleFormData}
                          checked={
                            formdata["inline-radio-2"] == "on" ? true : false
                          }
                        />
                      </div>
                    ))}
                  </Form>
                </div>
                <div className="mb-4">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="number"
                    value={formdata.phone}
                    disabled={!editCancel}
                    onChange={handleFormData}
                    className="form-control"
                    id="phone"
                  />
                </div>
                {editCancel && (
                  <div className="pb-3">
                    <button
                      typeof="button"
                      className="button button-default"
                      onClick={() => setEditCancel(!editCancel)}
                    >
                      Cancel
                    </button>
                    <button
                      typeof="button"
                      className="button button-blue px-3 mx-4"
                      onClick={nameSaveButton}
                    >
                      Save
                    </button>
                  </div>
                )}
                <div className="mb-4">
                  <label className="form-label">Email address (username)</label>
                  <input
                    type="email"
                    value={formdata.email}
                    onChange={handleFormData}
                    className="form-control"
                    id="email"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <button className="border-btn my-2" onClick={handleClick}>
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h5 className="small-heading py-3">My addresses</h5>
        {editform && (
          <div className="edit-form-box">
            <h6>{addButtonClicked ? "Add" : "Edit"} address</h6>
            <div className="row">
              <div className="col-md-6">
                <Form>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Primary"
                      name="primary"
                      type="radio"
                      id="primary"
                      checked={profileDetails?.primary === "on"}
                      onClick={() => {
                        setprofileDetails({
                          ...profileDetails,
                          primary: profileDetails.primary === "on" ? "" : "on",
                        });
                      }}
                    />
                  </div>
                  <div className="mb-3 w-100">
                    <label htmlFor="exampleInputName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      value={profileDetails.name}
                      className="form-control"
                      id="name"
                      onChange={handleProfileDetails}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
                      Address 01
                    </label>
                    <input
                      type="text"
                      value={profileDetails.address1}
                      className="form-control"
                      id="address1"
                      onChange={handleProfileDetails}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
                      Address 02
                    </label>
                    <input
                      type="text"
                      value={profileDetails.address2}
                      className="form-control"
                      id="address2"
                      onChange={handleProfileDetails}
                    />
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <span className="me-2">Do you use APO/FPO Address?</span>
                    {["radio"].map((type) => (
                      <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                          inline
                          label="Yes"
                          name="group4"
                          type={type}
                          id={`inline-${type}-4`}
                          onClick={() => {
                            setprofileDetails({
                              ...profileDetails,
                              apoFpo: "yes",
                              state: "",
                              country: "",
                            });
                          }}
                          checked={profileDetails.apoFpo === "yes"}
                        />
                        <Form.Check
                          inline
                          label="No"
                          name="group4"
                          type={type}
                          id={`inline-${type}-5`}
                          onClick={() => {
                            setprofileDetails({
                              ...profileDetails,
                              apoFpo: "no",
                              state: "AE",
                              unitBox: "",
                            });
                          }}
                          checked={profileDetails.apoFpo === "no"}
                        />
                      </div>
                    ))}
                  </div>
                  {profileDetails.apoFpo === "no" ? (
                    <div className="yes-btn-show">
                      <div className="mb-3 d-flex justify-content-between">
                        <span>Address Type</span>
                        {["radio"].map((type) => (
                          <div key={`inline-${type}`} className="mb-3">
                            <Form.Check
                              inline
                              label="APO"
                              name="group5"
                              type={type}
                              id="addressType"
                              onClick={() =>
                                setprofileDetails({
                                  ...profileDetails,
                                  addressType: "APO",
                                })
                              }
                              checked={profileDetails.addressType === "APO"}
                            />
                            <Form.Check
                              inline
                              label="FPO"
                              name="group5"
                              type={type}
                              id="addressType"
                              onClick={() =>
                                setprofileDetails({
                                  ...profileDetails,
                                  addressType: "FPO",
                                })
                              }
                              checked={profileDetails.addressType === "FPO"}
                            />
                            <Form.Check
                              inline
                              label="DPO"
                              name="group5"
                              type={type}
                              id="addressType"
                              onClick={() =>
                                setprofileDetails({
                                  ...profileDetails,
                                  addressType: "DPO",
                                })
                              }
                              checked={profileDetails.addressType === "DPO"}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleInputBox" className="form-label">
                          Unit/Box #
                        </label>
                        <input
                          type="text"
                          value={profileDetails.unitBox}
                          className="form-control"
                          id="unitBox"
                          onChange={handleProfileDetails}
                        />
                      </div>
                      <div className="mb-3 form-group">
                        <label for="exampleFormControlSelect1">State</label>
                        <select
                          className="form-control"
                          id="state"
                          value={profileDetails.state}
                          onChange={handleProfileDetails}
                        >
                          {["AE", "AP", "AA"].map((item, index) => (
                            <option key={index}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputCountry"
                          className="form-label"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          value={profileDetails.country}
                          className="form-control"
                          id="country"
                          onChange={handleProfileDetails}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputZipcode"
                          className="form-label"
                        >
                          ZIP Code
                        </label>
                        <input
                          type="number"
                          value={profileDetails.zipCode}
                          className="form-control"
                          id="zipCode"
                          maxLength="5"
                          // pattern="\d{5}"
                          onChange={handleProfileDetails}
                        />
                      </div>
                      {validzip.error && (
                        <p
                          className="pb-1 text-danger"
                          style={{ paddingLeft: "10px" }}
                        >
                          {validzip.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="no-btn-show">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputCity"
                          className="form-label"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          value={profileDetails.city}
                          className="form-control"
                          id="city"
                          onChange={handleProfileDetails}
                        />
                      </div>
                      <div className="mb-3 form-group">
                        <label for="exampleFormControlSelect1">State</label>
                        <select
                          className="form-control"
                          id="state"
                          value={profileDetails.state}
                          onChange={handleProfileDetails}
                        >
                          <option value="">Select state</option>
                          {usStates?.map((item, index) => (
                            <>
                              <option value={item?.name}>{item?.name}</option>
                            </>
                          ))}
                        </select>
                      </div>
                      {/* <div className="mb-3">
                                      <label
                                        htmlFor="exampleInputCountry"
                                        className="form-label"
                                      >
                                        Country
                                      </label>
                                      <input
                                        type="text"
                                        value="abc"
                                        className="form-control"
                                        id="exampleInputCountry"
                                      />
                                    </div> */}
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputZipcode"
                          className="form-label"
                        >
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={profileDetails.zipCode}
                          className="form-control"
                          id="zipCode"
                          maxLength="5"
                          onChange={handleProfileDetails}
                        />
                      </div>
                    </div>
                  )}
                  <div className="d-flex justify-content-between ms-0">
                    <button
                      className="button button-default same-btn delete ml-10"
                      onClick={() => {
                        setEditForm(false);
                        setprofileDetails({
                          name: "",
                          address1: "",
                          address2: "",
                          apoFpo: "yes",
                          addressType: "",
                          city: "",
                          state: "",
                          country: "",
                          zipCode: "",
                          unitBox: "",
                          us_states: "",
                          address_id: "0",
                          primary: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="button button-blue same-btn mr-10"
                      onClick={() => {
                        setprofileDetails({
                          ...profileDetails,
                          address_id: "0",
                        });
                        addressSaveButton();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-12">
            <div className="address-tbl1 card border-0">
              {/* <div className="card-header bg-white border-0 p-3">
                <h6>Primary</h6>
              </div> */}
              <div className="card-body pt-0">
                {
                  <Table responsive>
                    <colgroup>
                      <col width="35%" />
                      <col />
                      <col width="56" />
                    </colgroup>
                    <tbody>
                      {addressList?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            {item?.address_default === "1" && (
                              <strong style={{ textDecoration: "underline" }}>
                                Primary
                              </strong>
                            )}
                            <br />
                            {item?.contact_name}
                          </td>
                          <td>
                            {item?.address1}, {item?.address2} , {item?.city},
                            {item?.state}, {item?.zip_code}
                          </td>
                          <td>
                            <Dropdown className="dots-dropdown">
                              <Dropdown.Toggle
                                as="button"
                                className="btn"
                                id="dropdown-basic"
                              >
                                <svg className="icon">
                                  <use href="#icon_threedot"></use>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="shadow mmw-96px dropdown-menu-end">
                                <Dropdown.Item
                                  as="button"
                                  className="border-bottom"
                                  onClick={() => {
                                    editForm(item);
                                    setaddButtonClicked(false);
                                  }}
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={() => handleClickOpen(item)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 py-4">
          <button
            typeof="button"
            className="button button-blue w-100 p-3 fs-20"
            onClick={() => {
              setprofileDetails({
                name: "",
                address1: "",
                address2: "",
                apoFpo: "yes",
                addressType: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
                unitBox: "",
                us_states: "",
                address_id: "0",
                primary: "",
              });
              setaddButtonClicked(true);
              setEditForm(true);
            }}
          >
            <span className="plus-icon">
              <svg className="icon">
                <use href="#icon_btnadd"></use>
              </svg>
            </span>
            Add New Address
          </button>
        </div>

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
                <div className="pop-close d-flex text-white">
                  <div className="w-100 align-self-center text-center mx-auto">
                    <strong>Reset Password</strong>
                  </div>
                  <button
                    className="pop-btn ms-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      setBtnState((btnState) => !btnState);
                      setshowRules(false);
                    }}
                  >
                    <span>
                      <svg className="icon m-icon">
                        <use href="#icon_close-btn"></use>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPws1" className="form-label">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="current_password"
                    // autoComplete="current-password"
                    value={loginDetails.current_password}
                    onChange={loginDetailsChangeFn}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPws2" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="new_password"
                    // autoComplete="current-password"
                    value={loginDetails.new_password}
                    onChange={loginDetailsChangeFn}
                    onFocus={() => setshowRules(true)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPws3" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="new_password_confirm"
                    // autoComplete="current-password"
                    value={loginDetails.new_password_confirm}
                    onChange={(e) =>
                      setloginDetails({
                        ...loginDetails,
                        new_password_confirm: e.target.value,
                      })
                    }
                  />
                </div>
                {showRules && (
                  <div className="mb-2">
                    <div className="reset-tick-box">
                      <span>
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
                    <div className="reset-tick-box">
                      <span>
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
                    <div className="reset-tick-box">
                      <span>
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
                    <div className="reset-tick-box">
                      <span>
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
                    <div className="reset-tick-box">
                      <span>
                        <svg className="icon">
                          {passwordValidation.special == true ? (
                            <use href="#icon_green-tick"></use>
                          ) : (
                            <use href="#icon_wrong-tick"></use>
                          )}
                        </svg>
                      </span>
                      <span>
                        Atleast One Special Character (! @ # $ % ^ & % * ? _ ~)
                      </span>
                    </div>
                  </div>
                )}
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail" className="form-label">
                    Verification Code
                  </label>
                  <input
                    type="email"
                    placeholder="Enter code sent to your email"
                    className="form-control"
                    id="verification_code"
                    value={loginDetails.verification_code}
                    onChange={(e) =>
                      setloginDetails({
                        ...loginDetails,
                        verification_code: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="reset-btn">
                  <button typeof="button" onClick={resendCodeBtn}>
                    Resend Code
                  </button>
                </div>
                <div className="reset-btn-box">
                  <button
                    typeof="button"
                    className="button button-blue"
                    onClick={resetPasswordLoginBtn}
                  >
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
                  onClick={() => {
                    setTableDelete(false);
                    setselectedDeleteAddress({});
                  }}
                >
                  Cancel
                </button>
                <button
                  className="button button-default same-btn delete ml-10"
                  onClick={deleteItemFromTable}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
