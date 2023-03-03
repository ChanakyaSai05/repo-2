import { useContext, useEffect, useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import Header from "../components/header";
import Asidebar from "../components/asidebar";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Subscription() {
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const [editCancel, setEditCancel] = useState(false);
  const [numbereditCancel, setNumberEditCancel] = useState(false);
  const [formedit, setFormEdit] = useState(false);
  const [editform, setEditForm] = useState(false);
  const selectedUser = useSelector(selectUser);
  const editForm = (item) => {
    setEditForm(!editform);
  };

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
            <h2>Subscriptions</h2>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 pb-4">
            <div className="card-tabuler ct-six ct-action mb-4">
              <div className="ct-col">
                <h6>Product</h6>
                <p>Breast Pump</p>
              </div>
              <div className="ct-col">
                <h6>Frequency</h6>
                <p>90 Bags in 30 days</p>
              </div>
              <div className="ct-col">
                <h6>Start Date</h6>
                <p>22-11-2022</p>
              </div>
              <div className="ct-col">
                <h6>End Date</h6>
                <p>22-11-2022</p>
              </div>
              <div className="ct-col">
                <h6>Next Shipment</h6>
                <p>12/02/2023</p>
              </div>
              <div className="ct-col">
                <h6>Status</h6>
                <p className="text-primary">Active</p>
              </div>
              <Dropdown className="dots-dropdown">
                <Dropdown.Toggle as="button" className="btn">
                  <svg className="icon">
                    <use href="#icon_threedot"></use>
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow mmw-96px dropdown-menu-end">
                  <Dropdown.Item as="button" className="border-bottom">
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item as="button">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="card-tabuler ct-six ct-action mb-4">
              <div className="ct-col">
                <h6>Product</h6>
                <p>Breast Pump</p>
              </div>
              <div className="ct-col">
                <h6>Frequency</h6>
                <p>90 Bags in 30 days</p>
              </div>
              <div className="ct-col">
                <h6>Start Date</h6>
                <p>22-11-2022</p>
              </div>
              <div className="ct-col">
                <h6>End Date</h6>
                <p>22-11-2022</p>
              </div>
              <div className="ct-col">
                <h6>Next Shipment</h6>
                <p>12/02/2023</p>
              </div>
              <div className="ct-col">
                <h6>Status</h6>
                <p className="text-danger">Cancelled</p>
              </div>
              <Dropdown className="dots-dropdown">
                <Dropdown.Toggle as="button" className="btn">
                  <svg className="icon">
                    <use href="#icon_threedot"></use>
                  </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow mmw-96px dropdown-menu-end">
                  <Dropdown.Item as="button" className="border-bottom">
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item as="button">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* 
            <div className="address-tbl card border-0">
              <div className="card-body pt-3">
                {
                  <Table responsive>
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Frequency</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((item, index) => (
                        <tr key={index}>
                          <td>Breast Pump</td>
                          <td>90 Bags in 30 days</td>
                          <td>22-11-2022</td>
                          <td>22-11-2022</td>
                          <td>Active</td>
                          <td>
                            <Dropdown className="dots-dropdown">
                              <Dropdown.Toggle as="button" className="btn">
                                <svg className="icon">
                                  <use href="#icon_threedot"></use>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="shadow mmw-96px">
                                <Dropdown.Item
                                  as="button"
                                  className="border-bottom"
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item as="button">
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
            </div> */}
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
      </div>
    </>
  );
}
