import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTag,
    faBookBookmark,
    faCompactDisc,
    faHardDrive,
    faCircleExclamation,
    faCartPlus,
    faCartShopping,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import NumberInput from "@/Components/NumberInput";
import Modal from "@/Components/Modal";
import ProductDetails from "./ProductDetails";
import Toast from "@/Components/Toast";
import { Rating } from "@mui/material";

const Show = ({ product }) => {
    const page = usePage();
    const user = page.props.auth.user;
    const myCart = page.props.cart;
    const [nbItemInCart, setNbItemInCart] = React.useState(myCart.data.length);

    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = React.useState(false);

    const confirmDeleteProduct = () => {
        router.delete(route("products.destroy", product.id));
    };

    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        if (messages.length === 0) return;
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [messages]);

    const addToCart = () => {
        axios
            .post(route("cart.addToCart", product), { quantity })
            .then((response) => {
                console.log(response.data);
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
            })
            .catch((error) => {
                console.log(error);
                setMessages("Oop! Something went wrong!");
            });
    };

    const buyNow = () => {
        let item = product;
        item.quantity = quantity;
        router.post(route("order.store"), { products: [item] });
    };

    const formatNum = (num) => {
        if (num < 1000) return num;
        let thousands = num / 1000;
        let [integerPart, decimalPart] = thousands.toString().split(".");

        return integerPart + "," + decimalPart.slice(0, 1) + "K";
    };

    return (
        <>
            <Head title="Products" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex hidden justify-between">
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
                                    {user.role === "customer" ? (
                                        <Link
                                            href={route("products.index")}
                                            className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                        >
                                            Products
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route("products.manage")}
                                            className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                        >
                                            Manage products
                                        </Link>
                                    )}
                                </li>
                                <li>
                                    <Link
                                        href={route(
                                            "products.show",
                                            product.id
                                        )}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        {`"${product.name}"`}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        {user.role === "customer" && (
                            <Link
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
                                    View cart
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="sm:hidden block">
                        <Link
                            href={route("products.index")}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-4 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Link>
                    </div>
                </div>
            </header>

            <Toast messages={messages} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex md:flex-nowrap flex-wrap gap-4 justify-center">
                            <div className="lg:w-1/3 w-full max-w-3xl self-center mb-4">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={product.image_path}
                                        alt={product.type}
                                        className="w-full max-w-60 object-cover rounded-lg"
                                    />
                                </div>
                            </div>
                            <div className="lg:w-2/3 w-full max-w-3xl flex flex-col gap-4">
                                <div className="sm:order-1 order-3">
                                    <h3 className="sm:text-3xl text-xl">
                                        {product.name}
                                    </h3>
                                </div>
                                <div className="order-2 flex justify-between w-fit">
                                    <div className="flex items-center sm:border-r-2 border-r px-2">
                                        <span className="text-lg underline text-red-600 mx-2">
                                            {product.rating}
                                        </span>

                                        <Rating
                                            name="read-only"
                                            value={Math.floor(
                                                product.rating / 2
                                            )}
                                            readOnly
                                        />
                                    </div>
                                    <div className="px-2 sm:flex hidden text-xl items-center gap-2">
                                        <span className="text-red-600 ">
                                            {Intl.NumberFormat().format(
                                                product.ratingsCount
                                            )}
                                        </span>
                                        <span className="text-gray-600">
                                            Ratings
                                        </span>
                                    </div>
                                    <div className="px-2 flex text-xl sm:border-l-2 border-l items-center gap-2">
                                        <span className="text-red-600 ">
                                            {formatNum(product.sold)}
                                        </span>
                                        <span className="text-gray-600">
                                            Sold
                                        </span>
                                    </div>
                                </div>
                                <div className="sm:order-3 order-1 text-primary font-extrabold bg-fuchsia-50 p-4 rounded">
                                    <span className="text-sm">₫</span>
                                    <span className="text-2xl px-1">
                                        {Intl.NumberFormat().format(
                                            product.price
                                        )}
                                    </span>
                                </div>

                                <div className="order-4 sm:flex sm:flex-col gap-4 hidden px-4">
                                    <p>{product.description}</p>
                                    <div className="flex justify-between items-center w-fit gap-4">
                                        <span className="text-neutral">
                                            <FontAwesomeIcon
                                                icon={faTag}
                                                className="w-6"
                                            />
                                            Genre:
                                        </span>
                                        <div className="flex gap-2">
                                            {product.genre.length > 0 &&
                                                product.genre.map(
                                                    (genre, index) => (
                                                        <span
                                                            key={index}
                                                            className="italic bg-black/5 px-2 rounded-lg"
                                                        >
                                                            {genre}
                                                        </span>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    {product.type === "book" && (
                                        <div className="flex justify-between items-center w-fit gap-4">
                                            <span className="text-neutral">
                                                <FontAwesomeIcon
                                                    icon={faBookBookmark}
                                                    className="w-6"
                                                />
                                                Cover type:
                                            </span>
                                            <span className="italic bg-black/5 px-2 rounded-lg">
                                                {product.cover_type}
                                            </span>
                                        </div>
                                    )}
                                    {product.type === "cd" && (
                                        <div className="flex justify-between items-center w-fit gap-4">
                                            <span className="text-neutral">
                                                <FontAwesomeIcon
                                                    icon={faCompactDisc}
                                                    className="w-6"
                                                />
                                                Collections:
                                            </span>
                                            <span className="italic bg-black/5 px-2 rounded-lg">
                                                {product.collections}
                                            </span>
                                        </div>
                                    )}
                                    {product.type === "dvd" && (
                                        <div className="flex justify-between items-center w-fit gap-4">
                                            <span className="text-neutral">
                                                <FontAwesomeIcon
                                                    icon={faHardDrive}
                                                    className="w-6"
                                                />
                                                Disc type:
                                            </span>
                                            <span className="italic bg-black/5 px-2 rounded-lg">
                                                {product.disc_type}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-around items-center w-fit gap-4 text-gray-500">
                                        {user.role === "customer" && (
                                            <>
                                                <p>Quantity:</p>
                                                <NumberInput
                                                    value={quantity}
                                                    min={1}
                                                    max={product.in_stock}
                                                    onChangevalue={(value) =>
                                                        setQuantity(value)
                                                    }
                                                />
                                            </>
                                        )}
                                        <div className="flex justify-between gap-2 ">
                                            <p>Available: </p>
                                            <p>{product.in_stock}</p>
                                        </div>
                                    </div>
                                    {user.role === "customer" ? (
                                        <div className="flex justify-between items-center w-fit gap-4">
                                            <button
                                                className="btn btn-outline btn-primary rounded-xl w-fit"
                                                onClick={() => addToCart()}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faCartPlus}
                                                />
                                                Add to cart
                                            </button>
                                            <button
                                                className="btn btn-primary rounded-xl text-white w-32"
                                                onClick={() => buyNow()}
                                            >
                                                Buy now
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-center w-fit gap-4">
                                            <Link
                                                href={route(
                                                    "products.edit",
                                                    product.id
                                                )}
                                                className="btn btn-info rounded-xl text-white w-24"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                                className="btn btn-primary rounded-xl text-white w-24"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-base overflow-hidden shadow-sm sm:rounded-2xl sm:hidden block">
                        <div className="collapse">
                            <input type="checkbox" className="peer w-full" />
                            <div className="collapse-title bg-base-100 text-primary-content peer-checked:bg-white peer-checked:text-secondary-content">
                                Product details
                            </div>
                            <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-white peer-checked:text-secondary-content">
                                <ProductDetails product={product} />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl sm:block hidden px-4 py-2">
                        <ProductDetails product={product} />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="text-center py-8">
                    <FontAwesomeIcon
                        className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                        icon={faCircleExclamation}
                    />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                    </h3>
                    <div className="flex justify-center gap-4">
                        <button
                            className="btn btn-outline rounded-2xl btn-success"
                            onClick={() => {
                                setShowModal(false);
                                confirmDeleteProduct();
                            }}
                        >
                            Confirm
                        </button>

                        <button
                            className="btn btn-outline rounded-2xl btn-error"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

Show.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Show;
