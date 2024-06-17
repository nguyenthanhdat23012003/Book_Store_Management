import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import Toast from "@/Components/Toast";

const Dashboard = ({ products }) => {
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
            })
            .catch((error) => {
                console.log(error);
                setMessages("Oop! Something went wrong!");
            });
    };

    return (
        <>
            <Head title="Dashboard" />

            <Toast messages={messages} />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                <div className="p-6 text-gray-900 dark:text-gray-100 grid space-y-8">
                    <div className="grid lg:grid-cols-3 grid-cols-2 grid-flow-row gap-4">
                        <div className="relative col-span-2 row-span-2 bg-[url('/images/book.png')] bg-cover bg-center h-[464px] animate-floatIn">
                            <div className="bg-gradient-to-b from-black/15 to-white/50 h-full"></div>
                            <div className="absolute left-8 bottom-4 flex flex-col gap-4">
                                <h3 className="text-5xl font-bold">
                                    Media Store
                                </h3>
                                <p className="text-2xl font-semibold">
                                    Best Place To Buy !!
                                </p>
                                <Link
                                    href={route("products.index")}
                                    className="text-lg uppercase font-extrabold flex items-center gap-2 p-2 rounded-md hover:bg-black/25 transition-all duration-300 ease-in-out"
                                >
                                    Shop now
                                    <FontAwesomeIcon
                                        icon={faArrowRightLong}
                                        className="ml-2 animate-shake"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="bg-[url('/images/cd.jpg')] bg-cover bg-center h-56 animate-splitIn shadow"></div>
                        <div className="bg-[url('/images/dvd.jpg')] bg-cover bg-center h-56 animate-splitIn shadow"></div>
                    </div>

                    <div className="text-xl">
                        <h3>Featured Products</h3>
                    </div>

                    <div className="flex overflow-hidden bg-white space-x-4 group animate-splitIn border-x ">
                        <div className="flex space-x-4 animate-loopScroll group-hover:paused">
                            {products.data.map((product) => (
                                <div
                                    className="relative z-10 p-4 m-4 cursor-pointer hover:shadow-lg hover:bottom-2 transition-all duration-300"
                                    key={product.id}
                                >
                                    <div className="w-48 h-64">
                                        <img
                                            src={product.image_path}
                                            alt=""
                                            className=" object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex flex-col pb-8">
                                        <p className="h-6 overflow-hidden text-ellipsis">
                                            {product.name}
                                        </p>
                                        <del className="text-red-500">
                                            {Intl.NumberFormat().format(
                                                product.price * 1.2
                                            )}
                                        </del>
                                        <p>
                                            <span className="text-xs">đ</span>
                                            {Intl.NumberFormat().format(
                                                product.price
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full h-full absolute z-20 inset-x-0 bg-white/25 flex items-end justify-center -bottom-12 opacity-0 hover:bottom-0 hover:opacity-100 transition-all duration-300">
                                        <button
                                            className="btn btn-neutral rounded-none w-full"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className="flex space-x-4 animate-loopScroll group-hover:paused"
                            aria-hidden="true"
                        >
                            {products.data.map((product) => (
                                <div
                                    className="relative z-10 p-4 m-4 cursor-pointer hover:shadow-lg hover:bottom-2 transition-all duration-300"
                                    key={product.id}
                                >
                                    <div className="w-48 h-64">
                                        <img
                                            src={product.image_path}
                                            alt=""
                                            className=" object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex flex-col pb-8">
                                        <p className="h-6 overflow-hidden text-ellipsis">
                                            {product.name}
                                        </p>
                                        <del className="text-red-500">
                                            {Intl.NumberFormat().format(
                                                product.price * 1.2
                                            )}
                                        </del>
                                        <p>
                                            <span className="text-xs">đ</span>
                                            {Intl.NumberFormat().format(
                                                product.price
                                            )}
                                        </p>
                                    </div>
                                    <div className="w-full h-full absolute z-20 inset-x-0 bg-white/25 flex items-end justify-center -bottom-12 opacity-0 hover:bottom-0 hover:opacity-100 transition-all duration-300">
                                        <button
                                            className="btn btn-neutral rounded-none w-full"
                                            onClick={() => addToCart(product)}
                                        >
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-xl">
                        <h3>Choose Your Fav</h3>
                    </div>
                    <div className="grid md:grid-cols-7 grid-cols-2 md:grid-rows-2 grid-rows-6 gap-4">
                        <div className="col-span-3 md:row-span-2 bg-[url('/images/book&cat.png')] md:col-start-3 md:row-start-1 row-span-2 row-start-3 bg-cover bg-center w-full"></div>
                        <div className="col-span-2 row-span-1 bg-[url('/images/cd_tl.jpg')] bg-cover bg-center w-full aspect-square"></div>
                        <div className="col-span-2 row-span-1 bg-[url('/images/dvd_tr.jpg')] bg-cover bg-center w-full aspect-square"></div>
                        <div className="col-span-2 row-span-1 bg-[url('/images/book_lb.png')] bg-cover bg-center w-full aspect-square"></div>
                        <div className="col-span-2 row-span-1 bg-[url('/images/cd_rb.jpg')] bg-cover bg-center w-full aspect-square"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Dashboard;
