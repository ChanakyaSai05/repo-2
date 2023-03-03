import { useContext, useEffect, useState } from "react";
import React, { Component } from "react";
import Image from "next/image";
import Headerlanding from "../components/headerlanding";
import Footer from "../components/footer";
import storeBanner from "../public/images/store-banner.svg";
import storeUser from "../public/images/store-user.svg";
import map from "../public/images/map.svg";
import UserContext from "../context/UserContext";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function Store() {
  // const [publicPath] = useState(process.env.NEXT_PUBLIC_URL);
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const selectedUser = useSelector(selectUser);
  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
  }, []);
  return (
    <>
      <Headerlanding></Headerlanding>

      <div className="store-hero">
        <Image width={1440} height={475} src={storeBanner} alt="..." />
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-md-5 col-sm-12 d-flex align-items-center">
              <div className="txt-box">
                <h2 className="pb-3">JANZ Stores</h2>
                <p>
                  JANZ has over 26 locations worldwide. whenever you are located
                  we are here to help you get the supplies you need. you can
                  order equipment and supplies through our extensive website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="store-box">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>JANZ Stores</h3>
              <p className="large-para">Find JANZ Store Near You</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-sm-12">
              <div>
                <select
                  className="form-select selectpicker"
                  aria-label="Default select example"
                >
                  <option selected>Choose Your Territory</option>
                  <option value="United States">United States</option>
                  <option value="Europes">Europes</option>
                  <option value="US Territories">US Territories</option>
                  <option value="Pacific Rim">Pacific Rim</option>
                </select>
              </div>
              <div className="user-card my-4">
                <h5>AAFES Fort Leonard Woo</h5>
                <div className="d-flex py-4">
                  <div className="img-box me-3">
                    <Image width={105} height={98} src={storeUser} alt="..." />
                  </div>
                  <div className="">
                    <p className="">Store Manager</p>
                    <h6>Amanda Cressel</h6>
                  </div>
                </div>
                <p>
                  143 Replacement Avenue, Bldg 487 Ft Leonard Wood, MO 65473
                </p>
                <hr />
                <p>
                  <strong>Phone:</strong> +1 (573) 329-0130
                </p>
                <p>
                  <strong>Fax: </strong> +1 (314) 597-6738
                </p>
                <hr />
                <p>
                  <strong>House of Operation:</strong>
                </p>
                <p>
                  <strong>Monday-</strong>Friday: 9am-6pm
                </p>
                <p>
                  <strong>Saturday:</strong>9am-6pm
                </p>
                <p>
                  <strong>Sunday:</strong>Closed
                </p>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <Image
                width={740}
                height={671}
                src={map}
                className="w-100"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
