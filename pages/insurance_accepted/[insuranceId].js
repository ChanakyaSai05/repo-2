import React, { useContext, useEffect, useState } from "react";
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
// import cardImg1 from "../public/images/card-img1.svg";
// import cardImg2 from "../public/images/card-img2.svg";
// import cardImg3 from "../public/images/card-img3.svg";
// import cardImg4 from "../public/images/card-img4.svg";
// import airminiImg from "../public/images/air-mini.svg";
// import fullmask2 from "../public/images/fullmask2.svg";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Product(props) {
  const context = useContext(UserContext);
  const { getCartItemsFn } = context;
  const selectedUser = useSelector(selectUser);
  const router = useRouter();
  const params = router.query;
  const { insuranceId } = params;
  const { insurance } = props.data;
  // console.log(insurance);

  const [editCancel, setEditCancel] = useState(false);
  let array = [
    {
      insurance_faq_id: 1,
      insurance_id: "2",
      insurance_question: "Test Question",
      insurance_answer: "Answer of test Question",
      create_at: null,
      updated_at: null,
      faq_status: "1",
    },
    {
      insurance_faq_id: 1,
      insurance_id: "2",
      insurance_question: "Test Question1",
      insurance_answer: "Answer of test Question1",
      create_at: null,
      updated_at: null,
      faq_status: "1",
    },
    {
      insurance_faq_id: 1,
      insurance_id: "2",
      insurance_question: "Test Question2",
      insurance_answer: "Answer of test Question2",
      create_at: null,
      updated_at: null,
      faq_status: "1",
    },
    {
      insurance_faq_id: 1,
      insurance_id: "2",
      insurance_question: "Test Question3",
      insurance_answer: "Answer of test Question3",
      create_at: null,
      updated_at: null,
      faq_status: "1",
    },
  ];
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
          <div className="row">
            <div className="col-12 pt-3 pb-2">
              <nav className="breadcrumb-wrap" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {insuranceId}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-12 line-heading text-center">
              <h3>{insurance.insurance_name}</h3>
            </div>
            <div className="col-12 pt-4">
              <p>{insurance?.insurance_content}</p>
            </div>
            {/* <div className="col-12 pt-4">
              <h4 className="pb-3">Lorem ipsum dolor sit amet, consectetur </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                elementum accumsan interdum. Sed tempus, dolor vel interdum
                tempor, justo ligula molestie lorem, quis luctus purus lorem ac
                sapien. Donec sit amet consequat enim, ac finibus sem. Quisque
                facilisis ex a ante pretium, eget fermentum mauris mollis.
                Suspendisse potenti. Ut pharetra lorem ligula, nec tempus ante
                faucibus a. Suspendisse faucibus placerat faucibus. Donec erat
                ipsum, semper non dapibus in, placerat ac massa. Etiam
                scelerisque rhoncus lectus sit amet malesuada. Vivamus mollis
                leo et lectus finibus vestibulum. Nam id lectus nibh.
              </p>
              <ul className="ps-3">
                <li className="pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  elementum accumsan interdum.
                </li>
                <li className="pb-2">
                  Lorem ipsum dolor sit amet, consectetur
                </li>
                <li className="pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  elementum
                </li>
                <li className="pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  elementum accumsan interdum.
                </li>
                <li className="pb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
              </ul>
            </div>
            <div className="col-12 pt-4">
              <h4 className="pb-3">Lorem ipsum dolor sit amet, consectetur </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                elementum accumsan interdum. Sed tempus, dolor vel interdum
                tempor, justo ligula molestie lorem, quis luctus purus lorem ac
                sapien. Donec sit amet consequat enim, ac finibus sem. Quisque
                facilisis ex a ante pretium, eget fermentum mauris mollis.
                Suspendisse potenti. Ut pharetra lorem ligula, nec tempus ante
                faucibus a. Suspendisse faucibus placerat faucibus. Donec erat
                ipsum, semper non dapibus in, placerat ac massa. Etiam
                scelerisque rhoncus lectus sit amet malesuada. Vivamus mollis
                leo et lectus finibus vestibulum. Nam id lectus nibh.
              </p>
              <p>
                Duis ut auctor nulla. Suspendisse potenti. In varius, felis ut
                tristique egestas, urna erat vestibulum velit, ut auctor metus
                ante a urna. Donec justo quam, tincidunt ac dui id, vehicula
                commodo lorem. Nam accumsan ultrices purus, vitae molestie
                mauris aliquet nec. Suspendisse gravida nec orci non tincidunt.
                Vivamus et tristique felis.
              </p>
            </div>
            <div className="col-12 pt-4">
              <h4 className="pb-3">Lorem ipsum dolor sit amet, consectetur </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                elementum accumsan interdum. Sed tempus, dolor vel interdum
                tempor, justo ligula molestie lorem, quis luctus purus lorem ac
                sapien. Donec sit amet consequat enim, ac finibus sem. Quisque
                facilisis ex a ante pretium, eget fermentum mauris mollis.
                Suspendisse potenti. Ut pharetra lorem ligula, nec tempus ante
                faucibus a. Suspendisse faucibus placerat faucibus. Donec erat
                ipsum, semper non dapibus in, placerat ac massa. Etiam
                scelerisque rhoncus lectus sit amet malesuada. Vivamus mollis
                leo et lectus finibus vestibulum. Nam id lectus nibh.
              </p>
            </div> */}
          </div>
          <div className="row">
            <div className="col-12">
              <div
                className="accordion accordion-flush"
                id="accordionFlushExample"
              >
                {/* insurance?.insurance_faqs */}
                {insurance?.insurance_faqs.map((item, index) => (
                  <div className="accordion-item py-2" key={index}>
                    <h2
                      className="accordion-header"
                      id={`flush-heading${index + 1}`}
                    >
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#flush-collapse${index + 1}`}
                        aria-expanded={"false"}
                        aria-controls={`flush-collapse${index + 1}`}
                      >
                        {item?.insurance_question}
                      </button>
                    </h2>
                    <div
                      id={`flush-collapse${index + 1}`}
                      className={"accordion-collapse collapse"}
                      aria-labelledby={`flush-heading${index + 1}`}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        {item?.insurance_answer}
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="accordion-item py-2">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      Lorem ipsum dolor sit amet, consectetur
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    className="accordion-collapse collapse show"
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
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
                  <h2 className="accordion-header" id="flush-headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      Pellentesque posuere hendrerit arcu vel sollicitudin
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
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
                  <h2 className="accordion-header" id="flush-headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseFour"
                      aria-expanded="false"
                      aria-controls="flush-collapseFour"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
                      Aspernatur odio, vitae, magnam odit sed commodi, optio
                      sint veniam tenetur nesciunt eligendi ipsam in impedit
                      possimus earum minus nulla mollitia deleniti?
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const insuranceId = params.insuranceId;
    // console.log(params);
    const response = await axios({
      url: `${process.env.NEXT_PUBLIC_URL}insurance`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        insurance_slug: insuranceId,
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
