import { useEffect, useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, router, usePage } from "@inertiajs/react";
import Footer from "@/Pages/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartDrawer from "@/Pages/Carts/CartDrawer";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const page = usePage();
    const myCart = page.props.cart;

    const viewCart = () => {
        router.get(route("cart.index"));
    };

    return (
        <div className="h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
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
                                {user.role === "customer" ? (
                                    <>
                                        <NavLink
                                            href={route("products.index")}
                                            active={route().current(
                                                "products.index"
                                            )}
                                        >
                                            Products
                                        </NavLink>
                                        <NavLink
                                            href={route("order.index")}
                                            active={route().current(
                                                "order.index"
                                            )}
                                        >
                                            Order history
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            href={route("products.manage")}
                                            active={route().current(
                                                "products.manage"
                                            )}
                                        >
                                            Manage products
                                        </NavLink>
                                        <NavLink
                                            href={route("orders.manage")}
                                            active={route().current(
                                                "orders.manage"
                                            )}
                                        >
                                            Manage orders
                                        </NavLink>
                                        <NavLink
                                            href={route("deliveries.manage")}
                                            active={route().current(
                                                "deliveries.manage"
                                            )}
                                        >
                                            Manage deliveries
                                        </NavLink>
                                    </>
                                )}

                                {user.role === "admin" && (
                                    <NavLink
                                        href={route("users.index")}
                                        active={route().current("users.index")}
                                    >
                                        Manage users
                                    </NavLink>
                                )}
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            {user.role === "customer" && (
                                <label
                                    htmlFor="my-drawer"
                                    className="indicator btn btn-outline btn-circle btn-warning btn-sm drawer-button"
                                >
                                    <span className="indicator-item badge badge-info">
                                        {myCart.data.length}
                                    </span>
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className="w-8"
                                    />
                                </label>
                            )}
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

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

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                        {user.role === "customer" ? (
                            <>
                                <ResponsiveNavLink
                                    href={route("products.index")}
                                    active={route().current("products.index")}
                                >
                                    Products
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("order.index")}
                                    active={route().current("order.index")}
                                >
                                    Order history
                                </ResponsiveNavLink>
                            </>
                        ) : (
                            <>
                                <ResponsiveNavLink
                                    href={route("products.manage")}
                                    active={route().current("products.manage")}
                                >
                                    Manage products
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("orders.manage")}
                                    active={route().current("orders.manage")}
                                >
                                    Manage orders
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    href={route("deliveries.manage")}
                                    active={route().current(
                                        "deliveries.manage"
                                    )}
                                >
                                    Manage deliveries
                                </ResponsiveNavLink>
                            </>
                        )}

                        {user.role === "admin" && (
                            <ResponsiveNavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                            >
                                Manage users
                            </ResponsiveNavLink>
                        )}
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow mt-40">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <div className="drawer drawer-end overflow-auto no-scrollbar">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content">
                    {/* Page content here */}

                    <div className="min-h-screen">{children}</div>
                    <Footer />
                </div>
                <div className="drawer-side z-10">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="menu relative bg-base-100 text-base-content h-svh w-80 p-4">
                        {/* Sidebar content here */}
                        <div className="h-[calc(100%-120px)] overflow-auto no-scrollbar border-b-2">
                            <CartDrawer cart={myCart} />
                        </div>
                        <div className="absolute inset-x-0 bottom-12 text-center">
                            <label
                                htmlFor="my-drawer"
                                className="indicator btn btn-outline btn-error rounded-xl"
                                onClick={viewCart}
                            >
                                <span className="text-lg">
                                    <FontAwesomeIcon
                                        icon={faCartShopping}
                                        className="w-8"
                                    />
                                    <span className="sm:inline-block hidden">
                                        View cart
                                    </span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
