import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Head, usePage, Link } from "@inertiajs/react";
import React, { useEffect } from "react";
import Toast from "@/Components/Toast";

const index = ({ products }) => {
    const page = usePage();
    const myCart = page.props.cart;
    const [nbItemInCart, setNbItemInCart] = React.useState(myCart.data.length);

    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    const addToCart = (product) => {
        axios
            .get(route("cart.addToCart", product.id))
            .then((response) => {
                if (response.data === "new") {
                    setNbItemInCart(nbItemInCart + 1);
                    setMessages([
                        ...messages,
                        "Add this " + product.type + " to cart successfully",
                    ]);
                } else {
                    setMessages([
                        ...messages,
                        "This " + product.type + " already in cart",
                    ]);
                }
            })
            .catch((error) => {
                console.log(error);
                setMessages("Oop! Something went wrong!");
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
                        <Link
                            href={route("cart.index")}
                            className="indicator btn btn-outline btn-error"
                        >
                            <span className="indicator-item badge badge-primary">
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
                    </div>
                </div>
            </header>

            <Toast messages={messages} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex flex-wrap">
                            {products.data.map((product, index) => (
                                <div
                                    key={index}
                                    className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-4 hover:p-2 hover:opacity-80 hover:border-primary hover:border-2 transition duration-500 ease-in-out"
                                >
                                    <div className="card indicator w-full bg-base-100 shadow-xl">
                                        <figure className="h-80 m-4 ">
                                            <span className="indicator-item badge badge-primary text-white">
                                                new
                                            </span>
                                            <img
                                                className="object-cover object-center"
                                                src={product.image_path}
                                                alt="Oop! Something went wrong!"
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
                                            <div className="text-2xl text-neutral">
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
        </>
    );
};

index.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default index;
