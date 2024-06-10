import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Stat from "@/Components/Stat";

const Dashboard = () => {
    const page = usePage();
    const user = page.props.auth ? page.props.auth.user : null;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    return (
        <>
            <div className="min-h-screen h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                                    </Link>
                                </div>

                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        Dashboard
                                    </NavLink>
                                </div>

                                {user && user.role !== "customer" ? (
                                    <>
                                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                            <NavLink
                                                href={route("products.manage")}
                                                active={route().current(
                                                    "products.manage"
                                                )}
                                            >
                                                Manage products
                                            </NavLink>
                                        </div>
                                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                            <NavLink
                                                href={route("orders.manage")}
                                                active={route().current(
                                                    "orders.manage"
                                                )}
                                            >
                                                Manage orders
                                            </NavLink>
                                        </div>
                                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                            <NavLink
                                                href={route(
                                                    "deliveries.manage"
                                                )}
                                                active={route().current(
                                                    "deliveries.manage"
                                                )}
                                            >
                                                Manage deliveries
                                            </NavLink>
                                        </div>
                                        {user.role === "admin" && (
                                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                                <NavLink
                                                    href={route("users.manage")}
                                                    active={route().current(
                                                        "users.manage"
                                                    )}
                                                >
                                                    Manage users
                                                </NavLink>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                            <NavLink
                                                href={route("products.index")}
                                                active={route().current(
                                                    "products.index"
                                                )}
                                            >
                                                Products
                                            </NavLink>
                                        </div>
                                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                            <NavLink
                                                href={route("order.index")}
                                                active={route().current(
                                                    "order.index"
                                                )}
                                            >
                                                Order history
                                            </NavLink>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="hidden sm:flex sm:items-center sm:ms-6">
                                <div className="ms-3 relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user ? user.name : "Guest"}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        {user ? (
                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        ) : (
                                            <Dropdown.Content>
                                                <Dropdown.Link
                                                    href={route("login")}
                                                >
                                                    Log in
                                                </Dropdown.Link>
                                                <Dropdown.Link
                                                    href={route("register")}
                                                >
                                                    Register
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        )}
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="h-screen overflow-auto no-scrollbar">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="diff sm:aspect-[16/9] aspect-[3/4] rounded-box mb-6 shadow-xl shadow-base-200">
                                <div className="diff-item-1">
                                    <div className="bg-primary text-center text-emerald-900 text-9xl font-black grid place-content-center">
                                        D@ICY
                                        <div className="hero py-12">
                                            <p className="text-3xl text-white">
                                                Welcome to Media Store
                                            </p>
                                        </div>
                                        <Stat />
                                    </div>
                                </div>
                                <div className="diff-item-2">
                                    <div className="bg-base-200 text-center text-neutral text-9xl font-black grid place-content-center">
                                        D@ICY
                                        <div className="hero py-12">
                                            <p className="text-3xl text-primary-content">
                                                Welcome to Media Store
                                            </p>
                                        </div>
                                        <Stat bg_color="bg-rose-50" />
                                    </div>
                                </div>
                                <div className="diff-resizer"></div>
                            </div>

                            <div className="carousel rounded-box shadow-lg shadow-base-200">
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/71tzwhmHDPL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/71mKE1G9qdL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/61yZAgIJAWL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/71OP8gOVMEL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/81U6MfN1ZPL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/81TKwy4cD5L._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/717bMx0AiXL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/71zFLJVDUeL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/71xagWGOdoL._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://m.media-amazon.com/images/I/91ybHf2mi4L._AC_SY400_.jpg"
                                        alt="Burger"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                        <nav className="grid grid-flow-col gap-4">
                            <a className="link link-hover">About us</a>
                            <a className="link link-hover">Contact</a>
                            <a className="link link-hover">Jobs</a>
                            <a className="link link-hover">Press kit</a>
                        </nav>
                        <nav>
                            <div className="grid grid-flow-col gap-4">
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current"
                                    >
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                    </svg>
                                </a>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current"
                                    >
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                    </svg>
                                </a>
                                <a>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="fill-current"
                                    >
                                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                    </svg>
                                </a>
                            </div>
                        </nav>
                        <aside>
                            <p>
                                Copyright © 2024 - All right reserved by ACME
                                Industries Ltd
                            </p>
                        </aside>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
