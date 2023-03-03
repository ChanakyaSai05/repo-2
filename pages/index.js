import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Container, Nav, Tab, Col, Row, Dropdown } from "react-bootstrap";
import Headerlanding from "../components/headerlanding";
import Footer from "../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import maternityCare from "../public/images/maternity-care.svg";
import respiratoryCare from "../public/images/respiratory-care.svg";
import diabaticCare from "../public/images/diabetic-care.svg";
import mobility from "../public/images/mobility.svg";
import medicalImg1 from "../public/images/medical-img-1.svg";
import medicalImg2 from "../public/images/medical-img-2.svg";
import medicalImg3 from "../public/images/medical-img-3.svg";
import medicalImg4 from "../public/images/medical-img-4.svg";
import medicalImg5 from "../public/images/medical-img-5.svg";
import medicalImg6 from "../public/images/medical-img-6.svg";
import medicalImg7 from "../public/images/medical-img-7.svg";
import medicalImg8 from "../public/images/medical-img-8.svg";
import cardImg1 from "../public/images/card-img1.svg";
import cardImg2 from "../public/images/card-img2.svg";
import cardImg3 from "../public/images/card-img3.svg";
import cardImg4 from "../public/images/card-img4.svg";
import janzmomsLogo from "../public/images/janzmoms-logo.svg";
import serviceImg1 from "../public/images/service-img1.svg";
import serviceImg2 from "../public/images/service-img2.svg";
import helpYou from "../public/images/help-you.svg";
import insuranceImg1 from "../public/images/insurance/insurance-img1.svg";
import insuranceImg2 from "../public/images/insurance/insurance-img2.svg";
import insuranceImg3 from "../public/images/insurance/insurance-img3.svg";
import insuranceImg4 from "../public/images/insurance/insurance-img4.svg";
import brand1 from "../public/images/brand/brand1.svg";
import brand6 from "../public/images/brand/brand6.svg";
import brand2 from "../public/images/brand/brand2.svg";
import brand7 from "../public/images/brand/brand7.svg";
import brand3 from "../public/images/brand/brand3.svg";
import brand8 from "../public/images/brand/brand8.svg";
import brand4 from "../public/images/brand/brand4.svg";
import brand5 from "../public/images/brand/brand5.svg";
import brand10 from "../public/images/brand/brand10.svg";
import customerImg2 from "../public/images/customer-img2.svg";
import no_image from "../public/images/no_image.jpg";

