import React, { useState, useEffect } from "react";
import AuthService from "../../api/services/AuthService";
import LoaderHelper from "../../customComponent/Loading/LoaderHelper";
import {
  alertErrorMessage,
  alertSuccessMessage,
} from "../../customComponent/CustomAlertMessage";
import { $ } from "react-jquery-plugin";

const Header = () => {
  const emailId = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  // const uType = localStorage.getItem("uType");
  const [userBal, setUserBal] = useState("");
  const [amount, setAmount] = useState("");
  //const [password, setPassword] = useState("");
  const [utrNo, setUtrNo] = useState("");
  const [date, setDate] = useState("");

  const handleUserBal = async () => {
    LoaderHelper.loaderStatus(true);
    await AuthService.getUserBal().then(async (result) => {
      if (result.success) {
        try {
          LoaderHelper.loaderStatus(false);
          setUserBal(result.balance);
          //alertSuccessMessage(result.message);
        } catch (error) {
          LoaderHelper.loaderStatus(false);
          alertErrorMessage(error);
          console.log(error, "error");
        }
      } else {
        LoaderHelper.loaderStatus(false);
        // const errorMessage = result.message;
        alertErrorMessage(result.message);
      }
    });
  };

  useEffect(() => {
    handleUserBal();
  }, []);
  function Interval() {
    setTimeout(() => {
      handleUserBal();
    }, 15000);
  }
  useEffect(() => Interval(), []);
  const handleAddUserBalance = async (amount, utrNo, date) => {
    LoaderHelper.loaderStatus(true);
    await AuthService.addUserBalance(amount, utrNo, date).then(
      async (result) => {
        if (result.success) {
          try {
            LoaderHelper.loaderStatus(false);
            setAmount("");
            setUtrNo("");
            $("#addAmount").modal("hide");
            handleUserBal();
            alertSuccessMessage(result.message);
          } catch (error) {
            LoaderHelper.loaderStatus(false);
            alertErrorMessage(error);
            console.log(error, "error");
          }
        } else {
          LoaderHelper.loaderStatus(false);
          // const errorMessage = result.message;
          alertErrorMessage(result.message);
        }
      }
    );
  };
  return (
    <>
      <nav
        className="topnav navbar navbar-expand shadow justify-content-between justify-content-sm-start navbar-light bg-white"
        id="sidenavAccordion"
      >
        {/* <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0" id="sidebarToggle"><i data-feather="menu"></i></button> */}

        {/* <img src="assets/img/logo_footer.png" className="img-fluid" /> */}
        <h3 style={{ marginLeft: "70px" }}>Balance :- {parseFloat(userBal)?.toFixed(2)}</h3>

        <ul className="navbar-nav align-items-center ms-auto">
          <li className="nav-item dropdown no-caret dropdown-user me-3 me-lg-4">
            <a
              className="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownUserImage"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                className="img-fluid"
                src="assets/img/illustrations/profiles/profile-1.png"
              />
            </a>
            <div
              className="dropdown-menu dropdown-menu-end border-0 shadow animated--fade-in-up"
              aria-labelledby="navbarDropdownUserImage"
            >
              <h6 className="dropdown-header d-flex align-items-center">
                <img
                  className="dropdown-user-img"
                  src="assets/img/illustrations/profiles/profile-1.png"
                />
                <div className="dropdown-user-details">
                  <div className="dropdown-user-details-name">{name}</div>
                  <div className="dropdown-user-details-email">
                    <a href="#" className="__cf_email__">
                      {emailId}
                    </a>
                  </div>
                </div>
              </h6>
              <div className="dropdown-divider"></div>
              {/* <a className="dropdown-item" href="genral_settings.php">
                            <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                            Genral Settings
                        </a> */}
              <a className="dropdown-item" href="/">
                <div className="dropdown-item-icon">
                  <i data-feather="log-out"></i>
                </div>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      <div
        class="modal fade"
        id="addAmount"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Enter Amount
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                name="amount"
                placeholder="Enter Amount Here"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                name="utr"
                placeholder="Enter UTR No."
                value={utrNo}
                onChange={(e) => setUtrNo(e.target.value)}
              />
              <input
                type="date"
                className="form-control mt-2"
                name="date"
                placeholder="Enter Date Here"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleAddUserBalance(amount, utrNo, date)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
