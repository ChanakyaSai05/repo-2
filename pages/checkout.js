import React, { useEffect, useState, useRef, useContext } from "react";
import SignaturePad from "react-signature-pad";
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
import dayjs from "dayjs";
import Headerlanding from "../components/headerlanding";
import Form from "react-bootstrap/Form";
import uploader from "../public/images/uploader.svg";
import no_image from "../public/images/no_image.jpg";
import { useRouter } from "next/router";
import UserContext from "../context/UserContext";
// import csc from "country-state-city";
import { Country, State, City } from "country-state-city";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Checkout() {
  const context = useContext(UserContext);
  const {
    closeRefRegisterModalandOpenLogin,
    getCartItemsFn,
    cartItems,
    setcartItems,
    totalPrice,
    settotalPrice,
  } = context;
  const selectedUser = useSelector(selectUser);
  // us states
  const [usStates, setusStates] = useState([]);

  // Login open close
  const [loginUser, setloginUser] = useState(null);

  // address list
  const [addressList, setaddressList] = useState([]);
  // tax details
  const [taxDetails, settaxDetails] = useState({});

  // Router
  const router = useRouter();
  let sigPad = useRef();
  let data = "";
  const clear = () => {
    sigPad.current.clear();
  };
  const save = () => {
    data = sigPad.current.toDataURL();
    // console.log(data);
    // const link = document.createElement("a");
    // link.download = "signature.png";
    // link.href = data;
    // link.click();
  };

  const [editCancel, setEditCancel] = useState(false);
  const nameSaveButton = () => {
    setEditCancel(!editCancel);
  };

  const [editUserprofile, setEditUserprofile] = useState(true);
  const nameSaveButtonProfile = () => {
    setEditUserprofile(!editUserprofile);
  };

  const [formedit, setFormEdit] = useState(false);
  const [editform, setEditForm] = useState(false);

  // 5 states with one object
  const [profileStates, setprofileStates] = useState({
    user_login: true,
    user_profile: false,
    user_insurance: false,
    payment: false,
    order_summary: false,
  });
  const [profileStatesCompleted, setprofileStatesCompleted] = useState({
    user_login: true,
    user_profile: true,
    user_insurance: false,
    payment: false,
    order_summary: false,
  });

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
  // shipping address
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addButtonShippedClicked, setaddButtonShippedClicked] = useState(false);
  // billing address
  const [selectedAddressBilling, setSelectedAddressBilling] = useState(null);
  const [addButtonBillingClicked, setaddButtonBillingClicked] = useState(false);
  const [selectedInsurance, setselectedInsurance] = useState(null);
  const formRef = useRef(null);

  const [num, setNum] = useState(1);
  const [rawFile, setrawFile] = useState(null);
  const [rawFileOne, setrawFileOne] = useState(null);
  const [rawFileTwo, setrawFileTwo] = useState(null);
  const [previewUrl, setpreviewUrl] = useState(null);
  const [previewUrlOne, setpreviewUrlOne] = useState(null);
  const [previewUrlTwo, setpreviewUrlTwo] = useState(null);
  const [discountApplied, setdiscountApplied] = useState(false);
  const [rawFileRx, setrawFileRx] = useState(null);
  const [previewUrlRx, setpreviewUrlRx] = useState(null);
  const [rawFileSignature, setrawFileSignature] = useState(null);
  const [previewUrlSignature, setpreviewUrlSignature] = useState(null);
  const [rxSeclectedItem, setrxSeclectedItem] = useState({});
  const [documentsList, setdocumentsList] = useState({});

  // billing address checkbox
  const [billingAddressCheckBox, setbillingAddressCheckBox] = useState(false);
  // rx title
  const [rx_title, setrx_title] = useState(
    "I will send my prescription to JANZ"
  );
  //insurance details
  const [insuranceDetails, setinsuranceDetails] = useState({
    customer_insruance_id: "0",
    insurance_default: "",
    insurnace_id: "",
    birth_date: "",
    subscriber_id: "",
    policy_number: "",
    group_number: "",
    sponsor_first_name: "",
    sponsor_last_name: "",
    sponsor_ssn: "",
    sponsor_dbn: "",
    insurance_name: "",
  });
  const [insuranceList, setinsuranceList] = useState({});
  // upload rx ref
  const uploadRfRef = useRef();

  // close modal
  const billingModalRef = useRef();

  // close documents modal
  const closeDocumentsModal = useRef();
  // close signature modal
  const closeSignatureModal = useRef();
  const handleProfileDetails = (e) => {
    setprofileDetails({ ...profileDetails, [e.target.id]: e.target.value });
  };

  //
  const addressSaveButton = async (type) => {
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
        if (type === "normalAddress") {
          setEditCancel(false);
        } else if (type === "billingAddress") {
          billingModalRef.current.click();
        }
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
        let addressList = response.data.address;
        for (let i = 0; i < addressList.length; i++) {
          const element = addressList[i];
          if (element.address_default == 1) {
            setSelectedAddress(element);
            break;
          }
        }
        setaddressList(response.data.address);
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  // console.log(profileDetails, "PROFILE DETAILS type address no");

  const incNum = () => {
    if (num < 10) {
      setNum(Number(num) + 1);
    }
  };
  const decNum = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };
  const handleChange = (e) => {
    setNum(e.target.value);
  };

  // on click change login function
  const changeLoginBtn = () => {
    closeRefRegisterModalandOpenLogin.current.click();
  };

  const handleChangeFileFun = (e) => {
    let file = e.target.files[0];
    setrawFile(file);
  };
  const handleChangeFileFunOne = (e) => {
    let file = e.target.files[0];
    setrawFileOne(file);
  };
  const handleChangeFileFunTwo = (e) => {
    let file = e.target.files[0];
    setrawFileTwo(file);
  };
  const handleChangeFileFunRx = (e) => {
    let file = e.target.files[0];
    setrawFileRx(file);
  };
  const handleChangeFileFunSignature = (e) => {
    let file = e.target.files[0];
    setrawFileSignature(file);
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
  useEffect(() => {
    if (!rawFileOne) {
      setpreviewUrlOne(null);
      return;
    }
    const objectURL = URL.createObjectURL(rawFileOne);
    setpreviewUrlOne(objectURL);
  }, [rawFileOne]);

  useEffect(() => {
    if (!rawFileTwo) {
      setpreviewUrlTwo(null);
      return;
    }
    const objectURL = URL.createObjectURL(rawFileTwo);
    setpreviewUrlTwo(objectURL);
  }, [rawFileTwo]);
  useEffect(() => {
    if (!rawFileRx) {
      setpreviewUrlRx(null);
      return;
    }
    const objectURL = URL.createObjectURL(rawFileRx);
    setpreviewUrlRx(objectURL);
  }, [rawFileRx]);
  useEffect(() => {
    if (!rawFileSignature) {
      setpreviewUrlSignature(null);
      return;
    }
    const objectURL = URL.createObjectURL(rawFileSignature);
    setpreviewUrlSignature(objectURL);
  }, [rawFileSignature]);

  // Deliver here button
  const deliverHereBtn = () => {
    setprofileStates({
      ...profileStates,
      user_profile: !profileStates.user_profile,
      user_insurance: true,
    });
  };

  // Onclick userInsurance continue button
  const userInsuranceContinueButton = () => {
    setprofileStatesCompleted({
      ...profileStatesCompleted,
      user_insurance: true,
    });
    setprofileStates({ ...profileStates, payment: true });
  };
  // Onclick payment continue button
  const paymentContinueButton = () => {
    setprofileStatesCompleted({
      ...profileStatesCompleted,
      payment: true,
    });
    setprofileStates({ ...profileStates, order_summary: true });
  };
  // Onclick submit continue button
  const getIndividualTax = (item) => {
    let tax = taxDetails?.lines?.find(
      (tax_detail) => tax_detail?.description == item?.mproduct?.product_name
    )?.taxableAmount;

    if (tax) {
      return tax;
    } else {
      return 0;
    }
  };
  const SubmitContinueButton = async () => {
    // Pending
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let token = localStorage.getItem("janz_medical_login_token");

      let cart_items_sendToBackend = [];
      for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        let obj = {};
        obj["product_id"] = item?.product_id;
        obj["product_variant_id"] = item?.product_variant_id;
        obj["qty"] = item?.qty;
        obj["variant_msrp"] = item?.variant_msrp;
        obj["variant_store_price"] = item?.variant_store_price;
        obj["variant_sale_price"] = item?.variant_sale_price;
        obj["variant_weight"] = item?.variant_weight;
        obj["variant_unit"] = item?.variant_unit;
        obj["tax_code"] = "";
        obj["total_amount"] =
          parseInt(item?.qty) + parseInt(item?.variant_sale_price);
        // obj["tax_amount"] = getIndividualTax(item);
        obj["tax_amount"] = taxDetails?.lines[i]?.taxableAmount;
        obj["cash_amount"] = "0";
        obj["insurance_amount"] =
          parseInt(item?.qty) + parseInt(item?.variant_sale_price);
        cart_items_sendToBackend.push(obj);
      }
      console.log(
        cart_items_sendToBackend,
        "cart items need to send to backend"
      );
      let data = {
        bill_address_id: selectedAddress?.address_id,
        ship_address_id: selectedAddressBilling
          ? selectedAddressBilling?.address_id
          : selectedAddress?.address_id,
        total_qty: "5",
        coupon_code: "",
        total_amount: totalPrice,
        delivery_amount: totalPrice,
        discount_amount: "",
        tax_amount: taxDetails?.totalTax,
        cash_amount: "0",
        insurance_amount: totalPrice,
        remark: "this is test order",
        products: cart_items_sendToBackend,
      };
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/orderconfirm`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        // console.log(response, "order details");
        alert("Order successful");
        getCartItemsFn();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // user insurance change button
  const userInsuranceChangeButton = () => {
    setprofileStatesCompleted({
      ...profileStatesCompleted,
      user_insurance: false,
    });
  };
  // payment change button
  const paymentChangeButton = () => {
    setprofileStatesCompleted({
      ...profileStatesCompleted,
      payment: false,
    });
  };

  const handleCancelClick = (e) => {
    // console.log("hii");
    setEditCancel(false);
    // setTimeout(() => {
    //   e.preventDefault();
    // }, 0);
    // formRef.current.reset();
  };

  //address button checked
  const addressListHandleChange = (e, item) => {
    // console.log(e.target.checked);
    setSelectedAddress(item);
  };
  //address button checked
  const addressListHandleChangeBillingAddress = (e, item) => {
    // console.log(e.target.checked);
    setSelectedAddressBilling(item);
  };

  // address edit button
  const editButtonClickedFn = (item, type) => {
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
    if (type === "normalAddress") {
      setEditCancel(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // handle insurance details
  const handleInsuranceDetails = (e) => {
    setinsuranceDetails({ ...insuranceDetails, [e.target.id]: e.target.value });
  };

  // Insurance details
  const getInsuranceList = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");

      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/insurance`,
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
        let listAddedInsuranceName = response?.data?.customer_insurance?.map(
          (customer_insurance) => {
            let insurance_name = response?.data?.insurance?.find(
              (insurance_item) =>
                insurance_item?.insurance_id == customer_insurance?.insurnace_id
            )?.insurance_name;
            return { ...customer_insurance, insurance_name };
          }
        );
        let modifiedObj = {
          customer_insurance: listAddedInsuranceName,
          insurance: response?.data?.insurance,
        };
        let selectedInsurance = {};
        for (let i = 0; i < listAddedInsuranceName.length; i++) {
          if (listAddedInsuranceName[i]?.insurance_default == 1) {
            selectedInsurance = listAddedInsuranceName[i];
            break;
          }
        }
        if (Object.keys(selectedInsurance).length == 0) {
          setselectedInsurance(listAddedInsuranceName[0]);
        } else {
          setselectedInsurance(selectedInsurance);
        }
        setinsuranceList(modifiedObj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editForm = () => {
    let item = selectedInsurance;
    setinsuranceDetails({
      customer_insruance_id: item.customer_insruance_id,
      insurance_default: item.insurance_default == "1" ? "on" : "",
      insurnace_id: item.insurnace_id,
      birth_date: item.birth_date,
      subscriber_id: item.subscriber_id,
      policy_number: item.policy_number,
      group_number: item.group_number,
      sponsor_first_name: item.sponsor_first_name,
      sponsor_last_name: item.sponsor_last_name,
      sponsor_ssn: item.sponsor_ssn,
      sponsor_dbn: item.sponsor_dbn,
      insurance_name: item.insurance_name,
    });
    setEditUserprofile(false);
  };
  // console.log(addressList, "address list");
  // console.log(selectedAddress, "selected address");
  // console.log(insuranceDetails, "insurance list");
  // console.log(selectedInsurance, "selected insurance");
  // add insurance detials
  const addInsuranceDetails = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");
      let insurnace_id = selectedInsurance.insurnace_id;

      // console.log(insurnace_id);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/insurance/update`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          customer_insurance_id: insuranceDetails.customer_insruance_id,
          insurance_default:
            insuranceDetails.insurance_default === "on" ? 1 : 0,
          insurnace_id: insurnace_id,
          birth_date: insuranceDetails.birth_date,
          subscriber_id: insuranceDetails.subscriber_id,
          policy_number: insuranceDetails.policy_number,
          group_number: insuranceDetails.group_number,
          sponsor_first_name: insuranceDetails.sponsor_first_name,
          sponsor_last_name: insuranceDetails.sponsor_last_name,
          sponsor_ssn: insuranceDetails.sponsor_ssn,
          sponsor_dbn: insuranceDetails.sponsor_dbn,
          // insurance_name: insuranceDetails.insurance_name,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
        console.log("Error");
      } else {
        // console.log(response.data);
        setEditUserprofile(true);
        setinsuranceDetails({
          customer_insruance_id: "",
          insurance_default: "",
          insurnace_id: "",
          birth_date: "",
          subscriber_id: "",
          policy_number: "",
          group_number: "",
          sponsor_first_name: "",
          sponsor_last_name: "",
          sponsor_ssn: "",
          sponsor_dbn: "",
          insurance_name: "",
        });
        getInsuranceList();
        // alert("Success");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  // calculate item price
  const calculateItemPrice = (item) => {
    // console.log(item?.variant_sale_price)
    let price = item?.variant_sale_price ? item?.variant_sale_price : 0;
    let qty = item?.qty;
    return price * qty;
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
    if (!rawFileRx) {
      return;
    }
    try {
      let formdata = new FormData();
      formdata.append(
        "product_variant_id",
        rxSeclectedItem?.product_variant_id
      );
      formdata.append("rx_file", rawFileRx);
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
        setrawFileRx(null);
        setpreviewUrlRx(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
  // uploadSignature button
  const uploadSignatureBtnFn = async (type) => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let token = localStorage.getItem("janz_medical_login_token");
      let formdata = new FormData();
      formdata.append("insurance_id", selectedInsurance?.insurnace_id);
      if (type === "normalUpload") {
        formdata.append("customer_signature", rawFileSignature);
        const response = await axios({
          url: `${process.env.NEXT_PUBLIC_URL}customer/documentupload`,
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
          closeSignatureModal.current.click();
          sigPad.current.clear();
          getDocumentsList();
        }
      } else {
        let signature = sigPad.current.toDataURL();
        // console.log("I'm in else block", signature);

        fetch(signature)
          .then((res) => res.blob())
          .then(async (blob) => {
            const file = new File([blob], "signature.png", {
              type: "image/png",
            });
            // console.log(file); // This is your file object
            // Now you can do something with the file, like upload it to your server
            formdata.append("customer_signature", file);
            const response = await axios({
              url: `${process.env.NEXT_PUBLIC_URL}customer/documentupload`,
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
              closeSignatureModal.current.click();
              sigPad.current.clear();
              getDocumentsList();
            }
          })
          .catch((error) => console.error(error));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uploadDocumentsBtnFn = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let token = localStorage.getItem("janz_medical_login_token");
      let formdata = new FormData();
      formdata.append("insurance_id", selectedInsurance?.insurnace_id);
      formdata.append("customer_document_front", rawFileOne);
      formdata.append("customer_document_back", rawFileTwo);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/documentupload`,
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
        closeDocumentsModal.current.click();
        getDocumentsList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get documents list
  const getDocumentsList = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let token = localStorage.getItem("janz_medical_login_token");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/documentlist`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          insurance_id: selectedInsurance?.insurnace_id,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        // console.log(response, "documents list");
        setdocumentsList(response?.data?.document);
      }
    } catch (error) {
      console.log(error);
    }
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
  // const getTaxapi = async () => {
  //   try {
  //     let user = JSON.parse(localStorage.getItem("janz_medical_user"));
  //     let linesNeedToSend = [];
  //     const today = dayjs().format("YYYY-MM-DD");
  //     for (let i = 0; i < cartItems?.length; i++) {
  //       let item = cartItems[i];
  //       let obj = {};
  //       obj["number"] = i + 1;
  //       obj["quantity"] = item?.qty;
  //       obj["amount"] =
  //         parseInt(item?.qty) * parseInt(item?.variant_sale_price);
  //       obj["taxCode"] = "PS081282";
  //       obj["itemCode"] = item?.product_variant_id;
  //       obj["description"] = item?.mproduct?.product_name;
  //       linesNeedToSend.push(obj);
  //     }
  //     const newRandomNumber = Math.floor(Math.random() * 900) + 100;
  //     // const auth = btoa("milan@infiniticube.com:Jazn@268");
  //     const auth = Buffer.from("milan@infiniticube.com:Jazn@268").toString(
  //       "base64"
  //     );
  //     // headers
  //     var myHeaders = new Headers();
  //     myHeaders.append("Authorization", `Authorization: Basic ${auth}`);
  //     myHeaders.append("Content-Type", "application/json");
  //     // raw

  //     // var raw = JSON.stringify({
  //     //   lines: linesNeedToSend,
  //     //   type: "SalesInvoice",
  //     //   companyCode: "DEFAULT",
  //     //   date: today, //todays date
  //     //   customerCode: "10297", //p id //custumer detail
  //     //   purchaseOrderNo: `${today}-${newRandomNumber}`,
  //     //   addresses: {
  //     //     singleLocation: {
  //     // line1: selectedAddress?.address1 + " " + selectedAddress?.address2,
  //     // city:
  //     //   selectedAddress?.state == "AA" ||
  //     //   selectedAddress?.state == "AP" ||
  //     //   selectedAddress?.state == "AE"
  //     //     ? ""
  //     //     : selectedAddress?.city,
  //     // region: selectedAddress?.state,
  //     // country: selectedAddress?.country ? selectedAddress?.country : "",
  //     // postalCode: selectedAddress?.zip_code,
  //     //     },
  //     //   },
  //     //   commit: true,
  //     //   currencyCode: "USD",
  //     //   description: "Yarn",
  //     // });
  //     var raw = JSON.stringify({
  //       tax_request: {
  //         lines: linesNeedToSend,
  //         type: "SalesInvoice",
  //         companyCode: "DEFAULT",
  //         date: today,
  //         customerCode: "10297",
  //         purchaseOrderNo: `${today}-${newRandomNumber}`,
  //         addresses: {
  //           singleLocation: {
  //             line1:
  //               selectedAddress?.address1 + " " + selectedAddress?.address2,
  //             city:
  //               selectedAddress?.state == "AA" ||
  //               selectedAddress?.state == "AP" ||
  //               selectedAddress?.state == "AE"
  //                 ? ""
  //                 : selectedAddress?.city,
  //             region: selectedAddress?.state,
  //             country: selectedAddress?.country ? selectedAddress?.country : "",
  //             postalCode: selectedAddress?.zip_code,
  //           },
  //         },
  //         commit: true,
  //         currencyCode: "USD",
  //         description: "Yarn",
  //       },
  //     });

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "manual",
  //     };

  //     fetch(`${process.env.NEXT_PUBLIC_URL}product/check/tax`, requestOptions)
  //       .then((response) => response.text())
  //       .then((result) => console.log(result, "tax result"))
  //       .catch((error) => console.log("error", error));
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };
  const getTaxapi = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let linesNeedToSend = [];
      const today = dayjs().format("YYYY-MM-DD");
      for (let i = 0; i < cartItems?.length; i++) {
        let item = cartItems[i];
        let obj = {};
        obj["number"] = i + 1;
        obj["quantity"] = 1;
        obj["amount"] = parseInt(item?.variant_sale_price);
        obj["taxCode"] = "PS081282";
        obj["itemCode"] = item?.product_variant_id;
        obj["description"] = item?.mproduct?.product_name;
        linesNeedToSend.push(obj);
      }
      const newRandomNumber = Math.floor(Math.random() * 900) + 100;
      // const auth = btoa("milan@infiniticube.com:Jazn@268");
      const auth = Buffer.from("milan@infiniticube.com:Jazn@268").toString(
        "base64"
      );
      //       var myHeaders = new Headers();
      // myHeaders.append("Authorization", "Authorization: Basic aHR0cHdhdGNoOmY=");
      // myHeaders.append("Content-Type", "application/json");
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}product/check/tax`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
          "Access-Control-Allow-Origin": "*",
        },
        data: {
          tax_request: {
            lines: linesNeedToSend,
            type: "SalesInvoice",
            companyCode: "DEFAULT",
            date: today,
            customerCode: "10297",
            purchaseOrderNo: `${today}-${newRandomNumber}`,
            addresses: {
              singleLocation: {
                line1:
                  selectedAddress?.address1 + " " + selectedAddress?.address2,
                city:
                  selectedAddress?.state == "AA" ||
                  selectedAddress?.state == "AP" ||
                  selectedAddress?.state == "AE"
                    ? ""
                    : selectedAddress?.city,
                region: selectedAddress?.state,
                country: selectedAddress?.country
                  ? selectedAddress?.country
                  : "",
                postalCode: selectedAddress?.zip_code,
              },
            },
            commit: true,
            currencyCode: "USD",
            description: "Yarn",
          },
        },
      });
      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        // console.log(response, "tax response");
        settaxDetails(response?.data?.tax_details);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const calculateTotalPrice = () => {
    let price = totalPrice;
    if (taxDetails?.totalTax != null) {
      price += parseInt(taxDetails?.totalTax);
    }

    return price;
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("janz_medical_user"));
    setloginUser(user);
    getAddressList();
    getInsuranceList();
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
    getDocumentsList();
  }, []);
  useEffect(() => {
    let states = State.getStatesOfCountry("US");
    setusStates(states);
  }, []);

  return (
    <>
      <Headerlanding></Headerlanding>
      <div className="">
        <Container>
          <div className="row">
            <div className="col-md-8">
              <h5 className="fs-22 fw-bold py-4">Checkout</h5>
              <div className="card-shadow  p-4 d-flex align-items-center mb-4">
                <div className="d-flex">
                  <div className="me-4">
                    <svg className="icon fs-24">
                      <use href="#icon_greencheck"></use>
                    </svg>
                  </div>
                  <div className="">
                    <p className="fw-bold p-0 m-0">User Login</p>
                    <span>{loginUser?.email}</span>
                  </div>
                </div>
                <div className="ms-auto">
                  <button
                    type="button"
                    className="btn btn-default btn-outline-secondary px-4"
                    onClick={changeLoginBtn}
                  >
                    Change
                  </button>
                </div>
              </div>

              {/* user profile */}
              {profileStates.user_profile ? (
                <>
                  <div className="card-shadow  p-4 d-flex align-items-center mb-4">
                    <div className="d-flex">
                      <div className="me-4">
                        <svg className="icon fs-24">
                          <use href="#icon_greencheck"></use>
                        </svg>
                      </div>
                      <div className=" ">
                        <p className="fw-bold p-0 m-0">User Profile</p>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <div>{selectedAddress?.contact_name},</div>
                          <div>
                            {loginUser?.phone},&nbsp;{selectedAddress?.address1}
                            ,&nbsp;
                          </div>
                          <div>{selectedAddress?.address2},&nbsp;</div>
                          <div>{selectedAddress?.city},&nbsp;</div>
                          <div>{selectedAddress?.state},&nbsp;</div>
                          <div>{selectedAddress?.zip_code}</div>
                        </div>
                      </div>
                    </div>
                    <div className="ms-auto">
                      <button
                        type="button"
                        className="btn btn-default btn-outline-secondary px-4"
                        onClick={deliverHereBtn}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="card-shadow p-4 mb-4 position-relative">
                  <div className="d-flex pb-3">
                    <div className="me-4">
                      <div
                        className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                        style={{
                          width: "24px",
                          height: "24px",
                          background: "#D9D9D9",
                        }}
                      >
                        <span>02</span>
                      </div>
                    </div>
                    <div className="">
                      <p className="fw-bold p-0 m-0">User Profile</p>
                    </div>
                    <button
                      className="border-btn ms-auto text-primary"
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
                        setaddButtonShippedClicked(true);
                        setEditCancel(true);
                      }}
                    >
                      Add Address
                    </button>
                  </div>
                  <div className="d-flex">
                    <div className="">
                      {editCancel ? (
                        <div className="edit-form-box">
                          <h6>
                            {addButtonShippedClicked ? "Add" : "Edit"} address
                          </h6>
                          <div className="row">
                            <div className="col">
                              <Form ref={formRef} onSubmit={handleSubmit}>
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
                                        primary:
                                          profileDetails.primary === "on"
                                            ? ""
                                            : "on",
                                      });
                                    }}
                                  />
                                </div>
                                <div className="mb-3 w-100">
                                  <label
                                    htmlFor="exampleInputName"
                                    className="form-label"
                                  >
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
                                  <label
                                    htmlFor="exampleInputAddress"
                                    className="form-label"
                                  >
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
                                  <label
                                    htmlFor="exampleInputAddress"
                                    className="form-label"
                                  >
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
                                  <span className="me-2">
                                    Do you use APO/FPO Address?
                                  </span>
                                  {["radio"].map((type) => (
                                    <div
                                      key={`inline-${type}`}
                                      className="mb-3"
                                    >
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
                                        checked={
                                          profileDetails.apoFpo === "yes"
                                        }
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
                                        <div
                                          key={`inline-${type}`}
                                          className="mb-3"
                                        >
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
                                            checked={
                                              profileDetails.addressType ===
                                              "APO"
                                            }
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
                                            checked={
                                              profileDetails.addressType ===
                                              "FPO"
                                            }
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
                                            checked={
                                              profileDetails.addressType ===
                                              "DPO"
                                            }
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    <div className="mb-3">
                                      <label
                                        htmlFor="exampleInputBox"
                                        className="form-label"
                                      >
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
                                      <label for="exampleFormControlSelect1">
                                        State
                                      </label>
                                      <select
                                        className="form-control"
                                        id="state"
                                        value={profileDetails.state}
                                        onChange={handleProfileDetails}
                                      >
                                        {["AE", "AP", "AA"].map(
                                          (item, index) => (
                                            <option key={index}>{item}</option>
                                          )
                                        )}
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
                                        type="text"
                                        value={profileDetails.zipCode}
                                        className="form-control"
                                        id="zipCode"
                                        onChange={handleProfileDetails}
                                      />
                                    </div>
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
                                      <label for="exampleFormControlSelect1">
                                        State
                                      </label>
                                      <select
                                        className="form-control"
                                        id="state"
                                        value={profileDetails.state}
                                        onChange={handleProfileDetails}
                                      >
                                        <option value="">Select state</option>
                                        {usStates?.map((item, index) => (
                                          <>
                                            <option value={item?.name}>
                                              {item?.name}
                                            </option>
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
                                        onChange={handleProfileDetails}
                                      />
                                    </div>
                                  </div>
                                )}
                                <div className="d-flex justify-content-between ms-0">
                                  <button
                                    className="button button-default same-btn delete ml-10"
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
                                      setEditCancel(false);
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
                                      addressSaveButton("normalAddress");
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </Form>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {addressList?.map((item, index) => (
                            <>
                              <div
                                className="position-absolute"
                                style={{ right: "25px" }}
                              >
                                {editCancel == true ? (
                                  <button
                                    className="border-btn text-primary"
                                    onClick={() => setEditCancel(false)}
                                  >
                                    Cancel
                                  </button>
                                ) : (
                                  <>
                                    {selectedAddress &&
                                      selectedAddress?.address_id ===
                                        item?.address_id && (
                                        <button
                                          className="border-btn text-primary"
                                          onClick={() => {
                                            setaddButtonShippedClicked(false);
                                            editButtonClickedFn(
                                              item,
                                              "normalAddress"
                                            );
                                          }}
                                        >
                                          Edit
                                        </button>
                                      )}
                                  </>
                                )}
                              </div>
                              <div class="form-check ">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  checked={
                                    selectedAddress &&
                                    selectedAddress?.address_id ===
                                      item?.address_id
                                      ? true
                                      : false
                                  }
                                  onChange={(e) =>
                                    addressListHandleChange(e, item)
                                  }
                                />
                                <div className="ms-4 ">
                                  <label
                                    class="form-check-label"
                                    for="flexRadioDefault1"
                                  >
                                    {item?.contact_name}
                                    <br />
                                    {loginUser?.phone}
                                    <br />
                                    <div
                                      style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <div>{item?.address1}</div>,
                                      <div>{item?.address2}</div>,
                                      <div>{item?.city}</div>,
                                      <div>{item?.state}</div>,
                                      <div>{item?.zip_code}</div>
                                    </div>
                                    {/* JANZ Corp <br /> 9876543210 <br /> Address
                                    1, Address 2, City, State, Zip code */}
                                  </label>
                                  <br />

                                  {selectedAddress &&
                                    selectedAddress?.address_id ===
                                      item?.address_id && (
                                      <button
                                        type="button"
                                        className="btn btn-primary px-4 mt-3"
                                        onClick={() => {
                                          getTaxapi();
                                          deliverHereBtn();
                                        }}
                                      >
                                        Deliver Here
                                      </button>
                                    )}
                                </div>
                              </div>
                              {selectedAddress &&
                                selectedAddress?.address_id ===
                                  item?.address_id && (
                                  <div className="d-flex  align-items-center pt-3 ">
                                    <span>
                                      <input
                                        class="form-check-input me-2"
                                        type="checkbox"
                                        id="inlineCheckbox1"
                                        onClick={() =>
                                          setbillingAddressCheckBox(
                                            !billingAddressCheckBox
                                          )
                                        }
                                      ></input>
                                    </span>
                                    <span>
                                      Billing address is different than shipping
                                      address
                                    </span>{" "}
                                    {billingAddressCheckBox && (
                                      <span
                                        style={{
                                          color: "#1A8CD1",
                                          cursor: "pointer",
                                          textDecoration: "underline",
                                        }}
                                        className="ms-3 fw-bold"
                                        data-bs-target="#exampleModalToggleBillingAddress"
                                        data-bs-toggle="modal"
                                      >
                                        Choose Billing Address
                                      </span>
                                    )}
                                  </div>
                                )}
                              <hr
                                style={{
                                  width: "815px",
                                  display:
                                    index === addressList.length - 1 && "none",
                                }}
                              />
                            </>
                          ))}
                        </>
                      )}
                    </div>
                    {/* <div
                      className="position-absolute"
                      style={{ right: "25px" }}
                    >
                      {editCancel ? (
                        <button
                          className="border-btn text-primary"
                          onClick={() => setEditCancel(!editCancel)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          className="border-btn text-primary"
                          onClick={() => setEditCancel(!editCancel)}
                        >
                          Edit
                        </button>
                      )}
                    </div> */}
                  </div>
                  {/* <hr /> */}
                </div>
              )}

              {/* user insurance */}
              {profileStates.user_insurance === false && (
                <div>
                  <div className="card-shadow p-4 d-flex mb-4">
                    <div className="me-4">
                      <div
                        className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                        style={{
                          width: "24px",
                          height: "24px",
                          background: "#D9D9D9",
                        }}
                      >
                        <span>03</span>
                      </div>
                    </div>
                    <div className="">
                      <p className="fw-bold p-0 m-0 text-secondary">
                        User Insurance
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {profileStates.user_insurance &&
                profileStatesCompleted.user_insurance === false && (
                  <div>
                    <div className="card-shadow p-4 mb-4">
                      <div className="d-flex pb-3">
                        <div className="me-4">
                          <div
                            className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                            style={{
                              width: "24px",
                              height: "24px",
                              background: "#D9D9D9",
                            }}
                          >
                            <span>03</span>
                          </div>
                        </div>
                        <div className="">
                          <p className="fw-bold p-0 m-0">User Profile</p>
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12 pb-2">
                        <label className="form-label fw-bold">
                          Choose your insurance
                        </label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={selectedInsurance?.insurance_name}
                          onChange={(e) => {
                            for (
                              let i = 0;
                              i < insuranceList?.customer_insurance?.length;
                              i++
                            ) {
                              if (
                                insuranceList?.customer_insurance[i]
                                  ?.insurance_name == e.target.value
                              ) {
                                setselectedInsurance(
                                  insuranceList?.customer_insurance[i]
                                );
                                break;
                              }
                            }
                          }}
                        >
                          {insuranceList?.insurance?.map((item, index) => (
                            <option value={item?.insurance_name} key={index}>
                              {item?.insurance_name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <hr />
                      <div className="position-relative">
                        {editUserprofile ? (
                          <div>
                            <p>
                              <strong>Sponsor Name: </strong>{" "}
                              <span>
                                {selectedInsurance?.sponsor_first_name}&nbsp;{" "}
                                {selectedInsurance?.sponsor_last_name}
                              </span>
                            </p>
                            <p>
                              <strong>Policy Number: </strong>{" "}
                              <span>{selectedInsurance?.policy_number}</span>
                            </p>
                          </div>
                        ) : (
                          <div className="edit-form-box">
                            <div className="row">
                              <div className="col-md-6">
                                <Form onSubmit={handleSubmit}>
                                  <div className="mb-3">
                                    <Form.Check
                                      inline
                                      label="Primary"
                                      name="primary"
                                      type="radio"
                                      id="insurance_default"
                                      checked={
                                        insuranceDetails.insurance_default ===
                                        "on"
                                          ? true
                                          : false
                                      }
                                      onClick={() =>
                                        setinsuranceDetails({
                                          ...insuranceDetails,
                                          insurance_default:
                                            insuranceDetails.insurance_default ===
                                            "on"
                                              ? ""
                                              : "on",
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputName"
                                      className="form-label"
                                    >
                                      Insurance Name
                                    </label>
                                    <select
                                      name="insurance"
                                      id="insurance_name"
                                      className="form-select"
                                      value={insuranceDetails.insurance_name}
                                      onChange={handleInsuranceDetails}
                                    >
                                      {insuranceList?.insurance?.map(
                                        (item, index) => (
                                          <option
                                            value={item?.insurance_name}
                                            key={index}
                                          >
                                            {item?.insurance_name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputAddress"
                                      className="form-label"
                                    >
                                      Date of Birth
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.birth_date}
                                      className="form-control"
                                      id="birth_date"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputId"
                                      className="form-label"
                                    >
                                      Subscriber ID
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.subscriber_id}
                                      className="form-control"
                                      id="subscriber_id"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputMedicalNumber"
                                      className="form-label"
                                    >
                                      Policy/Medical Number
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.policy_number}
                                      className="form-control"
                                      id="policy_number"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputAddress"
                                      className="form-label"
                                    >
                                      Group Number
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.group_number}
                                      className="form-control"
                                      id="group_number"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputAddress"
                                      className="form-label"
                                    >
                                      Sponsor First Name
                                    </label>
                                    <input
                                      type="text"
                                      value={
                                        insuranceDetails.sponsor_first_name
                                      }
                                      className="form-control"
                                      id="sponsor_first_name"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputAddress"
                                      className="form-label"
                                    >
                                      Sponsor Last Name
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.sponsor_last_name}
                                      className="form-control"
                                      id="sponsor_last_name"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputAddress"
                                      className="form-label"
                                    >
                                      Sponsor SSN
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.sponsor_ssn}
                                      className="form-control"
                                      id="sponsor_ssn"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="mb-3">
                                    <label
                                      htmlFor="exampleInputAddress"
                                      className="form-label"
                                    >
                                      Sponsor DBN
                                    </label>
                                    <input
                                      type="text"
                                      value={insuranceDetails.sponsor_dbn}
                                      className="form-control"
                                      id="sponsor_dbn"
                                      onChange={handleInsuranceDetails}
                                    />
                                  </div>
                                  <div className="d-flex justify-content-between ms-0">
                                    <button
                                      className="button button-default same-btn delete ml-10"
                                      onClick={() => {
                                        setinsuranceDetails({
                                          customer_insruance_id: "",
                                          insurance_default: "",
                                          insurnace_id: "",
                                          birth_date: "",
                                          subscriber_id: "",
                                          policy_number: "",
                                          group_number: "",
                                          sponsor_first_name: "",
                                          sponsor_last_name: "",
                                          sponsor_ssn: "",
                                          sponsor_dbn: "",
                                          insurance_name: "",
                                        });
                                        setEditUserprofile(true);
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      type="button"
                                      className="button button-blue same-btn mr-10"
                                      onClick={addInsuranceDetails}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                        )}
                        <div
                          className="border-btn text-primary position-absolute"
                          style={{ right: "25px", top: 0 }}
                        >
                          {editUserprofile ? (
                            <button
                              className="border-btn text-primary"
                              onClick={editForm}
                            >
                              Edit
                            </button>
                          ) : (
                            <button
                              className="border-btn text-primary"
                              onClick={() => setEditUserprofile(true)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                        <div></div>
                      </div>
                      <hr />
                      <div>
                        <p className="fw-bold m-0">Upload ID:</p>
                        {Object.keys(documentsList).length == 0}
                        <p>
                          We would be needing your ID to process the insurance
                        </p>
                        <button
                          type="button"
                          class="btn btn-primary px-3 mb-2"
                          data-bs-target="#exampleModalToggleUploadId"
                          data-bs-toggle="modal"
                        >
                          Upload ID
                        </button>
                        {Object.keys(documentsList).length != 0 && (
                          <div className="d-flex">
                            <div>
                              {documentsList?.customer_document_front && (
                                <img
                                  width="150"
                                  height="140"
                                  src={`${process.env.NEXT_PUBLIC_MEDIA}${documentsList?.customer_document_front}`}
                                  alt="Document Front Page"
                                />
                              )}
                            </div>
                            <div>
                              {documentsList?.customer_document_back && (
                                <img
                                  width="150"
                                  height="140"
                                  src={`${process.env.NEXT_PUBLIC_MEDIA}${documentsList?.customer_document_back}`}
                                  alt="Document Back Page"
                                />
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <hr />
                      <div>
                        <p className="fw-bold m-0">Signature:</p>
                        <p>
                          Please upload/add your signature, so JANZ can submit
                          insurance claim form on your behalf
                        </p>
                        <button
                          type="button"
                          class="btn btn-primary px-3 mb-2"
                          data-bs-target="#exampleModalToggleUploadIdSignature"
                          data-bs-toggle="modal"
                        >
                          Upload signature
                        </button>
                      </div>
                      <div className="or-line">
                        <strong>or</strong>
                      </div>
                      <div className="row">
                        <div className="col-md-8 col-sm-12">
                          <div className="border rounded-2">
                            <div
                              className="border-bottom signature-box p-2 d-flex justify-content-center"
                              style={{
                                minHeight: "120px",
                                maxHeight: "200px",
                              }}
                            >
                              <SignaturePad
                                className="sigCanvas"
                                ref={sigPad}
                                penColor="black"
                              />
                            </div>
                            <div className="py-3 d-flex justify-content-center">
                              <button
                                type="button"
                                className="btn btn-outline-secondary px-3 me-3"
                                onClick={clear}
                              >
                                Clear
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary px-3"
                                // onClick={save}
                                onClick={() =>
                                  uploadSignatureBtnFn("signaturePadUpload")
                                }
                              >
                                use this signature
                              </button>
                            </div>
                          </div>
                          {Object.keys(documentsList).length != 0 && (
                            <div>
                              {documentsList?.customer_signature && (
                                <img
                                  width="320"
                                  height="140"
                                  src={`${process.env.NEXT_PUBLIC_MEDIA}${documentsList?.customer_signature}`}
                                  alt="=Signature"
                                />
                              )}
                            </div>
                          )}
                        </div>
                        <div className="col-12 text-center text-md-end">
                          <button
                            type="button"
                            className="btn btn-primary my-3 px-4"
                            onClick={userInsuranceContinueButton}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              {profileStatesCompleted.user_insurance && (
                <div className="card-shadow  p-4 d-flex align-items-center mb-4">
                  <div className="d-flex">
                    <div className="me-4">
                      <svg className="icon fs-24">
                        <use href="#icon_greencheck"></use>
                      </svg>
                    </div>
                    <div className="">
                      <p className="fw-bold p-0 m-0"> User Insurance</p>
                      <span>
                        {selectedInsurance?.insurance_name},{" "}
                        {selectedInsurance?.sponsor_first_name} &nbsp;{" "}
                        {selectedInsurance?.sponsor_last_name},{" "}
                        {selectedInsurance?.policy_number}
                      </span>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <button
                      type="button"
                      className="btn btn-default btn-outline-secondary px-4"
                      onClick={userInsuranceChangeButton}
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              {/* payment  */}
              {profileStates.payment === false && (
                <div>
                  <div className="card-shadow p-4 d-flex mb-4">
                    <div className="me-4">
                      <div
                        className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                        style={{
                          width: "24px",
                          height: "24px",
                          background: "#D9D9D9",
                        }}
                      >
                        <span>04</span>
                      </div>
                    </div>
                    <div className="">
                      <p className="fw-bold p-0 m-0 text-secondary">Payment</p>
                    </div>
                  </div>
                </div>
              )}

              {profileStates.payment &&
                profileStatesCompleted.payment === false && (
                  <div className="card-shadow p-4 mb-4">
                    <div className="d-flex pb-3">
                      <div className="me-4">
                        <div
                          className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                          style={{
                            width: "24px",
                            height: "24px",
                            background: "#D9D9D9",
                          }}
                        >
                          <span>04</span>
                        </div>
                      </div>
                      <div className="">
                        <p className="fw-bold p-0 m-0">Payment</p>
                      </div>
                    </div>
                    <div className="row">
                      <p className="fs-18 fw-bold">
                        For insurance it is an authorization only
                      </p>
                      <div className="col-lg-6 col-sm-12">
                        <div className="card-shadow rounded-2 p-3 mb-4">
                          <p className="fw-bold">Add new card</p>
                          <hr />
                          <form>
                            <div className="row g-3">
                              <div className="col-auto">
                                <label
                                  Htmlfor="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Card number
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter your card number"
                                  className="form-control"
                                  pattern="[0-9]*"
                                  inputmode="numeric"
                                ></input>
                              </div>
                              <div className="col">
                                <label
                                  Htmlfor="exampleInputEmail1"
                                  class="form-label"
                                >
                                  CVV
                                </label>
                                <input
                                  type="number"
                                  placeholder="CVV"
                                  className="form-control"
                                ></input>
                              </div>
                              <div className="col-auto">
                                <label
                                  Htmlfor="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Holder name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter your name"
                                  className="form-control"
                                ></input>
                              </div>
                              <div className="col">
                                <label
                                  Htmlfor="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Expiry
                                </label>
                                <input
                                  type="number"
                                  placeholder="MM/YYYY"
                                  className="form-control"
                                ></input>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between pt-4 pb-2">
                              <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary px-4"
                              >
                                Add Card
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-12 text-center text-md-end">
                        <button
                          type="button"
                          className="btn btn-primary flex-lg-end px-5"
                          onClick={paymentContinueButton}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              {profileStatesCompleted.payment && (
                <div className="card-shadow  p-4 d-flex align-items-center mb-4">
                  <div className="d-flex">
                    <div className="me-4">
                      <svg className="icon fs-24">
                        <use href="#icon_greencheck"></use>
                      </svg>
                    </div>
                    <div className="">
                      <p className="fw-bold p-0 m-0"> Payment</p>
                      <span>For insurance it is an authorization only</span>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <button
                      type="button"
                      className="btn btn-default btn-outline-secondary px-4"
                      onClick={paymentChangeButton}
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              {/* Order summary */}
              {profileStates.order_summary === false && (
                <div>
                  <div className="card-shadow p-4 d-flex mb-4">
                    <div className="me-4">
                      <div
                        className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                        style={{
                          width: "24px",
                          height: "24px",
                          background: "#D9D9D9",
                        }}
                      >
                        <span>05</span>
                      </div>
                    </div>
                    <div className="">
                      <p className="fw-bold p-0 m-0 text-secondary">
                        Order Summary
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {profileStates.order_summary &&
                profileStatesCompleted.order_summary === false && (
                  <div className="card-shadow p-4 mb-4">
                    <div className="d-flex pb-3">
                      <div className="me-4">
                        <div
                          className="d-flex text-secondary rounded-pill justify-content-center align-items-center fs-10"
                          style={{
                            width: "24px",
                            height: "24px",
                            background: "#D9D9D9",
                          }}
                        >
                          <span>05</span>
                        </div>
                      </div>
                      <div className="">
                        <p className="fw-bold p-0 m-0">Order Summary</p>
                      </div>
                    </div>
                    <div>
                      {" "}
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
                                          {/* <Link
                                            href={`/product_detail/checkout/${item?.product_variant?.variant_permlink}`}
                                            target="_blank"
                                          > */}
                                          <h5
                                            className="card-title"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                              if (item?.product_variant) {
                                                window.open(
                                                  `/product_detail/checkout/${item?.product_variant?.variant_permlink}`,
                                                  "_blank" // This tells the browser to open the link in a new tab
                                                );
                                              }
                                            }}
                                          >
                                            {item?.mproduct?.product_name}
                                          </h5>
                                          {/* </Link> */}

                                          <p>
                                            {item?.mproduct?.brand?.brand_name}
                                          </p>
                                          <p>
                                            <label className="form-check pb-2">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={
                                                  item?.is_subscription === "Y"
                                                }
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
                                            <span
                                              style={{ marginRight: "auto" }}
                                            >
                                              {
                                                item?.product_variant?.rxdetails
                                                  ?.rx_title
                                              }
                                            </span>

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
                                                <option value="I will send my prescription to JANZ">
                                                  I will send my prescription to
                                                  JANZ
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
                                                onClick={() =>
                                                  uploadRxButton(item)
                                                }
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
                                    onClick={() =>
                                      handleChangeDecrement(index, item)
                                    }
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
                                    onClick={() =>
                                      handleChangeIncrement(index, item)
                                    }
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
                    <div className="row">
                      <div className="col-12 text-center text-md-end">
                        <button
                          type="button"
                          className="btn btn-primary flex-lg-end px-5"
                          onClick={SubmitContinueButton}
                        >
                          Submit Order
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <div className="col-md-4">
              <h5 className="fs-22 fw-bold py-4">
                Customer ID: {loginUser?.customer_id}
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
                {taxDetails?.totalTax != null && (
                  <div className="d-flex pb-2">
                    <span>Tax</span>
                    <span className="ms-auto">${taxDetails?.totalTax}</span>
                  </div>
                )}
                {/* <div className="d-flex pb-2">
                  <span>Shipping Cost</span>
                  <span className="ms-auto">$20.00</span>
                </div> */}
                <hr />
                <div className="d-flex pb-2">
                  <span>Order Total</span>
                  <span className="ms-auto">${calculateTotalPrice()}</span>
                </div>
              </div>
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
                  setrawFileRx(null);
                  setpreviewUrlRx(null);
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
                    onChange={handleChangeFileFunRx}
                  />
                  <span>
                    Drag and drop your image or <a href="">browse file</a> on
                    your computer
                  </span>
                </label>
              </div>
              <div className="d-block rounded-2 p-1 my-2">
                {previewUrlRx ? (
                  <div
                    className="file-import d-flex ai-center mt-10"
                    id="remove_${inputid}"
                  >
                    <img
                      src={previewUrlRx}
                      style={{
                        width: "40px",
                        height: "30px",
                        margin: "5px",
                        marginRight: "10px",
                      }}
                      alt="doc"
                    />
                    <span style={{ marginRight: "auto" }}>
                      {rawFileRx?.name}
                    </span>
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
                        setpreviewUrlRx(null);
                        setrawFileRx(null);
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
      <div
        className="modal fade"
        id="exampleModalToggleUpload"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header pb-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h4 className="text-center pb-3 fs-22">Upload Rx</h4>
              <div className="upload-box p-3">
                <label className="drag-box input-file">
                  <img src={uploader}></img>
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
                        setrawFile(null);
                        setpreviewUrl(null);
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
                  htmlFor="fileUpload2"
                  className="button button-blue upload-btn w-100 py-2 fs-20"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggleUploadId"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-600 modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header pb-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeDocumentsModal}
              ></button>
            </div>
            <div className="modal-body">
              <h4 className="text-center pb-3 fs-22">Upload ID</h4>
              <p className="text-center">
                You have to upload both Sides of your document
              </p>
              <div className="row">
                <div className="col-md-6 col-sm-12 pb-4">
                  <p className="fw-bold">Front Side</p>
                  <div className="upload-box position-relative p-4">
                    <label className="drag-box input-file p-3">
                      <Image width={40} height={30} src={uploader} alt="..." />
                      <input
                        type="file"
                        accept="image/*"
                        id="fileUpload1"
                        onChange={handleChangeFileFunOne}
                      />
                      <span>
                        Drag and drop your image or <a href="">browse file</a>{" "}
                        on your computer
                      </span>
                    </label>
                    {previewUrlOne ? (
                      <div
                        className="file-import full-view"
                        id="remove_${inputid}"
                      >
                        <img src={previewUrlOne} alt={rawFileOne?.name} />
                        <button
                          onClick={() => {
                            setrawFileOne(null);
                            setpreviewUrlOne(null);
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
                </div>
                <div className="col-md-6 col-sm-12 pb-4">
                  <p className="fw-bold">Back Side</p>
                  <div className="upload-box position-relative p-4">
                    <label className="drag-box input-file p-3">
                      <Image width={40} height={30} src={uploader} alt="..." />
                      <input
                        type="file"
                        accept="image/*"
                        id="fileUpload2"
                        onChange={handleChangeFileFunTwo}
                      />
                      <span>
                        Drag and drop your image or <a href="">browse file</a>{" "}
                        on your computer
                      </span>
                    </label>
                    {previewUrlTwo ? (
                      <div
                        className="file-import full-view"
                        id="remove_${inputid}"
                      >
                        <img src={previewUrlTwo} alt={rawFileTwo?.name} />
                        <button
                          onClick={() => {
                            setrawFileTwo(null);
                            setpreviewUrlTwo(null);
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
                </div>
              </div>
              <div className="mt-1">
                <label
                  // htmlFor="fileUpload2"
                  onClick={uploadDocumentsBtnFn}
                  className="btn btn-primary upload-btn w-100 py-2 fs-20"
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggleUploadIdSignature"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-400 modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header pb-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeSignatureModal}
              ></button>
            </div>
            <div className="modal-body">
              <h4 className="text-center pb-3 fs-22">Upload Signature</h4>
              {/* <p className="text-center">You have to upload signature</p> */}
              <div className="row">
                <div className="col-md-12 pb-4">
                  {/* <p className="fw-bold">Front Side</p> */}
                  <div className="upload-box position-relative p-4">
                    <label className="drag-box input-file p-3">
                      <Image width={80} height={30} src={uploader} alt="..." />
                      <input
                        type="file"
                        accept="image/*"
                        id="fileUpload1"
                        onChange={handleChangeFileFunSignature}
                      />
                      <span>
                        Drag and drop your image or <a href="">browse file</a>{" "}
                        on your computer
                      </span>
                    </label>
                    {previewUrlSignature ? (
                      <div
                        className="file-import full-view"
                        id="remove_${inputid}"
                      >
                        <img
                          src={previewUrlSignature}
                          alt={rawFileSignature?.name}
                        />
                        <button
                          onClick={() => {
                            setrawFileSignature(null);
                            setpreviewUrlSignature(null);
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
                </div>
              </div>
              <div className="mt-1">
                <label
                  // htmlFor="fileUpload2"
                  className="btn btn-primary upload-btn w-100 py-2 fs-20"
                  onClick={() => uploadSignatureBtnFn("normalUpload")}
                >
                  Upload
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add billing address */}
      <div
        className="modal fade"
        id="exampleModalToggleAddBillingAddress"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content p-3">
            <div className="modal-header pb-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={billingModalRef}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <h5 className="pb-3">
                  {addButtonBillingClicked ? "Add" : "Edit"} Billing Address
                </h5>
                <div className="col-md-12">
                  <div class="form-check mb-2">
                    <input
                      class="form-check-input"
                      type="radio"
                      // name="flexRadioDefault"
                      // id="flexRadioDefault5"
                      checked={profileDetails?.primary === "on"}
                      onClick={() => {
                        setprofileDetails({
                          ...profileDetails,
                          primary: profileDetails.primary === "on" ? "" : "on",
                        });
                      }}
                    />
                    <label class="form-check-label">Primary</label>
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      value={profileDetails.name}
                      className="form-control"
                      id="name"
                      onChange={handleProfileDetails}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Address 01</label>
                    <input
                      type="text"
                      value={profileDetails.address1}
                      className="form-control"
                      id="address1"
                      onChange={handleProfileDetails}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Address 02</label>
                    <input
                      type="text"
                      value={profileDetails.address2}
                      className="form-control"
                      id="address2"
                      onChange={handleProfileDetails}
                    />
                  </div>
                  <div className="mb-2 d-flex justify-content-between">
                    <span className="me-2">Do you use APO/FPO Address?</span>
                    <div className="d-flex">
                      <div class="form-check me-3">
                        <input
                          className=" form-check-input"
                          type="radio"
                          id="inline-radio-4"
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
                        <label class="form-check-label" for="inline-radio-4">
                          Yes
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          className=" form-check-input"
                          type="radio"
                          id="inline-radio-5"
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
                        <label class="form-check-label" for="inline-radio-5">
                          No
                        </label>
                      </div>
                    </div>
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
                          type="text"
                          value={profileDetails.zipCode}
                          className="form-control"
                          id="zipCode"
                          onChange={handleProfileDetails}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="no-btn-show">
                      <div className="mb-2">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          value={profileDetails.city}
                          className="form-control"
                          id="city"
                          onChange={handleProfileDetails}
                        />
                      </div>
                      <div className="mb-2">
                        <label>State</label>
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
                      <div className="mb-2">
                        <label className="form-label">ZIP Code</label>
                        <input
                          type="text"
                          value={profileDetails.zipCode}
                          className="form-control"
                          id="zipCode"
                          onChange={handleProfileDetails}
                        />
                      </div>
                    </div>
                  )}

                  <div className="d-flex justify-content-between pt-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary px-5"
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

                        setSelectedAddressBilling(null);
                      }}
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary px-5"
                      onClick={() => {
                        setprofileDetails({
                          ...profileDetails,
                          address_id: "0",
                        });
                        addressSaveButton("billingAddress");
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Billing address popup */}
      <div
        className="modal fade"
        id="exampleModalToggleBillingAddress"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header pb-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setSelectedAddressBilling(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <p className="fw-bold fs-20">Choose Billing Address</p>
                </div>
                <div className="col-6 text-end">
                  <div className="mb-2">
                    <button
                      className="border-btn text-primary"
                      data-bs-target="#exampleModalToggleAddBillingAddress"
                      data-bs-toggle="modal"
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
                        setaddButtonBillingClicked(true);
                        setSelectedAddressBilling(null);
                      }}
                    >
                      Add Address
                    </button>
                  </div>
                  <div>
                    {/* <button
                      className="border-btn text-primary"
                      data-bs-target="#exampleModalToggleAddBillingAddress"
                      data-bs-toggle="modal"
                    >
                      Edit
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {addressList
                    ?.filter(
                      (address) =>
                        address.address_id != selectedAddress.address_id
                    )
                    .map((item, index, arr) => (
                      <>
                        <div class="form-check  position-relative">
                          <input
                            class="form-check-input"
                            type="radio"
                            // name="flexRadioDefault"
                            // id="flexRadioDefaultBillingAddress"
                            checked={
                              selectedAddressBilling &&
                              selectedAddressBilling?.address_id ===
                                item?.address_id
                                ? true
                                : false
                            }
                            onChange={(e) =>
                              addressListHandleChangeBillingAddress(e, item)
                            }
                          />
                          <label
                            class="form-check-label"
                            style={{ maxWidth: "400px" }}
                          >
                            <p className="p-0 m-0"> {item?.contact_name}</p>
                            <p className="p-0 m-0">{loginUser?.phone}</p>
                            <p
                              className="p-0 m-0"
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                              }}
                            >
                              <div>{item?.address1}</div>,
                              <div>{item?.address2}</div>,
                              <div>{item?.city}</div>,<div>{item?.state}</div>,
                              <div>{item?.zip_code}</div>
                            </p>
                          </label>
                          {selectedAddressBilling &&
                            selectedAddressBilling?.address_id ===
                              item?.address_id && (
                              <button
                                className="border-btn text-primary position-absolute"
                                style={{ right: "0px", top: "0px" }}
                                data-bs-target="#exampleModalToggleAddBillingAddress"
                                data-bs-toggle="modal"
                                onClick={() => {
                                  setaddButtonBillingClicked(false);
                                  editButtonClickedFn(item, "billingAddress");
                                }}
                              >
                                Edit
                              </button>
                            )}
                        </div>
                        <hr
                          style={{
                            display:
                              index === arr.length - 1 ? "none" : "block",
                          }}
                        />
                      </>
                    ))}

                  {/* <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                    />
                    <label
                      class="form-check-label"
                      style={{ maxWidth: "400px" }}
                    >
                      <p className="p-0 m-0">JANZ Corp</p>
                      <p className="p-0 m-0">9876543210</p>
                      <p className="p-0 m-0">
                        Address 1, Address 2, City, State, Zip code
                      </p>
                    </label>
                  </div> */}
                  <div className="text-center text-md-end pt-4">
                    <button
                      type="button"
                      className="btn btn-primary px-5"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      disabled={selectedAddressBilling ? false : true}
                    >
                      Continue
                    </button>
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
