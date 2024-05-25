import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Head, usePage, Link } from "@inertiajs/react";
import React from "react";

const index = ({ products }) => {
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const page = usePage();
    const myCart = page.props.cart;
    const [nbItemInCart, setNbItemInCart] = React.useState(myCart.data.length);

    const closeAlert = () => {
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    };

    const addToCart = (product) => {
        setAlert(true);
        closeAlert();
        axios
            .get(route("product.addToCart", product.id))
            .then((response) => {
                if (response.data === "new") {
                    setNbItemInCart(nbItemInCart + 1);
                    setMessage(
                        "Add this " + product.type + " to cart successfully"
                    );
                } else {
                    setMessage("This " + product.type + " already in cart");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Head title="Product" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="breadcrumbs">
                            <ul>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Media store
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("products.index")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Products
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Link
                            href={route("cart.index")}
                            className="indicator btn btn-outline btn-warning"
                        >
                            <span className="indicator-item badge badge-secondary">
                                {nbItemInCart}
                            </span>
                            <span className="text-lg">
                                <FontAwesomeIcon
                                    icon={faCartShopping}
                                    className="w-8"
                                />
                                View cart
                            </span>
                        </Link>
                        {alert && (
                            <div
                                role="alert"
                                className="alert alert-info fixed z-10 w-[70%] top-10 right-auto left-auto flex justify-between opacity-75 shadow"
                            >
                                <span>{message}</span>
                                <FontAwesomeIcon
                                    icon={faRectangleXmark}
                                    className="w-24 hover:opacity-75 cursor-pointer text-red-300"
                                    onClick={() => setAlert(false)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap">
                                {products.data.map((product, index) => (
                                    <div
                                        key={index}
                                        className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-4"
                                    >
                                        <div className="card indicator w-full bg-base-100 shadow-xl">
                                            <figure className="min-h-[100px]">
                                                <span className="indicator-item badge badge-primary">
                                                    new
                                                </span>
                                                <img
                                                    src={product.image_path}
                                                    alt="Shoes"
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title uppercase">
                                                    {product.type}
                                                </h2>
                                                <div className="h-20 overflow-hidden">
                                                    <p className="text-ellipsis">
                                                        {product.name}
                                                    </p>
                                                </div>
                                                <div className="text-2xl text-orange-400">
                                                    {Intl.NumberFormat().format(
                                                        product.price
                                                    ) + " vnd"}
                                                </div>
                                                <div className="card-actions justify-end">
                                                    <button
                                                        className="btn btn-outline btn-error"
                                                        onClick={() =>
                                                            addToCart(product)
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
                            <Pagination links={products.links} />
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
