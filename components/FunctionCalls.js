import axios from "axios";
import React from "react";

export async function getOrderedItems() {
  try {
    let user = JSON.parse(localStorage.getItem("janz_medical_user"));
    let token = localStorage.getItem("janz_medical_login_token");
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}customer/order/history`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response, "result");
    if (response.data.status == false) {
      console.log("Error");
    } else {
      //   console.log(response?.data, "all ordered items");
      return response?.data?.orders;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getWishListDetails() {
  try {
    let user = JSON.parse(localStorage.getItem("janz_medical_user"));
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}customer/wishlist`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        customer_id: user?.customer_id,
        wishlist: true,
      },
    });

    // console.log(response, "result");
    if (response.data.status == false) {
      console.log("Error");
    } else {
      // console.log(response?.data);
      // setproduct_wishlist(response?.data?.product_wishlist);
      return response?.data?.product_wishlist;
    }
  } catch (error) {
    console.log(error);
  }
}
function FunctionCalls() {
  return <div>FunctionCalls</div>;
}

export default FunctionCalls;
