import React from "react";
import BreadCrumbs from "../../components/common/BreadCrumbs";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import SettingProfile from "../../components/user/SettingProfile";
import SettingPassword from "../../components/user/SettingPassword";
import SettingAccount from "../../components/user/SettingAccount";

import PersonIcon from "@material-ui/icons/Person";
import SettingsIcon from "@material-ui/icons/Settings";
import HttpsIcon from "@material-ui/icons/Https";

const Setting = () => {
  return (
    <Layout>
      <BreadCrumbs breads={[<Link to="/setting">Setting</Link>]} />

      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1">
                  <a
                    href="#profile"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded active"
                  >
                    <PersonIcon className="mr-2" />
                    프로필
                  </a>
                  <a
                    href="#account"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded"
                  >
                    <SettingsIcon className="mr-2" />
                    계정
                  </a>
                  <a
                    href="#security"
                    data-toggle="tab"
                    className="nav-item nav-link has-icon nav-link-faded"
                  >
                    <HttpsIcon className="mr-2" />
                    비밀번호
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-header border-bottom mb-3 d-flex d-md-none">
                <ul
                  className="nav nav-tabs card-header-tabs nav-gap-x-1"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      href="#profile"
                      data-toggle="tab"
                      className="nav-link has-icon active"
                    >
                      <PersonIcon />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#account"
                      data-toggle="tab"
                      className="nav-link has-icon"
                    >
                      <SettingsIcon />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#security"
                      data-toggle="tab"
                      className="nav-link has-icon"
                    >
                      <HttpsIcon />
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card-body tab-content">
                <SettingProfile />

                <SettingAccount />

                <SettingPassword />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
