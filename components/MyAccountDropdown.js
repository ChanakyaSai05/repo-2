import { useRouter } from "next/router";
import React from "react";
import { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import UserContext from "../context/UserContext";

function MyAccountDropdown({ headerlanding }) {
  const context = useContext(UserContext);
  const { logoutBtn } = context;
  const router = useRouter();
  const params = router.query;
  // console.log(headerlanding, "header landing");
  return (
    <>
      {" "}
      <Dropdown>
        <Dropdown.Toggle
          className="navdropdown"
          id="dropdown-basic"
          style={{
            color: headerlanding && "#6C757D",
            backgroundColor: headerlanding && "#F8F9FA",
          }}
        >
          My Account
        </Dropdown.Toggle>
        <Dropdown.Menu className="droplist">
          <Dropdown.Item
            className="droplistitem"
            onClick={() => router.push("/my_order")}
          >
            <span>
              <svg className="icon">
                <use href="#icon_kartplus"></use>
              </svg>
            </span>{" "}
            My Orders
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="droplistitem"
            onClick={() => router.push("/profile_details")}
          >
            <span>
              <svg className="icon">
                <use href="#icon_user"></use>
              </svg>
            </span>
            My Profile
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="droplistitem"
            onClick={() => router.push("/insurance_details")}
          >
            <span>
              <svg className="icon">
                <use href="#icon_insurdetail"></use>
              </svg>
            </span>
            Insurance Details
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="droplistitem"
            onClick={() => router.push("/subscription")}
          >
            <span>
              <svg className="icon">
                <use href="#icon_subscription"></use>
              </svg>
            </span>
            Subscription
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            className="droplistitem"
            onClick={() => router.push("/wishlist")}
          >
            <span>
              <svg className="icon">
                <use href="#icon_like_asidebar"></use>
              </svg>
            </span>
            Wishlist
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="droplistitem" onClick={logoutBtn}>
            <span>
              <svg className="icon">
                <use href="#icon_signout"></use>
              </svg>
            </span>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default MyAccountDropdown;