import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, set_data_fetched } from "../features/userSlice";
import { getWishListDetails } from "../components/FunctionCalls";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props) {
  const context = useContext(UserContext);
  const { productsData, setProductsData, getCartItemsFn, cartItems } = context;
  const router = useRouter();
  const { diabaticCare, maternityCare, respiratoryCare, mobility } =
    props?.images;
  const [productsBrandsUpdatedImages, setproductsBrandsUpdatedImages] =
    useState([]);
  // console.log(props, "props");
  const selectedUser = useSelector(selectUser);
  const dispatch = useDispatch();
  // console.log(selectedUser, "select user");
  console.log(productsData);

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

  let sliderfive = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:
      productsData?.insurance?.length >= 5
        ? 5
        : productsData?.insurance?.length,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow:
            productsData?.insurance?.length >= 5
              ? 3
              : productsData?.insurance?.length,
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
  let sliderfive2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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

  useEffect(() => {
    let productsDataBrandsUpdated = [];
    let length = productsData?.brands?.length;
    let half = Math.floor(length / 2);
    for (let i = 0; i < half; i++) {
      let obj = {};
      obj["first"] = productsData?.brands[i];
      if (i + half < length) {
        obj["second"] = productsData?.brands[i + half];
      } else {
        obj["second"] = {};
      }
      productsDataBrandsUpdated.push(obj);
    }
    setproductsBrandsUpdatedImages(productsDataBrandsUpdated);
    // console.log(productsDataBrandsUpdated, "updated");
  }, [productsData?.brands?.length]);
  //

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
      <div className="slider-box">
        <div
          id="carouselExampleDark"
          className="carousel slide carousel-main bg-black"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            >
              Maternity Care
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            >
              Respiratory Care
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            >
              Diabetic Care
            </button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            >
              Mobility
            </button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="10000">
              <Image
                className="carousel-img opacity-50"
                width={4320}
                height={1890}
                src={maternityCare?.src}
                alt="..."
              />
              <div className="carousel-caption-box container">
                <div className="">
                  <h1 className="">
                    MATERNITY CARE FOR
                    <br /> NEW MOMS
                  </h1>
                  <p>
                    We carry a wide range of maternity care products, so you
                    have one less <br />
                    thing to worry about as your family grows. From breast
                    pumps, refill bags
                    <br /> and accessories, we have you covered.
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <Image
                width={4320}
                height={1890}
                src={respiratoryCare?.src}
                className="carousel-img opacity-50"
                alt="..."
              />
              <div className="carousel-caption-box container">
                <div className="">
                  <h1 className="">RESPIRATORY CARE</h1>
                  <p>
                    Janz provides a full line of respiratory products and
                    supplies, including
                    <br />
                    sleep apnea CPAPs, masks, circuits, CPAP cleaning equipment
                    vaporizers,
                    <br />
                    nebulizers and etc. .
                  </p>
                  {/* <button type="button" className="btn btn-primary">Diabetic Care</button> */}
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <Image
                width={4320}
                height={1890}
                src={diabaticCare?.src}
                className="carousel-img opacity-50"
                alt="..."
              />
              <div className="carousel-caption-box container">
                <div className="">
                  <h1 className="">DIABETIC CARE</h1>
                  <p>
                    At JANZ Medical Supply, we understand that managing diabetes
                    <br /> is a daily struggle. That&apos;s why we have taken
                    the time to find and
                    <br /> procure all the necessary supplies to ensure your
                    glucose levels
                  </p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <Image
                width={4320}
                height={1890}
                src={mobility?.src}
                className="carousel-img opacity-50"
                alt="..."
              />
              <div className="carousel-caption-box container">
                <div className="">
                  <h1 className="">MOBILITY</h1>
                  <p>
                    Injury or age can cause issues for mobility. Mobility care
                    enables
                    <br /> a patient to have the confidence to get to where they
                    need to go
                    <br />
                    and to support them while doing daily chores or simply
                    resting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blue-btn-box">
        <Container>
          <div className="row row-cols-1 row-cols-md-3 py-3">
            <div className="col d-flex justify-content-center py-2">
              <button type="button" className="w-100">
                <svg className="icon">
                  <use href="#icon_store"></use>
                </svg>
                Find Your JANZ Store
              </button>
            </div>
            <div className="col d-flex justify-content-center py-2">
              <button type="button" className="w-100">
                <svg className="icon">
                  <use href="#icon_refill"></use>
                </svg>
                FSA/HSA
              </button>
            </div>
            <div className="col d-flex justify-content-center py-2">
              <button
                type="button"
                className="w-100"
                onClick={() => router.push("/insurance_accepted/tricare")}
              >
                <svg className="icon">
                  <use href="#icon_refill"></use>
                </svg>
                Tricare
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="medical-supplier">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 line-heading text-center">
              <h3>Medical Supplies and Equipments at Zero Cost</h3>
              <p className="large-para">
                With tricare insurance you can get a product absolutely at zero
                price
              </p>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-4 py-5">
            {productsData?.categories?.map((item, index) => (
              <div className="col my-2" key={index}>
                <div className="card-box">
                  <Image
                    width={296}
                    height={300}
                    src={
                      item?.category_image
                        ? `${process.env.NEXT_PUBLIC_MEDIA}${item?.category_image}`
                        : no_image
                    }
                    alt="..."
                  />
                  <h5>{item?.category_name}</h5>
                  <ul>
                    {item.children?.map((child, child_index) => (
                      <li key={child_index}>
                        <Link
                          href={`/category/${item?.category_slug}/${child?.category_slug}`}
                        >
                          {child?.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/category/${item?.category_slug}`)
                    }
                  >
                    Show more
                  </button>
                </div>
              </div>
            ))}

            {/* <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={medicalImg2} alt="..." />
                <h5>Respiratory Care</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={medicalImg3} alt="..." />
                <h5>Diabetic Care</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={296} src={medicalImg4} alt="..." />
                <h5>Mobility</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={medicalImg5} alt="..." />
                <h5>Daily Aids</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={medicalImg6} alt="..." />
                <h5>Health Devices</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={medicalImg7} alt="..." />
                <h5>Physical Therapy</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={296} src={medicalImg8} alt="..." />
                <h5>Support Bands and Braces</h5>
                <ul>
                  <li>
                    <a href="#">Sub category 01</a>
                  </li>
                  <li>
                    <a href="#">Sub category 02</a>
                  </li>
                  <li>
                    <a href="#">Sub category 03</a>
                  </li>
                  <li>
                    <a href="#">Sub category 04</a>
                  </li>
                  <li>
                    <a href="#">Sub category 05</a>
                  </li>
                  <li>
                    <a href="#">Sub category 06</a>
                  </li>
                </ul>
                <button type="button">Show more</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Slider 1*/}
      <div className="container pb-5">
        <div className="row pb-5">
          <div className="col-12 line-heading text-center">
            <h3>Suggested For You</h3>
            <p className="large-para">
              Similar item you have searched in your last visit
            </p>
          </div>
        </div>
        <div className="row">
          <div className="12">
            <Slider {...settings}>
              {productsData?.suggested_products?.map(
                (product, product_index) => (
                  <div key={product_index}>
                    {product?.products &&
                      product?.products?.map(
                        (sub_product, sub_product_index) => (
                          <div className="card" key={sub_product_index}>
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
                                    src={
                                      sub_product?.product_image[0]?.image_file
                                        ? `${process.env.NEXT_PUBLIC_MEDIA}${sub_product?.product_image[0]?.image_file}`
                                        : no_image
                                    }
                                    alt="..."
                                  />
                                </div>
                              </div>
                              <p className="card-text">
                                {sub_product?.product_name}
                              </p>
                              <span className="badge text-bg-primary p-2 px-3 me-2">
                                {sub_product?.avg_ratting} &#9733;
                              </span>
                              <span>({sub_product?.total_ratting})</span>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                )
              )}
            </Slider>
          </div>
        </div>
      </div>
      {/* Slider End */}

      <div className="services-box py-5">
        <div className="container position-relative">
          <div className="janzmomlogo">
            <Image width={160} height={120} src={janzmomsLogo} alt="..." />
          </div>
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>Services We Offer</h3>
              <p className="large-para">
                We provide maternity service through our janzmoms.com
              </p>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2">
            <div className="col py-2">
              <div className="service-img-box">
                <Image width={620} height={300} src={serviceImg1} alt="..." />
                <div className="txt-box">
                  <h4>Lactation Support Mother pumping</h4>
                  <p className="pt-3">
                    Need pumping support?
                    <br />
                    &quot;JANZ has certified IBCLC providers that can help you
                    <br /> navigate your way.&quot;
                  </p>
                </div>
              </div>
              <a
                className="btn btn-danger my-4 px-3 "
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "fit-content",
                }}
              >
                {" "}
                Learn more
              </a>
            </div>
            <div className="col py-2">
              <div className="service-img-box">
                <Image width={620} height={300} src={serviceImg2} alt="..." />
                <div className="txt-box">
                  <h4>Doula Support</h4>
                  <p className="pt-3">
                    The benefits of having emotional, physical and informational
                    support have been shown to help with better birth outcomes.
                    Doulas will also support births at a hospital, home or birth
                    center.
                  </p>
                </div>
              </div>
              <a
                className="btn btn-danger my-4 px-3"
                style={{
                  display: "block",
                  margin: "0 auto",
                  width: "fit-content",
                }}
              >
                {" "}
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="order-step-box">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>How JANZ Medical Can Help You</h3>
              <p className="large-para">
                Order your medical products in 3 easy steps{" "}
              </p>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3">
            <div className="col py-2 text-center">
              <div className="d-flex justify-content-center">
                <div className="icon-box">
                  <svg className="icon">
                    <use href="#icon_choose-product"></use>
                  </svg>
                </div>
              </div>
              <h5 className="py-2">Choose a product</h5>
              <p>
                Register, browse and choose the product you would like to order
              </p>
            </div>
            <div className="col py-2 text-center">
              <div className="d-flex justify-content-center">
                <div className="icon-box">
                  <svg className="icon">
                    <use href="#icon_checkout"></use>
                  </svg>
                </div>
              </div>
              <h5 className="py-2">Checkout</h5>
              <p>
                We will need your insurance information and RX. We will check
                eligibility to get your item covered to lower or eliminate
                out-of-pocket expenses.
              </p>
            </div>
            <div className="col py-2 text-center">
              <div className="d-flex justify-content-center">
                <div className="icon-box">
                  <svg className="icon">
                    <use href="#icon_shipped"></use>
                  </svg>
                </div>
              </div>
              <h5 className="py-2">Shipped</h5>
              <p>
                We ship directly to you, APO/FPO or In Store Pickup. We file the
                paperwork on your behalf and alert you when you are eligible for
                resupplies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="helpyou-img-box">
        <Image width={2880} height={684} src={helpYou} alt="..." />
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-12 d-flex py-4">
              <p className="d-flex align-self-center">
                We ship to you Where ever your duty station JANZ Medical Supply
                can ship to you. JANZ has over 30 locations worldwide. Wherever
                you are located, we are here to help you get the supplies you
                need. When you ETS stateside we will help you through the
                process of changing your insurance so you can continue to get
                the supplies you need back home. You are part of the JANZ family
                no matter where you are
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="insurance">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>Insurance Accepted</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Slider {...sliderfive}>
                {productsData?.insurance?.map((item, index) => (
                  <div key={index} className="d-flex justify-content-center">
                    <div
                      className="insurance-card"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        router.push(
                          `/insurance_accepted/${item.insurance_slug}`
                        )
                      }
                    >
                      <Image
                        width={120}
                        height={60}
                        src={
                          item.insurance_image
                            ? `${process.env.NEXT_PUBLIC_MEDIA}${item.insurance_image}`
                            : no_image
                        }
                        alt="..."
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className="brand-box">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>Shop By Brand</h3>
              <p className="large-para">
                We have partnered with some of the leading brands across the
                globe
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Slider {...sliderfive2}>
                {productsBrandsUpdatedImages?.map((item, index) => (
                  <div className="d-flex justify-content-center" key={index}>
                    <div>
                      <div
                        className="insurance-card mb-5"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          router.push(
                            `/shop_by_brand/${item["first"]?.brand_slug}`
                          )
                        }
                      >
                        {item["first"]?.brand_image != null && (
                          <Image
                            width={199}
                            height={157}
                            src={
                              item["first"]?.brand_image
                                ? `${process.env.NEXT_PUBLIC_MEDIA}${item["first"]?.brand_image}`
                                : no_image
                            }
                            alt="..."
                          />
                        )}
                      </div>
                      {Object.keys(item["second"]).length > 0 && (
                        <div
                          className="insurance-card"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            router.push(
                              `/shop_by_brand/${item["second"]?.brand_slug}`
                            )
                          }
                        >
                          {item["second"]?.brand_image != null && (
                            <Image
                              width={199}
                              height={157}
                              src={
                                item["second"]?.brand_image
                                  ? `${process.env.NEXT_PUBLIC_MEDIA}${item["second"]?.brand_image}`
                                  : no_image
                              }
                              alt="..."
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      images: {
        maternityCare,
        respiratoryCare,
        diabaticCare,
        mobility,
      },
    },
  };
}
