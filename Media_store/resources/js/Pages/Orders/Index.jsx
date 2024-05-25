import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { Head, usePage, Link } from "@inertiajs/react";
import React from "react";

const index = ({ orders, message = "" }) => {
    const order_items = orders.data.order_items;
    console.log(orders);
    console.log(message);
    return (
        <>
            <Head title="Product" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between breadcrumbs">
                        <ul>
                            <li>
                                <Link
                                    href={route("products.index")}
                                    className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight"
                                >
                                    Media store
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("cart.index")}
                                    className="font-semibold text-lg text-gray-800 dark:text-gray-200 leading-tight"
                                >
                                    Order history
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 mb-12">
                    <div className="flex flex-col gap-5 flex-1 p-4 text-gray-900 dark:text-gray-100">
                        {order_items.length === 0 && (
                            <div className="p-6 bg-white rounded">
                                <div className="text-center text-2xl text-warning">
                                    Your cart is empty!
                                </div>
                            </div>
                        )}
                        {order_items.length > 0 &&
                            order_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-wrap sm:items-center px-4 py-2 rounded bg-fuchsia-100 shadow-lg border border-gray"
                                >
                                    <div className="flex grow lg:w-1/5 md:w-1/3 w-2/5 justify-center items-center h-full sm:px-4">
                                        <div className="m-1">
                                            <img
                                                src={item.product.image_path}
                                                className="rounded-lg shadow-2xl w-40"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex grow flex-wrap lg:w-3/5 md:w-2/3 w-3/5 justify-between items-center">
                                        <div className="lg:w-1/2 w-full overflow-hidden px-4">
                                            <h1 className="sm:text-2xl font-bold uppercase ">
                                                {item.product.type}
                                            </h1>
                                            <p className="sm:py-3 py-1 text-ellipsis">
                                                {item.product.name}
                                            </p>
                                        </div>
                                        <div className="text-orange-400 lg:w-3/12 md:w-1/2 w-full px-4">
                                            <h1 className="sm:text-2xl text-md font-bold">
                                                Unit price
                                            </h1>
                                            <p className="sm:py-3 py-1">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    item.product.price
                                                )}
                                            </p>
                                        </div>
                                        <div className="sm:flex justify-between items-center lg:w-3/12 md:w-1/2 w-full">
                                            <p className="text-red-600 font-bold text-xl text-center">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    item.quantity *
                                                        item.product.price
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
