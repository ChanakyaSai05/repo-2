import React, { useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Slider from "react-slick";
import { Inter } from "@next/font/google";
// import styles from "../styles/Home.module.css";
import { Container, Nav, Tab, Col, Row, Dropdown } from "react-bootstrap";
import Headerlanding from "../../components/headerlanding";
import Footer from "../../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import product from "../public/images/product.svg";
import cardImg1 from "../../public/images/card-img1.svg";
import cardImg2 from "../../public/images/card-img2.svg";
import cardImg3 from "../../public/images/card-img3.svg";
import cardImg4 from "../../public/images/card-img4.svg";
import airminiImg from "../../public/images/air-mini.svg";
import fullmask2 from "../../public/images/fullmask2.svg";
import no_image from "../../public/images/no_image.jpg";
import { useRouter } from "next/router";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Product(props) {
  // console.log(props, "props accessory products");
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems, setcartItems } = context;
  const selectedUser = useSelector(selectUser);
  const router = useRouter();
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // add to cart button
  const addToCartButton = async (item) => {
    // console.log(item, "item");
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      let product = item?.product_variants[0];
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
          qty: 1,
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
  // console.log(cartItems, "cart_items");
  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
  }, []);

  return (
    <>
      <Headerlanding></Headerlanding>
      <div className="">
        <div className="container">
          <div className="row pt-4">
            <div className="col-sm-12 col-lg-3 order-lg-1">
              <div className="incart-box">
                <h4
                  className="accordion-button"
                  data-bs-toggle="collapse"
                  role="button"
                  data-bs-target="#items"
                >
                  In Cart
                </h4>
                <div className="collapse show" id="items">
                  {cartItems.map((item, index) => (
                    <a href="#" className="d-block my-3 " key={index}>
                      <p>{item?.mproduct?.product_name}</p>
                      <div className="d-flex justify-content-center">
                        <Image
                          width={130}
                          height={120}
                          src={
                            item?.mproduct?.product_image[0]?.image_file
                              ? `${process.env.NEXT_PUBLIC_MEDIA}${item?.mproduct?.product_image[0]?.image_file}`
                              : no_image
                          }
                          alt="..."
                        />
                      </div>
                    </a>
                  ))}

                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={() => router.push("/cart_items")}
                  >
                    Proceed to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-9">
              <h4 className="py-4">
                Other Accessories bought with{" "}
                {props?.product?.mproduct?.product_name}
              </h4>
              {props?.accessory_products?.map((item, index) => (
                <div className="d-flex pb-5" key={index}>
                  <div className="me-3 title-img card-shadow">
                    <Image
                      width={120}
                      height={120}
                      src={
                        item?.product_image[0]?.image_file
                          ? `${process.env.NEXT_PUBLIC_MEDIA}${item?.product_image[0]?.image_file}`
                          : no_image
                      }
                      alt="..."
                    />
                  </div>
                  <div className="">
                    <h4 className="pb-2">{item?.product_name}</h4>
                    <p>{item?.product_short_description}</p>
                    {cartItems?.filter(
                      (cart_item) => cart_item?.product_id == item.product_id
                    ).length > 0 ? (
                      <button
                        type="button"
                        className="btn btn-outline-primary px-3"
                        disabled
                      >
                        Added to Cart
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-primary px-3"
                        onClick={() => addToCartButton(item)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Slider 1*/}
      <div className="product-slider-box pb-5">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12">
              <h3>Recently Viewed</h3>
            </div>
          </div>
          <div className="row">
            <div className="12">
              <Slider {...settings}>
                <div className="card">
                  <div className="card-bodys">
                    <div className="d-flex justify-content-between">
                      <div className="like-down-box">
                        <svg className="icon">
                          <use href="#icon_like-dull"></use>
                        </svg>
                      </div>
                      <div className="download-box">
                        <svg className="icon">
                          <use href="#icon_loader-dull"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="d-flex my-2 py-2 justify-content-center">
                      <div className="card-img">
                        <Image
                          width={180}
                          height={180}
                          src={cardImg1}
                          alt="..."
                        />
                      </div>
                    </div>
                    <p className="card-text">5 OZ Breast Milk Bottle Set</p>
                    <span className="badge text-bg-primary p-2 px-3 me-2">
                      4.2 &#9733;
                    </span>
                    <span>(166)</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-bodys">
                    <div className="d-flex justify-content-between">
                      <div className="like-down-box">
                        <svg className="icon">
                          <use href="#icon_like"></use>
                        </svg>
                      </div>
                      <div className="download-box">
                        <svg className="icon">
                          <use href="#icon_loader"></use>
                        </svg>
                        <span>1</span>
                      </div>
                    </div>
                    <div className="d-flex my-2 py-2 justify-content-center">
                      <div className="card-img">
                        <Image
                          width={159}
                          height={160}
                          src={cardImg2}
                          alt="..."
                        />
                      </div>
                    </div>
                    <p className="card-text">
                      Spectra S1 Plus Electric Breast Pump Dual Voltage
                    </p>
                    <span className="badge text-bg-primary p-2 px-3 me-2">
                      4.1 &#9733;
                    </span>
                    <span>(176)</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-bodys">
                    <div className="d-flex justify-content-between">
                      <div className="like-down-box">
                        <svg className="icon">
                          <use href="#icon_like-dull"></use>
                        </svg>
                      </div>
                      <div className="download-box">
                        <svg className="icon">
                          <use href="#icon_loader-dull"></use>
                        </svg>
                        {/* <span>1</span> */}
                      </div>
                    </div>
                    <div className="d-flex my-2 py-2 justify-content-center">
                      <div className="card-img">
                        <Image
                          width={180}
                          height={180}
                          src={cardImg3}
                          alt="..."
                        />
                      </div>
                    </div>
                    <p className="card-text">Lansinoh Resupply Kit</p>
                    <span className="badge text-bg-primary p-2 px-3 me-2">
                      4.4 &#9733;
                    </span>
                    <span>(200)</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-bodys">
                    <div className="d-flex justify-content-between">
                      <div className="like-down-box">
                        <svg className="icon">
                          <use href="#icon_like-dull"></use>
                        </svg>
                      </div>
                      <div className="download-box">
                        <svg className="icon">
                          <use href="#icon_loader-dull"></use>
                        </svg>
                        {/* <span>1</span> */}
                      </div>
                    </div>
                    <div className="d-flex my-2 py-2 justify-content-center">
                      <div className="card-img">
                        <Image
                          width={125}
                          height={160}
                          src={cardImg4}
                          alt="..."
                        />
                      </div>
                    </div>
                    <p className="card-text">Bambo Nature Love Balm</p>
                    <span className="badge text-bg-primary p-2 px-3 me-2">
                      4.0 &#9733;
                    </span>
                    <span>(123)</span>
                  </div>
                </div>
                <div className="card">
                  <div className="card-bodys">
                    <div className="d-flex justify-content-between">
                      <div className="like-down-box">
                        <svg className="icon">
                          <use href="#icon_like"></use>
                        </svg>
                      </div>
                      <div className="download-box">
                        <svg className="icon">
                          <use href="#icon_loader"></use>
                        </svg>
                        <span>1</span>
                      </div>
                    </div>
                    <div className="d-flex my-2 py-2 justify-content-center">
                      <div className="card-img">
                        <Image
                          width={159}
                          height={160}
                          src={cardImg2}
                          alt="..."
                        />
                      </div>
                    </div>
                    <p className="card-text">
                      Spectra S1 Plus Electric Breast Pump Dual Voltage
                    </p>
                    <span className="badge text-bg-primary p-2 px-3 me-2">
                      4.1 &#9733;
                    </span>
                    <span>(176)</span>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* Slider End */}
      <Footer></Footer>
    </>
  );
}
export async function getServerSideProps({ params }) {
  // console.log(params, "params");
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}product/${params.product}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response.data);
    if (response.data.status != false) {
      // console.log(response.data);
      return {
        props: response.data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
