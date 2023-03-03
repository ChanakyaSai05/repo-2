import Link from "next/link";
// import { useState } from "react";
import Image from "next/image";
import footer from "../public/images/footer-img.svg";
export function GetYear() {
  const date = new Date();
  const hour = date.getHours();
  const year = date.getFullYear();

  return <span>{year}</span>;
}
export default function Footer() {
  // const [publicPath] = useState(process.env.NEXT_PUBLIC_URL);

  return (
    <footer className="text-center text-lg-start pt-5">
      <Image width={1440} height={537} src={footer} alt="..." />
      <div className="container text-center text-md-start">
        <div className="row">
          <div className="col-md-2 col-sm-6 mx-auto mb-4">
            <h6 className="">JANZ</h6>
            <ul>
              <li>
                <Link href={"/store"} className="text-reset">
                  Shop
                </Link>
              </li>
              <li>
                <a className="text-reset">Store</a>
              </li>
              <li>
                <a className="text-reset">About Us</a>
              </li>
              <li>
                <a className="text-reset">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-6 mx-auto mb-4">
            <h6 className="">Insurances</h6>
            <ul>
              <li>
                <a className="text-reset">Tricare</a>
              </li>
              <li>
                <a className="text-reset">Insurance</a>
              </li>
              <li>
                <a className="text-reset">Insurance</a>
              </li>
              <li>
                <a className="text-reset">Insurance</a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-12 mx-auto mb-4">
            <h6 className="">Helpful Links</h6>
            <ul>
              <li>
                <Link href={""} className="text-reset">
                  How to buy
                </Link>
              </li>
              <li>
                <a className="text-reset">Refund Policy</a>
              </li>
              <li>
                <a className="text-reset">Terms of use</a>
              </li>
              <li>
                <a className="text-reset">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-12 mx-auto mb-4">
            <form className="my-3">
              <input
                className="py-2 px-3 w-100 rounded form-control"
                type="email"
                placeholder="Enter your email id"
              />
              <p className="pt-3">By subscribing to our newsletter you</p>
              <div className="">
                <button
                  type="button"
                  className="btn btn-danger text-white px-3 my-2"
                >
                  Subscribe Now
                </button>
              </div>
              <div className="social-icon py-2">
                <a className="me-3 instagram">
                  <svg className="icon">
                    <use href="#icon_instagram"></use>
                  </svg>
                </a>
                <a className="me-3 facebook">
                  <svg className="icon">
                    <use href="#icon_facebook"></use>
                  </svg>
                </a>
                <a className="me-3 linkedin">
                  <svg className="icon">
                    <use href="#icon_linkedin"></use>
                  </svg>
                </a>
                <a className="me-3 youtube">
                  <svg className="icon">
                    <use href="#icon_youtube"></use>
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>
        <hr />
      </div>
      <div className="text-center p-4">
        <p className="m-0">
          Copyright © JANZ Medical Supply 1999-
          <GetYear />
        </p>
      </div>
    </footer>
  );
}
