import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRectangleXmark,
    faTruck,
    faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Pagination";
import { Head, usePage, Link } from "@inertiajs/react";
import React, { useEffect } from "react";

const index = ({ orders, message = "", success = false }) => {
    console.log(orders);
    const page = usePage();
    const [alert, setAlert] = React.useState(false);

    useEffect(() => {
        if (message) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
        }
    }, [page]);

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
                    {alert && (
                        <div
                            role="alert"
                            className={`alert fixed z-10 w-[70%] top-10 right-auto left-auto flex justify-between opacity-75 shadow text-white ${
                                success ? "alert-success" : "alert-error"
                            }`}
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
            </header>

            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 mb-12">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="flex flex-col gap-5 flex-1 p-6 text-gray-900 dark:text-gray-100">
                            {orders.data.length === 0 && (
                                <div className="p-6 bg-white rounded">
                                    <div className="text-center text-2xl text-warning">
                                        You have no order yet!
                                    </div>
                                </div>
                            )}
                            {orders.data.length > 0 &&
                                orders.data.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col flex-1 px-4 py-2 rounded bg-fuchsia-100 shadow-lg border border-gray"
                                    >
                                        <div className="flex gap-4 justify-end items-center border-b py-2 mb-2 border-amber-600">
                                            <h3 className="text-success uppercase flex gap-2 items-center">
                                                <FontAwesomeIcon
                                                    icon={faTruck}
                                                />
                                                <span>
                                                    {item.delivery.status}
                                                </span>
                                                <span
                                                    className="tooltip tooltip-bottom"
                                                    data-tip={
                                                        item.delivery.created_at
                                                            ? "Delivered at " +
                                                              item.delivery
                                                                  .created_at
                                                            : "No new update"
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCircleQuestion}
                                                    />
                                                </span>
                                            </h3>
                                            <h3 className="text-orange-500 uppercase border-l border-orange-300 px-3">
                                                {item.status}
                                            </h3>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            {item.order_items.map(
                                                (productItem, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex justify-between items-center h-full sm:px-4"
                                                    >
                                                        <div className="flex flex-wrap items-start">
                                                            <div className="sm:w-auto w-full p-1">
                                                                <img
                                                                    src={
                                                                        productItem
                                                                            .product
                                                                            .image_path
                                                                    }
                                                                    className="rounded-lg shadow-2xl w-28"
                                                                />
                                                            </div>

                                                            <div className="sm:w-auto w-full overflow-hidden px-4">
                                                                <h1 className="sm:text-xl font-bold uppercase ">
                                                                    {
                                                                        productItem
                                                                            .product
                                                                            .type
                                                                    }
                                                                </h1>
                                                                <p className="text-ellipsis">
                                                                    {
                                                                        productItem
                                                                            .product
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-sm py-1">
                                                                    {"x" +
                                                                        productItem.quantity}
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
                                                                    productItem
                                                                        .product
                                                                        .price
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <div className="flex sm:justify-end justify-between items-center gap-3 px-4">
                                                <h1 className="sm:text-lg text-md font-bold text-slate-600">
                                                    Total:
                                                </h1>
                                                <p className="sm:py-3 py-1 text-2xl font-semibold text-red-600">
                                                    <span className="text-xs">
                                                        đ
                                                    </span>
                                                    {Intl.NumberFormat().format(
                                                        item.total_price
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex sm:justify-end justify-center gap-3">
                                                {item.status ===
                                                    "completed" && (
                                                    <button className="btn btn-outline btn-primary my-4 min-w-[100px]">
                                                        Rate
                                                    </button>
                                                )}
                                                {[
                                                    "completed",
                                                    "failed",
                                                ].includes(item.status) ? (
                                                    <button className="btn btn-outline btn-primary my-4 min-w-[100px]">
                                                        Buy again
                                                    </button>
                                                ) : (
                                                    <button className="btn btn-outline btn-primary my-4 min-w-[100px]">
                                                        Confirm received
                                                    </button>
                                                )}

                                                <button className="btn btn-outline btn-primary my-4 min-w-[100px]">
                                                    Contact us
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            {orders.data.length > 0 && (
                                <Pagination links={orders.links} />
                            )}
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
