import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Slider from "react-slick";
import { Inter } from "@next/font/google";
// import styles from "../styles/Home.module.css";
import { Container, Nav, Tab, Col, Row, Dropdown } from "react-bootstrap";
import Headerlanding from "../../../../components/headerlanding";
import Footer from "../../../../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import subCategoryHero from "../../../../public/images/sub-category-hero.svg";
import subCateg1 from "../../../../public/images/sub-categ1.svg";
import subCateg2 from "../../../../public/images/sub-categ2.svg";
import subCateg3 from "../../../../public/images/sub-categ3.svg";
import subCateg4 from "../../../../public/images/sub-categ4.svg";
import subCateg5 from "../../../../public/images/sub-categ5.svg";
import subCateg6 from "../../../../public/images/sub-categ6.svg";
import cardImg1 from "../../../../public/images/card-img1.svg";
import cardImg2 from "../../../../public/images/card-img2.svg";
import cardImg3 from "../../../../public/images/card-img3.svg";
import cardImg4 from "../../../../public/images/card-img4.svg";
import no_image from "../../../../public/images/no_image.jpg";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import UserContext from "../../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, set_data_fetched } from "../../../../features/userSlice";
import { getWishListDetails } from "../../../../components/FunctionCalls";
// import video from "../public/images/video.svg";

const inter = Inter({ subsets: ["latin"] });

