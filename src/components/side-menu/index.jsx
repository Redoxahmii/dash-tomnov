import { useState } from "react";
import SideMenuData from "./side-menu-data";
import { Grid, IconButton } from "@mui/material";
import "./index.css";
import CreateIcon from "@mui/icons-material/Create";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/synthseer.png";
import GridViewIcon from "@mui/icons-material/GridView";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "./../../assets/svg/search.svg";
import NotificationIcon from "./../../assets/svg/notification.svg";

export const SideMenu = (props) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  let CurrentPagePath = location.pathname;
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={12} md={2}>
            <SideMenuData />
          </Grid>
          <Grid item xs={12} lg={10}>
            <div className="right-side-container">
              <div className="right-side-header-container">
                <div className="right-side-header-content-wrapper">
                  <div>
                    {isMatch ? (
                      <div>
                        <IconButton
                          onClick={() => {
                            setIsDrawerOpen(true);
                          }}
                        >
                          <MenuIcon />
                        </IconButton>
                      </div>
                    ) : (
                      <div> </div>
                    )}

                    <Drawer
                      anchor="left"
                      open={isDrawerOpen}
                      onClose={handleDrawerClose}
                    >
                      <div>
                        <div className="sider-content-wraper">
                          <div
                            className="drawer-header-main"
                            style={{ paddingRight: "20px" }}
                          >
                            <img src={Logo} alt="Logo" />
                            <IconButton
                              onClick={() => {
                                handleDrawerClose();
                              }}
                              className="app-bar-component-drawer-close-btn"
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                          <div className="side-menu-data-list-main">
                            <ul className="side-menu-ul">
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/");
                                  }}
                                >
                                  <GridViewIcon />
                                  <span className="side-menu-page-title">
                                    dashboard
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/orders"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/orders");
                                  }}
                                >
                                  <AddShoppingCartIcon />
                                  <span className="side-menu-page-title">
                                    Orders
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/orders"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/prompts");
                                  }}
                                >
                                  <CreateIcon />
                                  <span className="side-menu-page-title">
                                    Prompts
                                  </span>
                                </Button>
                              </li>
                              <li className="side-menu-list-item">
                                <Button
                                  variant="text"
                                  className={
                                    CurrentPagePath === "/profile"
                                      ? "side-menu-active-page"
                                      : "side-menu-page"
                                  }
                                  onClick={() => {
                                    navigate("/profile");
                                  }}
                                >
                                  <AccountCircleOutlinedIcon />
                                  <span className="side-menu-page-title">
                                    Profile
                                  </span>
                                </Button>
                              </li>
                              <br />
                            </ul>
                          </div>
                          <div className="side-menu-footer-container">
                            {/* <Button */}
                            {/*   variant="text" */}
                            {/*   className={"side-menu-page"} */}
                            {/*   // onClick={() => { */}
                            {/*   //   navigate("/settings"); */}
                            {/*   // }} */}
                            {/* > */}
                            {/*   <LogoutOutlinedIcon /> */}
                            {/*   <span className="side-menu-page-title"> */}
                            {/*     Log Out */}
                            {/*   </span> */}
                            {/* </Button> */}
                          </div>
                        </div>
                      </div>
                    </Drawer>
                  </div>

                  <div className="side-menu-header">
                    <div className="header-search-main">
                      <img src={SearchIcon} />
                      <input
                        type="text"
                        placeholder="Search product, supplier, order"
                      />
                    </div>
                    <div>
                      <Button variant="text" className="side-menu-notificatin">
                        <img src={NotificationIcon} />
                      </Button>
                      <Button
                        variant="text"
                        className="side-menu-profile"
                        onClick={() => navigate("/profile")}
                      >
                        <img src="https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"side-menu-children-data"}>{props.children}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default SideMenu;
