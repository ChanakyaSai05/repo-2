import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { Inter } from "@next/font/google";
// import styles from "../styles/Home.module.css";
import { Container, Nav, Tab, Col, Row, Dropdown } from "react-bootstrap";
import Headerlanding from "../../../components/headerlanding";
import Footer from "../../../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import product from "../public/images/product.svg";
// import cardImg1 from "../../public/images/card-img1.svg";
// import cardImg2 from "../../public/images/card-img2.svg";
// import cardImg3 from "../../public/images/card-img3.svg";
// import cardImg4 from "../../public/images/card-img4.svg";
// import airminiImg from "../public/images/air-mini.svg";
// import fullmask2 from "../public/images/fullmask2.svg";
import no_image from "../../../public/images/no_image.jpg";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, set_data_fetched } from "../../../features/userSlice";
import { getWishListDetails } from "../../../components/FunctionCalls";

const inter = Inter({ subsets: ["latin"] });

export default function Product(props) {
  const router = useRouter();
  const params = router.query;
  const { brandId } = params;
  const { brand, products } = props?.data;
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectUser);
  // console.log(brand);
  console.log(props, "props");
  const [product_wishlist, setproduct_wishlist] = useState([]);
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

  const [editCancel, setEditCancel] = useState(false);
  // wishlist delete
  const deleteWishListItem = async (sub_product) => {
    // console.log(sub_product, "sub_product");
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/wishlist/delete`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          product_id: sub_product?.product_id,
          customer_id: user?.customer_id,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        // console.log(response?.data, "product wishlist");
        getWishListButton();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // wishlist add
  const submitWishListButton = async (sub_product) => {
    try {
      let user = JSON.parse(localStorage.getItem("janz_medical_user"));
      const response = await axios({
        url: `${process.env.NEXT_PUBLIC_URL}customer/wishlist/add`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          product_id: sub_product?.product_id,
          product_variant_id: sub_product?.product_variants
            ? sub_product?.product_variants[0]?.product_variant_id
              ? sub_product?.product_variants[0]?.product_variant_id
              : null
            : null,
          customer_id: user?.customer_id,
        },
      });

      // console.log(response, "result");
      if (response.data.status == false) {
        console.log("Error");
      } else {
        // console.log(response?.data, "product wishlist");
        getWishListButton();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get wishlist
  const getWishListButton = async () => {
    try {
      let wishlistData = await getWishListDetails();
      dispatch(
        set_data_fetched({
          wishlist_items_fetched: true,
          wishlistData: wishlistData,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const findInWishlist = (sub_product) => {
    for (let i = 0; i < selectedUser?.wishlistData?.length; i++) {
      const element = selectedUser?.wishlistData[i];
      if (element?.product_id == sub_product?.product_id) {
        return true;
      }
    }

    return false;
  };
  useEffect(() => {
    if (!selectedUser.cart_items_fetched) {
      getCartItemsFn();
    }
    if (!selectedUser.wishlist_items_fetched) {
      getWishListButton();
    }
  }, []);

  return (
    <>
      <Headerlanding></Headerlanding>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-12 pt-3 pb-2">
              <nav className="breadcrumb-wrap" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {brandId}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12 line-heading text-center">
              <h3>{brand?.brand_name}</h3>
            </div>
            <div className="col-12 pt-5">
              <p>{brand?.brand_content}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider 1*/}
      <div className="product-slider-box pb-5">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>Top Products From {brand.brand_name}</h3>
            </div>
          </div>
          <div className="row">
            <div className="12">
              <Slider {...settings}>
                {products?.data.map((pro, pro_index) => (
                  <div className="card" key={pro_index}>
                    <div className="card-bodys">
                      <div className="d-flex justify-content-between">
                        {!findInWishlist(pro) ? (
                          <div
                            className="like-down-box"
                            onClick={() => {
                              submitWishListButton(pro);
                            }}
                          >
                            <svg className="icon">
                              <use href="#icon_like-dull"></use>
                            </svg>
                          </div>
                        ) : (
                          <div
                            className="like-down-box"
                            onClick={() => deleteWishListItem(pro)}
                          >
                            <svg className="icon">
                              <use href="#icon_like"></use>
                            </svg>
                          </div>
                        )}
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
                            src={
                              pro?.product_image[0]?.image_file
                                ? `${process.env.NEXT_PUBLIC_MEDIA}${pro?.product_image[0]?.image_file}`
                                : no_image
                            }
                            alt="..."
                          />
                        </div>
                      </div>
                      <p className="card-text">{pro?.product_name}</p>
                      <span className="badge text-bg-primary p-2 px-3 me-2">
                        {pro?.avg_ratting} &#9733;
                      </span>
                      <span>({pro?.total_ratting})</span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* Slider End */}

      <div className="">
        <div className="container">
          <div className="row pb-2">
            <div className="col-12 line-heading text-center">
              <h3>Browse All Products From {brand?.brand_name}</h3>
            </div>
            <div className="col-12 text-center text-md-end pt-4">
              <p className="fw-bold">Total Items: {products?.data.length}</p>
            </div>
          </div>

          {products?.data.map((pro, pro_index) => (
            <div className="d-flex justify-content-center pb-5" key={pro_index}>
              <div className="col-sm-12 col-lg-9 mb-3">
                <div className="card-shadow rounded-2 p-4 sm-w-100 lg-w-75 w-100">
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="fw-bold fs-18 p-0 m-0 me-2">
                      {pro?.product_name}
                    </p>
                    {!findInWishlist(pro) ? (
                      <div
                        className="like-down-box"
                        onClick={() => {
                          submitWishListButton(pro);
                        }}
                      >
                        <svg className="icon">
                          <use href="#icon_like-dull"></use>
                        </svg>
                      </div>
                    ) : (
                      <div
                        className="like-down-box"
                        onClick={() => deleteWishListItem(pro)}
                      >
                        <svg className="icon">
                          <use href="#icon_like"></use>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="d-flex py-2">
                    <span className="fs-6 fw-bold me-2">by</span>
                    <span
                      className="fs-6 fw-bold text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(`/shop_by_brand/${brand?.brand_slug}`)
                      }
                    >
                      {brand.brand_name}
                    </span>
                  </div>
                  <div className="d-flex pb-3">
                    <div>
                      <span className="badge text-bg-primary p-2 px-3 me-2">
                        {pro?.avg_ratting} &#9733;
                      </span>
                      <span className="fw-bold">
                        {pro?.total_ratting} Ratings & {pro?.total_review}{" "}
                        Reviews{" "}
                      </span>
                    </div>
                  </div>
                  <p>
                    {pro?.product_short_description.slice(0, 125)}{" "}
                    {pro?.product_short_description.length > 125 && <>...</>}
                  </p>

                  <div className="row">
                    <div className="col-lg-4 col-sm-12 d-flex justify-content-center">
                      <Image
                        width={180}
                        height={180}
                        src={
                          pro?.product_image[0]?.image_file
                            ? `${process.env.NEXT_PUBLIC_MEDIA}${pro?.product_image[0]?.image_file}`
                            : no_image
                        }
                        alt="..."
                      />
                    </div>
                    <div
                      className="col-lg-8 col-sm-12 d-flex align-items-center"
                      style={{ textAlign: "justify" }}
                    >
                      {pro?.product_variant?.product_feature}
                    </div>
                  </div>
                  <div className="row d-flex align-items-center">
                    <div className="form-check py-2 col-lg-6 col-sm-12 my-3 ">
                      <input
                        className="form-check-input rounded-0 "
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label text-secondary"
                        for="flexCheckDefault"
                      >
                        Add to compare
                      </label>
                    </div>
                    <div className="col-lg-6 d-flex  align-items-center col-sm-12 mb-2 ">
                      <div className="text-center text-md-end w-100 ">
                        <button
                          type="button"
                          className="btn btn-primary px-4 py-2"
                          onClick={() => {
                            if (pro?.product_variant) {
                              router.push(
                                `/product_detail/${brandId}/${pro?.product_variant?.variant_permlink}`
                              );
                            }
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const brandId = params.brandId;
    // console.log(params);
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}brand`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        brand_slug: brandId,
      },
    });
    if (response.data.status != false) {
      // console.log(response);
      return {
        props: {
          data: response.data,
        },
      };
    }
  } catch (error) {
    // console.log(error);
    return {
      props: {},
    };
  }
}
