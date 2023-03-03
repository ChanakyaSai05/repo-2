import Head from "next/head";
import Image from "next/image";
import Slider from "react-slick";
import { Inter } from "@next/font/google";
// import styles from "../styles/Home.module.css";
import { Container, Nav, Tab, Col, Row, Dropdown } from "react-bootstrap";
import Headerlanding from "../../../components/headerlanding";
import Footer from "../../../components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import categoryHero from "../../../public/images/category-hero.svg";
import category1 from "../../../public/images/category1.svg";
import category2 from "../../../public/images/category2.svg";
import category3 from "../../../public/images/category3.svg";
import category4 from "../../../public/images/category4.svg";
import category5 from "../../../public/images/category5.svg";
import category6 from "../../../public/images/category6.svg";
import category7 from "../../../public/images/category7.svg";
import category8 from "../../../public/images/category8.svg";
import cardImg1 from "../../../public/images/card-img1.svg";
import cardImg2 from "../../../public/images/card-img2.svg";
import cardImg3 from "../../../public/images/card-img3.svg";
import cardImg4 from "../../../public/images/card-img4.svg";
import no_image from "../../../public/images/no_image.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, set_data_fetched } from "../../../features/userSlice";
import { getWishListDetails } from "../../../components/FunctionCalls";

const inter = Inter({ subsets: ["latin"] });

export default function Category(props) {
  const router = useRouter();
  const params = router.query;
  const { categoryId } = params;
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
    slidesToShow: 1,
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
          slidesToScroll: 1,
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
  // add to cart button
  const cartIconBtn = () => {
    // need to sent to local storage
  };
  return (
    <>
      <Headerlanding></Headerlanding>
      <div className="slider-box-category">
        <Slider {...hero}>
          {props?.categories?.category_banner?.map((banner, banner_index) => (
            <div className="slider-content" key={banner_index}>
              <Image
                width={4320}
                height={1890}
                src={
                  banner?.banner_image
                    ? `${process.env.NEXT_PUBLIC_MEDIA}${banner?.banner_image}`
                    : no_image
                }
                className="carousel-img opacity-50"
                alt="..."
              />
              <Container className="h-100">
                <div className="row h-100 d-flex align-items-center">
                  <div className="col-md-6 col-sm-12 text-white">
                    <h1>{banner?.banner_title}</h1>
                    <p>{banner?.banner_description}</p>
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
                  <li className="breadcrumb-item active" aria-current="page">
                    {categoryId}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-12 py-4">
              <p>
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
                  <Link href={`/category/${categoryId}/${item?.category_slug}`}>
                    <button type="button">Show more</button>
                  </Link>
                </div>
              </div>
            ))}

            {/*  <div className="col my-2">
            
              <div className="card-box">
                <Image width={296} height={300} src={category1} alt="..." />
                <h5>Maternity Care 22</h5>
                <Link href={`/category/${categoryId}/sub_category`}>
                  <button type="button">Show more</button>
                </Link>
              </div>
            </div>
           <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={category2} alt="..." />
                <h5>Respiratory Care</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={category3} alt="..." />
                <h5>Diabetic Care</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={296} src={category4} alt="..." />
                <h5>Mobility</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={category5} alt="..." />
                <h5>Daily Aids</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={category6} alt="..." />
                <h5>Health Devices</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={300} src={category7} alt="..." />
                <h5>Physical Therapy</h5>
                <button type="button">Show more</button>
              </div>
            </div>
            <div className="col my-2">
              <div className="card-box">
                <Image width={296} height={296} src={category8} alt="..." />
                <h5>Support Bands and Braces</h5>
                <button type="button">Show more</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Slider 1*/}
      <div className="category-slider-box">
        {props?.categories?.subcategory?.map(
          (sub_category, sub_category_index) => (
            <>
              {props?.products?.filter(
                (product) => product.category_id == sub_category.category_id
              ).length > 0 && (
                <div className="container py-5">
                  <div className="row pb-5">
                    <div className="col-12 line-heading text-center">
                      <h3>Featured {sub_category?.category_name}</h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="12">
                      <Slider {...settings}>
                        {props?.products
                          ?.filter(
                            (product) =>
                              product.category_id == sub_category.category_id
                          )
                          ?.map((product, product_index) => (
                            <>
                              {product?.products?.map(
                                (sub_product, sub_productIndex) => (
                                  <div
                                    className="card"
                                    key={sub_category_index}
                                  >
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
                                        <div
                                          className="download-box"
                                          onClick={() =>
                                            cartIconBtn(sub_product)
                                          }
                                        >
                                          <svg className="icon">
                                            <use href="#icon_loader"></use>
                                          </svg>
                                          <span>1</span>
                                        </div>
                                      </div>
                                      <div className="d-flex my-2 py-2 justify-content-center">
                                        <div className="card-img">
                                          <Image
                                            src={`${process.env.NEXT_PUBLIC_MEDIA}${sub_product?.product_image[0]?.image_file}`}
                                            alt=""
                                            width="159"
                                            height="160"
                                          />
                                        </div>
                                      </div>
                                      <p className="card-text">
                                        {sub_product?.product_name}
                                      </p>
                                      <span className="badge text-bg-primary p-2 px-3 me-2">
                                        {sub_product?.avg_ratting} &#9733;
                                      </span>
                                      <span>
                                        ({sub_product?.total_ratting})
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              )}
            </>
          )
        )}
      </div>
      {/* Slider End */}

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

      <Footer></Footer>
    </>
  );
}

export async function getServerSideProps({ params }) {
  // console.log(params.categoryId, "params");
  // console.log("before axios call");
  // get method is not possible in the dynamic page in this folder []
  // const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}category/details`);
  try {
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}category/details`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        category_slug: params.categoryId,
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
