import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrderTimeLine from "@/Components/OrderTimeLine";

const Show = ({ order }) => {
    console.log(order);
    return (
        <>
            <Head title="Place order" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex justify-between hidden">
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
                                        href={route("cart.index")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Order history
                                    </Link>
                                </li>
                                <li>
                                    <span className="font-semibold hover:text-amber-700 hover:underline text-lg text-slate-800 dark:text-gray-200 leading-tight cursor-pointer">
                                        View order
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sm:hidden block">
                        <Link
                            href={route("cart.index")}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-4 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                    <div className="flex flex-col gap-6 p-6 text-gray-900 dark:text-gray-100">
                        <div className="flex justify-center">
                            <OrderTimeLine order={order.data} />
                        </div>

                        <div className="flex lg:flex-row flex-col justify-between items-center sm:px-4">
                            <div className="lg:w-2/5 w-full lg:border-r-2">
                                <h3 className="text-xl font-semibold mb-6">
                                    Delivery Address
                                </h3>
                                <div className="ml-2 flex flex-col gap-2">
                                    <p>{order.data.delivery.name}</p>
                                    <p className="text-gray-500">
                                        {order.data.delivery.phone}
                                    </p>
                                    <p className="text-gray-500">
                                        {order.data.delivery.province +
                                            ", " +
                                            order.data.delivery.address}
                                    </p>
                                </div>
                            </div>
                            <div className="lg:w-3/5 w-full text-center">
                                "Delivery process here"
                            </div>
                        </div>

                        {order.data.order_items.length > 0 &&
                            order.data.order_items.map((productItem, index) => (
                                <Link
                                    href={route(
                                        "products.show",
                                        productItem.product.id
                                    )}
                                    key={index}
                                    className="flex justify-between items-center hover:bg-black/5 h-full sm:px-4 border-b border-gray-300 py-2 sm:py-4"
                                >
                                    <div className="md:w-2/3 w-full flex flex-wrap items-start sm:justify-start justify-center">
                                        <div className="md:w-1/4 sm:w-1/3 w-1/2 sm:h-32 p-1 border rounded border-primary">
                                            <img
                                                src={
                                                    productItem.product
                                                        .image_path
                                                }
                                                className="object-contain object-center w-full h-full rounded-lg"
                                            />
                                        </div>

                                        <div className="md:w-3/4 sm:w-2/3 w-full overflow-hidden px-4">
                                            <h1 className="sm:text-xl font-bold uppercase ">
                                                {productItem.product.type}
                                            </h1>
                                            <p className="text-ellipsis">
                                                {productItem.product.name}
                                            </p>
                                            <p className="text-sm py-1">
                                                {"x" + productItem.quantity}
                                            </p>
                                            <p className="text-success rounded border border-success px-1 w-fit">
                                                Free return
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sm:block hidden">
                                        <p className="text-red-600">
                                            <span className="text-xs px-1">
                                                đ
                                            </span>
                                            {Intl.NumberFormat().format(
                                                productItem.product.price
                                            )}
                                        </p>
                                    </div>
                                </Link>
                            ))}

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <h3 className="text-nowrap">
                                    Merchandise Subtotal:
                                </h3>
                                <p className="sm:py-3 py-1 sm:w-full w-auto text-end">
                                    <span className="text-xs">đ</span>
                                    {Intl.NumberFormat().format(
                                        order.data.total_price
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-nowrap">Shipping Total:</h3>
                                <p className="sm:py-3 py-1 sm:w-full w-auto text-end">
                                    <span className="text-xs">đ</span>
                                    {Intl.NumberFormat().format(
                                        order.data.shipping_fee
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-nowrap">
                                    Voucher Discount:
                                </h3>
                                <p className="sm:py-3 py-1 sm:w-full w-auto text-end">
                                    <span className="text-xs">đ</span>
                                    {Intl.NumberFormat().format(
                                        order.data.free_ship_discount
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-nowrap">Total Payment:</h3>
                                <p className="sm:py-3 py-1 sm:w-full w-auto text-end text-2xl text-red-500">
                                    <span className="text-xs">đ</span>
                                    {Intl.NumberFormat().format(
                                        order.data.total_price
                                    )}
                                </p>
                            </div>
                            <div className="flex justify-between items-center">
                                <h3 className="text-nowrap">Payment method:</h3>
                                <p className="sm:py-3 py-1 sm:w-full w-auto uppercase text-end">
                                    {order.data.payment_method}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Show.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default Show;
