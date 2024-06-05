import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiFillProfile, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import useAuth from "../../hooks/useAuth";
import MyProfile from "../../pages/myProfile/MyProfile";



const SideBar = ({ children }) => {
    const { user } = useAuth();
    let routes = []


    if(user.role==="user"){
        routes = [
            {
                path: "/user/my-profile",
                name: "My Profile",
                icon: <AiFillProfile />,
            },
            {
                path: "/user/add-product",
                name: "Add Product",
                icon: <AiFillProfile />,
            },
            {
                path: "/user/my-products",
                name: "My Product",
                icon: <AiFillProfile />,
            },
        ]
    }
    else if(user.role==="moderator"){
        routes = [
            {
                path: "/moderator/product-reviews",
                name: "product Reviews Queue",
                icon: <AiFillProfile />,
            },
            {
                path: "/moderator/reported-contents",
                name: "Reported Contents",
                icon: <AiFillProfile />,
            },
        ]
    }
    else{
        routes = [
            {
                path: "/admin/statistics",
                name: "Statistics",
                icon: <AiFillProfile />,
            },
            {
                path: "/admin/manage-users",
                name: "Manage Users",
                icon: <AiFillProfile />,
            },
            {
                path: "/admin/manage-coupons",
                name: "Manage Coupons",
                icon: <AiFillProfile />,
            },
        ]
    }







    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            transition: {
                duration: 0.2,
            },
        },
        show: {
            width: "140px",
            padding: "5px 15px",
            transition: {
                duration: 0.2,
            },
        },
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? "200px" : "45px",

                        transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 10,
                        },
                    }}
                    className={`sidebar `}
                >
                    <div className="top_section">
                        <AnimatePresence>
                            {isOpen && (
                                <motion.h1
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="logo"
                                >
                                    ProductHunt Lite
                                </motion.h1>
                            )}
                        </AnimatePresence>

                        <div className="bars cursor-pointer">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                  
                    <section className="routes">
                        {routes.map((route, index) => {
                            if (route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        showAnimation={showAnimation}
                                        isOpen={isOpen}
                                    />
                                );
                            }

                            return (
                                <NavLink
                                    to={route.path}
                                    key={index}
                                    className="link"
                                    activeClassName="active"
                                >
                                    <div className="icon">{route.icon}</div>
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                variants={showAnimation}
                                                initial="hidden"
                                                animate="show"
                                                exit="hidden"
                                                className="link_text"
                                            >
                                                {route.name}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </NavLink>
                            );
                        })}
                    </section>
                </motion.div>

                <main>{children}</main>
            </div>
        </>
    );
};

export default SideBar;