export default function Subcategory(props) {
  const router = useRouter();
  const params = router.query;
  const { categoryId, sub_categoryId } = params;
  const context = useContext(UserContext);
  const { getCartItemsFn, cartItems } = context;
  const dispatch = useDispatch();
  const selectedUser = useSelector(selectUser);
  // console.log(props, "props");
  const hero = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  const [isPlaying, setIsPlaying] = useState(false);
  const handlePlayPause = (id) => {
    const vb = document.getElementById(id);
    if (isPlaying === false) {
      vb.play();
    } else {
      vb.pause();
    }
    setIsPlaying(!isPlaying);
  };
  const [isPlaying2, setIsPlaying2] = useState(false);
  const handlePlayPause2 = (id) => {
    const vb = document.getElementById(id);
    if (isPlaying === false) {
      vb.play();
    } else {
      vb.pause();
    }
    setIsPlaying2(!isPlaying2);
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
          product_variant_id: sub_product?.product_variants[0]
            ?.product_variant_id
            ? sub_product?.product_variants[0]?.product_variant_id
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
      <div className="slider-box-category">
        <Slider {...hero}>
          {props?.categories?.category_banner?.map((item, index) => (
            <div className="slider-content" key={index}>
              <Image
                width={4320}
                height={1890}
                src={
                  item?.banner_image
                    ? `${process.env.NEXT_PUBLIC_MEDIA}${item?.banner_image}`
                    : no_image
                }
                className="carousel-img opacity-50"
                alt="..."
              />
              <Container className="h-100">
                <div className="row h-100 d-flex align-items-center">
                  <div className="col-md-6 col-sm-12 text-white">
                    <h1>{item?.banner_title}</h1>
                    <p>{item?.banner_description}</p>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </Slider>
      </div>

      <div className="">
        <Container>
          <div className="row">
            <div className="col-12 pt-3 pb-2">
              <nav className="breadcrumb-wrap" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={`/category/${categoryId}`}>{categoryId}</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {sub_categoryId}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-12 line-heading text-center mb-5">
              <h3>About {props?.categories?.category_name}</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 py-4">
              <p style={{ textAlign: "justify" }}>
                {props?.categories?.category_content?.replace(/<\/?p>/g, "")}
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="medical-supplier">
        <div className="container py-5">
          <div className="row row-cols-1 row-cols-md-4">
            {props?.categories?.subcategory?.map((item, index) => (
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
                  <Link
                    href={`/category/${categoryId}/${sub_categoryId}/${item?.category_slug}`}
                  >
                    <button type="button">Show more</button>
                  </Link>
                </div>
              </div>
            ))}
            {/* <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={subCateg1} alt="..." />
                <h5>Double Electric Pump</h5>
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/category/${categoryId}/${sub_categoryId}/category_filter`
                    )
                  }
                >
                  Show more
                </button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={subCateg2} alt="..." />
                <h5>Hospital Grade Pumps</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={subCateg3} alt="..." />
                <h5>Dual Motor Pumps</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={296} src={subCateg4} alt="..." />
                <h5>Hand Free Pumps</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={subCateg5} alt="..." />
                <h5>Manual Pumps</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={subCateg6} alt="..." />
                <h5>Portable Pumps</h5>
                <button type="button">Show more</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Slider 1*/}
      <div className="category-slider-box">
        <div className="container py-5">
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>Featured Products</h3>
            </div>
          </div>
          <div className="row">
            <div className="12">
              <Slider {...settings}>
                {props?.products?.map((product, product_index) => (
                  <div key={product_index}>
                    {product?.products?.map(
                      (sub_product, sub_product_index) => (
                        <div className="card" key={sub_product_index}>
                          <div className="card-bodys">
                            <div className="d-flex justify-content-between">
                              {!findInWishlist(sub_product) ? (
                                <div
                                  className="like-down-box"
                                  onClick={() => {
                                    submitWishListButton(sub_product);
                                  }}
                                >
                                  <svg className="icon">
                                    <use href="#icon_like-dull"></use>
                                  </svg>
                                </div>
                              ) : (
                                <div
                                  className="like-down-box"
                                  onClick={() => {
                                    deleteWishListItem(sub_product);
                                  }}
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
                ))}
                {/* <>
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
                        <span>1</span>
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
                        <span>1</span>
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
               </> */}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* Slider End */}

      <Container>
        <div className="row py-5">
          <div className="col-12 my-5 line-heading text-center">
            <h3>How to Choose Best Electric Pump</h3>
          </div>
          <div className="col-12">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget
              malesuada augue. Nam at enim at metus consequat porttitor in eu
              augue. Phasellus gravida quam et sem pretium, sed bibendum nulla
              imperdiet. Interdum et malesuada fames ac ante ipsum primis in
              faucibus. Maecenas eu tempus diam. Sed velit orci, ultricies vel
              mauris eget, mollis fringilla sem.
            </p>
          </div>
          <div className="col-12 my-5 line-heading text-center">
            <h3>Breast Pumps FAQs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item py-2">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    What type of Breast Pump CAN I CHOOSE FROM?
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris ut risus est. Maecenas eget feugiat mauris. Morbi
                    sagittis, neque ac vehicula consectetur, quam augue
                    sollicitudin enim, molestie convallis purus purus luctus
                    libero
                  </div>
                </div>
              </div>
              <div className="accordion-item py-2">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    What are the pros and cons of electronic breast pump?
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the second item&apos;s accordion body. Let&apos;s imagine
                    this being filled with some actual content.
                  </div>
                </div>
              </div>
              <div className="accordion-item py-2">
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    What are the pros and cons of Manual breast pump?
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> class. This is
                    the third item&apos;s accordion body. Nothing more exciting
                    happening here in terms of content, but just filling up the
                    space to make it look, at least at first glance, a bit more
                    representative of how this would look in a real-world
                    application.
                  </div>
                </div>
              </div>
              <div className="accordion-item py-2">
                <h2 className="accordion-header" id="flush-headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseFour"
                    aria-expanded="false"
                    aria-controls="flush-collapseFour"
                  >
                    Is IT safe more me to use someone else’s breast pump or a
                    used pump?
                  </button>
                </h2>
                <div
                  id="flush-collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingFour"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aspernatur odio, vitae, magnam odit sed commodi, optio sint
                    veniam tenetur nesciunt eligendi ipsam in impedit possimus
                    earum minus nulla mollitia deleniti?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="category-slider-box py-5">
        <Container>
          <div className="row pb-5">
            <div className="col-12 line-heading text-center">
              <h3>Breast Pumps Video Guide</h3>
            </div>
          </div>

          <div className="row pb-4">
            <div className="col-md-5 col-lg-4 col-sm-12 pb-3">
              <div className="video-box" data-pp={isPlaying}>
                <video
                  className="video"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  controls={isPlaying}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  id="vb1"
                />
                <button type="button" onClick={() => handlePlayPause("vb1")}>
                  {/* {isPlaying && 'Hello'} */}
                  <svg className="icon pause">
                    <use href="#icon_pause"></use>
                  </svg>
                  <svg className="icon play">
                    <use href="#icon_play"></use>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-sm-12 pb-3">
              <div>
                <p className="fw-bold m-0">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <p>
                  adipiscing elit. Ut eget malesuada augue. Nam at enim at metus
                  consequat porttitor in eu augue. Phasellus gravida quam et sem
                  pretium, sed bibendum nulla imperdiet. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus. Maecenas eu tempus
                  diam. Sed velit orci, ultricies vel mauris eget, mollis
                  fringilla sem.Nam at enim at metus consequat porttitor in eu
                  augue. Phasellus gravida quam et sem pretium, sed bibendum
                  nulla imperdiet.Nam at enim at metus consequat porttitor in eu
                  augue
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 col-lg-4 col-sm-12 pb-3 order-md-1">
              <div className="video-box" data-pp={isPlaying2}>
                <video
                  className="video"
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  controls={isPlaying2}
                  onPlay={() => setIsPlaying2(true)}
                  onPause={() => setIsPlaying2(false)}
                  id="vb2"
                />
                <button type="button" onClick={() => handlePlayPause2("vb2")}>
                  {/* {isPlaying && 'Hello'} */}
                  <svg className="icon pause">
                    <use href="#icon_pause"></use>
                  </svg>
                  <svg className="icon play">
                    <use href="#icon_play"></use>
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-md-7 col-lg-8 col-sm-12 pb-3">
              <div>
                <p className="fw-bold m-0">
                  Lorem ipsum dolor sit amet, consectetur
                </p>
                <p>
                  adipiscing elit. Ut eget malesuada augue. Nam at enim at metus
                  consequat porttitor in eu augue. Phasellus gravida quam et sem
                  pretium, sed bibendum nulla imperdiet. Interdum et malesuada
                  fames ac ante ipsum primis in faucibus. Maecenas eu tempus
                  diam. Sed velit orci, ultricies vel mauris eget, mollis
                  fringilla sem.Nam at enim at metus consequat porttitor in eu
                  augue. Phasellus gravida quam et sem pretium, sed bibendum
                  nulla imperdiet.Nam at enim at metus consequat porttitor in eu
                  augue
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Footer></Footer>
    </>
  );
}
export async function getServerSideProps({ params }) {
  // console.log(params, "params");
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}category/details`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        category_slug: params.sub_categoryId,
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
