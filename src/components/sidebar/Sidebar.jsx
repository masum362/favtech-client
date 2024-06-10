import { NavLink } from "react-router-dom";
import { FaBars, FaList, FaUser, FaUsers } from "react-icons/fa";
import { IoAddCircle, IoGridSharp } from "react-icons/io5";
import { MdReviews, MdReport } from "react-icons/md";
import { BiSolidCoupon } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import useAuth from "../../hooks/useAuth";



const SideBar = ({ children }) => {
    const { user } = useAuth();
    let routes = []


    if (user.role === "user") {
        routes = [
            {
                path: "/user/my-profile",
                name: "My Profile",
                icon: <FaUser />,
            },
            {
                path: "/user/add-product",
                name: "Add Product",
                icon: <IoAddCircle />,
            },
            {
                path: "/user/my-products",
                name: "My Products",
                icon: <FaList />,
            },
        ]
    }
    else if (user.role === "moderator") {
        routes = [
            {
                path: "/moderator/product-reviews",
                name: "product Reviews",
                icon: <MdReviews />,
            },
            {
                path: "/moderator/reported-contents",
                name: "Reported Contents",
                icon: <MdReport />,
            },
        ]
    }
    else {
        routes = [
            {
                path: "/admin/statistics",
                name: "Statistics",
                icon: <IoGridSharp />,
            },
            {
                path: "/admin/manage-users",
                name: "Manage Users",
                icon: <FaUsers />,
            },
            {
                path: "/admin/manage-coupons",
                name: "Manage Coupons",
                icon: <BiSolidCoupon />,
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
            width: "200px",
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
            width: "200px",
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <>
            <div className="main-container h-auto  w-full">
                <div className="">
                    <motion.div
                        animate={{
                            width: "45px",
                            transition: {
                                duration: 0.5,
                                type: "spring",
                                damping: 10,
                            },
                        }}
                        className={`sidebar overflow-hidden block md:hidden  
                    `}
                    >
                        <div className="top_section gap-4 ">

                            <div className="bars cursor-pointer">
                                <FaBars/>
                            </div>
                        </div>

                        <section className="routes">
                            {routes.map((route, index) => {
                                if (route.subRoutes) {
                                    return (
                                        <SidebarMenu
                                            setIsOpen={setIsOpen}
                                            route={route}
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
                                    </NavLink>
                                );
                            })}
                        </section>
                    </motion.div>

                    <motion.div
                        animate={{
                            width: isOpen ? "200px" : "45px",
                            transition: {
                                duration: 0.5,
                                type: "spring",
                                damping: 10,
                            },
                        }}
                        className={`sidebar overflow-hidden md:block hidden  
                    `}
                    >
                        <div className="top_section gap-4 ">
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.h1
                                        variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="logo uppercase"
                                    >
                                        {import.meta.env.VITE_TITLE}
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
                </div>
                <main className="w-full">{children}</main>
            </div>
        </>
    );
};

export default SideBar;