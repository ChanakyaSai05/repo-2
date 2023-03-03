import { useContext, useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import Header from "../components/header";
import Asidebar from "../components/asidebar";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Insurancedetails() {
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const selectedUser = useSelector(selectUser);
  const [editCancel, setEditCancel] = useState(false);
  const [numbereditCancel, setNumberEditCancel] = useState(false);
  const [formedit, setFormEdit] = useState(false);
  const [editform, setEditForm] = useState(false);
  const [addEditMode, setaddEditMode] = useState(false);
  const [addButtonClicked, setaddButtonClicked] = useState(false);
  // edit mode the above one true
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
  // selected delete item
  const [selectedDeleteInsurance, setselectedDeleteInsurance] = useState({});
  // console.log(insuranceDetails, "Insurance details");
  const [insuranceList, setinsuranceList] = useState({});
  // items in the insurance list
  const [insuranceListItems, setinsuranceListItems] = useState([]);
  // handle insurance details
  const handleInsuranceDetails = (e) => {
    setinsuranceDetails({ ...insuranceDetails, [e.target.id]: e.target.value });
  };

  const editForm = (item) => {
    setinsuranceDetails({
      customer_insruance_id: item.customer_insurance_id,
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
    setTableDelete(true);
    setselectedDeleteInsurance(item);
  }
  let toggleClassOpen = tableDelete ? " show" : "";
  // console.log(selectedDeleteInsurance, "delete insurance");

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

  // add insurance detials
  const addInsuranceDetails = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");
      let insurnace_id = insuranceDetails.insurnace_id;
      for (let i = 0; i < insuranceList.insurance.length; i++) {
        let item = insuranceList.insurance[i];
        // console.log(item);
        if (item.insurance_name === insuranceDetails.insurance_name) {
          insurnace_id = item.insurance_id;
        }
      }
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
        setEditForm(false);
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
        // let insuranceListItems=[];
        // for(let i=0;i<listAddedInsuranceName?.length;i++){
        //   insuranceListItems.push(listAddedInsuranceName[i]?.)
        // }

        setinsuranceList(modifiedObj);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(insuranceList, "INSURANCE LIST");

  const checkName = (item) => {
    let name = "";
    for (let i = 0; i < insuranceList.insurance.length; i++) {
      let itemIn = insuranceList.insurance[i];
      // console.log(itemIn, "in");
      if (item.insurnace_id == itemIn.insurance_id) {
        // console.log("Found" + i);
        name = itemIn.insurance_name;
      }
    }
    // console.log(item);
    return name;
  };

  // delete item from the table
  const deleteItemFromTable = async () => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const token = localStorage.getItem("janz_medical_login_token");
      // console.log(insurnace_id);
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/insurance/delete`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        data: {
          customer_insurance_id: selectedDeleteInsurance.customer_insurance_id,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        // alert("Error");
        console.log("Error");
      } else {
        // console.log(response.data);
        setTableDelete(false);
        getInsuranceList();
        // alert("Success");
      }
    } catch (error) {
      console.log(error);
      // alert("Error");
    }
  };
  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
    getInsuranceList();
  }, []);

  return (
    <>
      <Header></Header>
      <Asidebar></Asidebar>
      <div className="wrapper">
        <div className="row">
          <div className="col text-center py-4">
            <h2>Insurance Details</h2>
          </div>
        </div>
        <div className="w-100 py-4">
          <button
            typeof="button"
            className="button button-blue w-100 p-3 fs-20"
            onClick={() => {
              setinsuranceDetails({
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
              setaddButtonClicked(true);
              setEditForm(true);
            }}
          >
            <span className="plus-icon">
              <svg className="icon">
                <use href="#icon_btnadd"></use>
              </svg>
            </span>
            Add New Insurance
          </button>
        </div>

        {editform && (
          <div className="edit-form-box">
            <h6 className="mb-3">
              {addButtonClicked ? "Add" : "Edit"} Insurance
            </h6>
            <div className="row">
              <div className="col-md-6">
                <Form>
                  <div className="mb-3">
                    <Form.Check
                      inline
                      label="Primary"
                      name="primary"
                      type="radio"
                      id="insurance_default"
                      checked={
                        insuranceDetails.insurance_default === "on"
                          ? true
                          : false
                      }
                      onClick={() =>
                        setinsuranceDetails({
                          ...insuranceDetails,
                          insurance_default:
                            insuranceDetails.insurance_default === "on"
                              ? ""
                              : "on",
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                      Insurance Name
                    </label>
                    <select
                      name="insurance"
                      id="insurance_name"
                      className="form-select"
                      value={insuranceDetails.insurance_name}
                      onChange={handleInsuranceDetails}
                    >
                      {insuranceList?.insurance?.map((item, index) => (
                        <option value={item?.insurance_name} key={index}>
                          {item?.insurance_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
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
                    <label htmlFor="exampleInputId" className="form-label">
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
                    <label htmlFor="exampleInputAddress" className="form-label">
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
                    <label htmlFor="exampleInputAddress" className="form-label">
                      Sponsor First Name
                    </label>
                    <input
                      type="text"
                      value={insuranceDetails.sponsor_first_name}
                      className="form-control"
                      id="sponsor_first_name"
                      onChange={handleInsuranceDetails}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputAddress" className="form-label">
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
                    <label htmlFor="exampleInputAddress" className="form-label">
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
                    <label htmlFor="exampleInputAddress" className="form-label">
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
                        setEditForm(false);
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

        <div className="row">
          <div className="col-md-12 pb-4">
            <div className="address-tbl1 card border-0">
              <div className="card-body pt-0">
                {
                  <Table responsive>
                    <colgroup>
                      <col width="35%" />
                      <col />
                      <col width="56" />
                    </colgroup>
                    <tbody>
                      {insuranceList?.customer_insurance?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <a>
                              <span style={{ textDecorationLine: "underline" }}>
                                {checkName(item)}&nbsp;{" "}
                              </span>

                              {item?.insurance_default == "1" && (
                                <span>{"( Primary )"}</span>
                              )}
                            </a>
                            <br />
                            <span>
                              {item.sponsor_first_name} {item.sponsor_last_name}
                            </span>
                          </td>
                          <td>{item.policy_number}</td>
                          <td>
                            <Dropdown className="dots-dropdown">
                              <Dropdown.Toggle as="button" className="btn">
                                <svg className="icon">
                                  <use href="#icon_threedot"></use>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="shadow mmw-96px dropdown-menu-end">
                                <Dropdown.Item
                                  as="button"
                                  className="border-bottom"
                                  onClick={() => {
                                    setaddButtonClicked(false);
                                    editForm(item);
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
                    setselectedDeleteInsurance({});
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
