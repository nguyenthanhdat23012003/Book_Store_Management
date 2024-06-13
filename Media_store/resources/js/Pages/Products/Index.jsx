import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeftLong,
    faFilter,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Head, usePage, Link, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import Toast from "@/Components/Toast";
import TextInput from "@/Components/TextInput";
import ProductsSidebar from "./ProductsSidebar";
import { Rating } from "@mui/material";

const index = ({ products, queryParams = null }) => {
    const page = usePage();
    const myCart = page.props.cart;
    const [nbItemInCart, setNbItemInCart] = React.useState(myCart.data.length);

    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        if (messages.length === 0) return;
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [messages]);

    const addToCart = (product) => {
        axios
            .post(route("cart.addToCart", product.id))
            .then((response) => {
                if (response.data === "new") {
                    setNbItemInCart(nbItemInCart + 1);
                    setMessages([
                        ...messages,
                        {
                            message:
                                "This " +
                                product.type +
                                " has been added to cart",
                            type: "alert-info",
                        },
                    ]);
                } else {
                    setMessages([
                        ...messages,
                        {
                            message:
                                "This " + product.type + " already in cart",
                            type: "alert-info",
                        },
                    ]);
                }
                router.reload({ only: ["cart"] });
            })
            .catch((error) => {
                console.log(error);
                setMessages([
                    ...messages,
                    {
                        message: "Oop! Something went wrong!",
                        type: "alert-error",
                    },
                ]);
            });
    };

    queryParams = queryParams || { sort_field: "random", sort_dir: "asc" };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("products.index"), queryParams);
    };

    const sort = (name, value) => {
        queryParams.sort_field = name;
        queryParams.sort_dir = value;

        router.get(route("products.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const clearAll = () => {
        router.get(route("products.index"));
    };

    const filterPrice = (range) => {
        if (range.min || range.max) {
            queryParams.price_range = range;
        }
        router.get(route("products.index"), queryParams);
    };

    const formatNum = (num) => {
        if (num < 1000) return num;
        let thousands = num / 1000;
        let [integerPart, decimalPart] = thousands.toString().split(".");

        return integerPart + "," + decimalPart.slice(0, 1) + "K";
    };

    return (
        <>
            <Head title="Product" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex hidden justify-between">
                        <div className="breadcrumbs">
                            <ul>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold hover:text-primary text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Media store
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("products.index")}
                                        className="font-semibold hover:text-primary text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Products
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {/* <Link
                            href={route("cart.index")}
                            className="indicator btn btn-outline rounded-2xl btn-error -mb-4"
                        >
                            <span className="indicator-item badge badge-primary">
                                {nbItemInCart}
                            </span>
                            <span className="text-lg">
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="w-8"
                                />
                                <span className="sm:inline-block hidden">
                                    View cart
                                </span>
                            </span>
                        </Link> */}
                    </div>
                    <div className="sm:hidden block">
                        <Link
                            href={route("dashboard")}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-4 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Link>
                    </div>
                </div>
            </header>

            <Toast messages={messages} />

            <div className="drawer drawer-end">
                <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-side z-10">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="p-4 w-80 h-screen overflow-auto no-scrollbar bg-base-200 text-base-content">
                        {/* Sidebar content for mobile here */}
                        <ProductsSidebar
                            {...{
                                queryParams,
                                searchFieldChanged,
                                filterPrice,
                                clearAll,
                                sort,
                            }}
                        />
                    </div>
                </div>
                <div className="drawer-content">
                    {/* Page content here */}
                    <div className="flex gap-4 mx-auto sm:px-6 lg:px-12 py-12">
                        {/* Side bar */}
                        <div className="lg:flex flex-col lg:w-1/6 hidden ">
                            <div className="bg-white dark:bg-gray-800 animate-flyIn sticky inset-0 shadow-sm sm:rounded-lg h-fit pb-12 mb-16">
                                <ProductsSidebar
                                    {...{
                                        queryParams,
                                        searchFieldChanged,
                                        filterPrice,
                                        clearAll,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="lg:w-5/6 flex flex-col gap-4">
                            <div className="flex flex-col mx-4 bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg rounded-sm">
                                <div className="flex lg:justify-center justify-between items-center gap-4">
                                    <div className="max-w-xl w-full relative p-4 ">
                                        <TextInput
                                            type="text"
                                            placeholder="Search..."
                                            className="ml-4 lg:ml-0 w-full"
                                            onBlur={(e) =>
                                                searchFieldChanged(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                onKeyPress("name", e)
                                            }
                                            defaultValue={queryParams.name}
                                        />
                                        <FontAwesomeIcon
                                            icon={faMagnifyingGlass}
                                            className="w-10 text-primary absolute top-7 right-4"
                                        />
                                    </div>
                                    <label
                                        htmlFor="my-drawer-4"
                                        className="drawer-button btn btn-outline border-none text-primary lg:hidden mr-2"
                                    >
                                        <FontAwesomeIcon
                                            icon={faFilter}
                                            className="w-6"
                                        />
                                        Filter
                                    </label>
                                </div>
                                <div className="lg:flex hidden gap-4 items-center p-4">
                                    <div>
                                        <p>Sort by</p>
                                    </div>
                                    <button
                                        className={`btn w-28 ${
                                            queryParams.sort_field !==
                                                "random" && "btn-outline"
                                        } btn-primary rounded-sm`}
                                        onClick={() => sort("random", "asc")}
                                    >
                                        Random
                                    </button>
                                    <button
                                        className={`btn w-28 ${
                                            queryParams.sort_field !== "sold" &&
                                            "btn-outline"
                                        } btn-primary rounded-sm`}
                                        onClick={() => sort("sold", "desc")}
                                    >
                                        Top sales
                                    </button>
                                    <button
                                        className={`btn w-28 ${
                                            queryParams.sort_field !==
                                                "created_at" && "btn-outline"
                                        } btn-primary rounded-sm`}
                                        onClick={() =>
                                            sort("created_at", "desc")
                                        }
                                    >
                                        Latest
                                    </button>
                                    <select
                                        value={
                                            queryParams.sort_field === "price"
                                                ? queryParams.sort_dir
                                                : ""
                                        }
                                        className={`py-3 rounded-sm border-primary border ${
                                            queryParams.sort_field ===
                                                "price" &&
                                            "bg-primary text-white"
                                        }`}
                                        onChange={(e) =>
                                            sort("price", e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Price...
                                        </option>
                                        <option value="asc">
                                            Price low to high
                                        </option>
                                        <option value="desc">
                                            Price high to low
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className=" text-gray-900 dark:text-gray-100">
                                <div className="flex flex-wrap">
                                    {products.data.map((product, index) => (
                                        <div
                                            key={index}
                                            className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-4 hover:p-2 hover:opacity-80 transition-all duration-200 ease-in-out animate-zoomIn"
                                        >
                                            <div className="card rounded-lg indicator w-full bg-base-100 shadow-lg hover:shadow-2xl">
                                                <Link
                                                    href={route(
                                                        "products.show",
                                                        product.id
                                                    )}
                                                >
                                                    <figure className="h-80 m-2">
                                                        <span className="indicator-item badge badge-primary text-white animate-wiggle">
                                                            new
                                                        </span>
                                                        <img
                                                            loading="lazy"
                                                            className="object-cover object-center"
                                                            src={
                                                                product.image_path
                                                            }
                                                            alt="Oop! Something went wrong!"
                                                        />
                                                    </figure>
                                                </Link>
                                                <div className="card-body">
                                                    <h2 className="card-title uppercase">
                                                        {product.type}
                                                    </h2>
                                                    <p className="h-20 overflow-hidden text-ellipsis">
                                                        {product.name}
                                                    </p>

                                                    <div className="text-2xl text-neutral">
                                                        {Intl.NumberFormat().format(
                                                            product.price
                                                        ) + " vnd"}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Rating
                                                            value={
                                                                product.rating
                                                            }
                                                            readOnly={true}
                                                        />
                                                        <div>
                                                            {formatNum(
                                                                product.sold
                                                            ) + " sold"}
                                                        </div>
                                                    </div>
                                                    <div className="mb-2 gap-2 h-12 overflow-hidden text-ellipsis">
                                                        {product.genre.length >
                                                            0 &&
                                                            product.genre.map(
                                                                (
                                                                    genre,
                                                                    index
                                                                ) => (
                                                                    <span
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="italic bg-black/5 px-2 rounded-lg"
                                                                    >
                                                                        {genre}
                                                                    </span>
                                                                )
                                                            )}
                                                    </div>
                                                    <div className="card-actions justify-end">
                                                        <button
                                                            className="btn btn-outline rounded-2xl btn-error animate-bounce"
                                                            onClick={() =>
                                                                addToCart(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Pagination links={products.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

index.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default index;
