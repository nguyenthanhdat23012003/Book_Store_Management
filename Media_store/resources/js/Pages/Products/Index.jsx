import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";

const index = ({ auth, products, cart = [] }) => {
    const [alert, setAlert] = React.useState(false);

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const closeAlert = () => {
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    };

    const addToCart = (product_id) => {
        console.log(product_id);
        cart = [...cart, product_id];
        setAlert(true);
        closeAlert();
        console.log(cart);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        Products
                    </h2>
                    <button className="indicator btn btn-outline btn-warning">
                        <span className="indicator-item badge badge-secondary">
                            {cart.length}
                        </span>
                        <span className="text-lg">
                            <FontAwesomeIcon
                                icon={faCartShopping}
                                className="w-8"
                            />
                            View cart
                        </span>
                    </button>
                    {alert && (
                        <div
                            role="alert"
                            className="alert alert-info absolute w-[70%] top-10 right-auto left-auto flex justify-between"
                        >
                            <span>Add to cart successfully</span>
                            <FontAwesomeIcon
                                icon={faRectangleXmark}
                                className="w-10 hover:opacity-75 cursor-pointer"
                                onClick={() => setAlert(false)}
                            />
                        </div>
                    )}
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap">
                                {products.data.map((product, index) => (
                                    <div
                                        key={index}
                                        className="lg:w-1/4 md:w-1/3 sm:w-1/2 w-full p-4"
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
                                                <div className="text-2xl ">
                                                    {product.price + " vnd"}
                                                </div>
                                                <div className="card-actions justify-end">
                                                    <button
                                                        className="btn btn-outline btn-error"
                                                        onClick={() =>
                                                            addToCart(
                                                                product.id
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
                        </div>

                        <Pagination links={products.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default index;
