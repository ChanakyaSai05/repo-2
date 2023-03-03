import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Greeting from "./Greeting";

export default function Asidebar() {
  const router = useRouter();
  const [timeOfDay, setTimeOfDay] = useState("");
  const [user, setUser] = useState("");
  const signOutBtn = () => {
    // console.log("INSIDE");
    localStorage.removeItem("janz_medical_login_token");
    localStorage.removeItem("janz_medical_user");
    router.push("/");
  };
  useEffect(() => {
    let userParsed = JSON.parse(localStorage.getItem("janz_medical_user"));
    setUser(userParsed?.customer_name);
  }, []);
  return (
    <>
      <aside className="left-aside">
        <div className="d-flex justify-content-center pt-4">
          <h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                // fontSize: "5px",
              }}
            >
              <Greeting />
              <div style={{ marginLeft: "5px" }}> {user}</div>
            </div>
          </h2>
        </div>
        <ul>
          <li>
            <Link href={"/my_order"} className="nav-link">
              <span>
                <svg className="icon">
                  <use href="#icon_kart"></use>
                </svg>
              </span>
              <strong>My Orders</strong>
            </Link>
          </li>
          <hr />
          <li>
            <Link href={"/subscription"} className="nav-link">
              <span>
                <svg className="icon">
                  <use href="#icon_subscription"></use>
                </svg>
              </span>
              <strong>Subscriptions</strong>
            </Link>
          </li>
          <hr />
          <li>
            <Link href={"/wishlist"} className="nav-link">
              <span>
                <svg className="icon">
                  <use href="#icon_like_asidebar"></use>
                </svg>
              </span>
              <strong>Wishlist</strong>
            </Link>
          </li>
          <hr />
          <li>
            <Link href={""} className="nav-link">
              <span>
                <svg className="icon">
                  <use href="#icon_user"></use>
                </svg>
              </span>
              <strong>Account Setting</strong>
            </Link>
          </li>
          <li>
            <Link href={"/profile_details"} className="nav-link">
              <strong className="small">Profile Details</strong>
            </Link>
          </li>
          <li>
            <Link href={"/insurance_details"} className="nav-link">
              <strong className="small">Insurance Details</strong>
            </Link>
          </li>
          <hr />
          <li>
            <div
              className="nav-link d-flex justify-content-between"
              onClick={signOutBtn}
            >
              <div className="d-flex  align-item-center">
                <div className="logout">
                  <span>
                    <svg className="icon">
                      <use href="#icon_signout"></use>
                    </svg>
                  </span>
                </div>
                <strong>Sign Out</strong>
              </div>
              <svg className="icon">
                <use href="#icon_arrow"></use>
              </svg>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
