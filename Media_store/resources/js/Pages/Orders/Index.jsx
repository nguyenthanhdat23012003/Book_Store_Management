import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruck,
    faCircleQuestion,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/Components/Pagination";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import Toast from "@/Components/Toast";
import CustomNavLink from "@/Components/CustomNavLink";

const index = ({
    orders,
    queryParams = null,
    alert = null,
    success = false,
}) => {
    const [messages, setMessages] = React.useState(
        alert
            ? [
                  {
                      message: alert,
                      type: success ? "alert-success" : "alert-error",
                  },
              ]
            : []
    );

    useEffect(() => {
        if (messages.length === 0) return;
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [messages]);

    queryParams = queryParams || { field: "all" };

    const searchFieldChanged = (value) => {
        queryParams.field = value;

        router.get(route("order.index"), queryParams);
    };

    const buyAgain = (order) => {
        router.post(route("order.buyAgain", order.id));
    };

    const confirmReceipt = (order) => {
        axios.post(route("order.confirmReceipt", order.id)).then((res) => {
            setMessages([
                ...messages,
                {
                    type:
                        res.data.status === "success"
                            ? "alert-success"
                            : "alert-error",
                    message: res.data.message,
                },
            ]);
            router.reload();
        });
    };

    const navItems = {
        all: "All",
        unpaid: "To pay",
        pending: "To ship",
        confirmed: "To receive",
        completed: "Completed",
        cancelled: "Cancelled",
        failed: "Failed",
    };

    return (
        <>
            <Head title="Product" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex justify-between breadcrumbs hidden">
                        <ul>
                            <li>
                                <Link
                                    href={route("products.index")}
                                    className="font-semibold text-lg hover:text-primary text-gray-800 dark:text-gray-200 leading-tight"
                                >
                                    Media store
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("order.index")}
                                    className="font-semibold text-lg hover:text-primary text-gray-800 dark:text-gray-200 leading-tight"
                                >
                                    Order history
                                </Link>
                            </li>
                        </ul>
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

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6 mb-12">
                {/* Nav */}
                <nav className="mx-6 overflow-x-auto no-scrollbar bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-lg">
                    <div className="flex justify-around lg:w-auto w-fit">
                        {Object.keys(navItems).map((key) => (
                            <CustomNavLink
                                key={key}
                                active={queryParams.field === key}
                                className="text-lg text-nowrap cursor-pointer hover:text-primary dark:text-gray-200 dark:hover:text-primary"
                                onClick={() => searchFieldChanged(key)}
                            >
                                <p className="w-32 py-3 text-center">
                                    {navItems[key]}
                                </p>
                            </CustomNavLink>
                        ))}
                    </div>
                </nav>
                {/* Main content */}
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
                                className="flex flex-col flex-1 px-4 py-2 rounded bg-pink-50 shadow-lg border border-gray"
                            >
                                <div className="flex gap-4 justify-end items-center border-b py-2 mb-2 border-amber-600">
                                    <h3 className="text-success uppercase flex gap-2 items-center">
                                        <FontAwesomeIcon icon={faTruck} />
                                        <span>{item.delivery?.status}</span>
                                        <span
                                            className="tooltip tooltip-bottom"
                                            data-tip={
                                                item.delivery?.created_at
                                                    ? "Delivered at " +
                                                      item.delivery?.created_at
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

                                <Link
                                    href={route("order.show", item.id)}
                                    className="flex flex-col gap-2"
                                >
                                    {item.order_items.map(
                                        (productItem, index) => (
                                            <div
                                                key={index}
                                                className="flex justify-between items-center h-full sm:px-4 border-b border-gray-300 py-2 sm:py-4"
                                            >
                                                <div className="md:w-2/3 w-full flex flex-wrap items-start sm:justify-start justify-center">
                                                    <div className="md:w-1/4 sm:w-1/3 w-1/2 sm:h-32 p-1 border rounded border-primary">
                                                        <img
                                                            src={
                                                                productItem
                                                                    .product
                                                                    .image_path
                                                            }
                                                            className="object-contain object-center w-full h-full rounded-lg"
                                                        />
                                                    </div>

                                                    <div className="md:w-3/4 sm:w-2/3 w-full overflow-hidden px-4">
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
                                                            productItem.product
                                                                .price
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </Link>

                                <div className="flex flex-col flex-1">
                                    <div className="flex sm:justify-end justify-between items-center gap-3 px-4">
                                        <h1 className="sm:text-lg text-md font-bold text-slate-600">
                                            Total:
                                        </h1>
                                        <p className="sm:py-3 lg:w-1/12 sm:w-1/6 py-1 text-right text-2xl font-semibold text-primary">
                                            <span className="text-xs">đ</span>
                                            {Intl.NumberFormat().format(
                                                item.total_price
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex sm:justify-end justify-between items-center gap-3 px-4">
                                        <h1 className="sm:text-lg text-md font-bold text-slate-600">
                                            Payment method:
                                        </h1>
                                        <p className="sm:py-3 lg:w-1/12 sm:w-1/6 py-1 text-right text-2xl uppercase font-semibold text-info">
                                            {item.payment_method}
                                        </p>
                                    </div>
                                    <div className="flex sm:justify-end justify-center gap-3">
                                        {item.status === "completed" && (
                                            <button className="btn btn-outline rounded-2xl btn-primary my-4 min-w-[100px]">
                                                Rate
                                            </button>
                                        )}
                                        {[
                                            "completed",
                                            "failed",
                                            "rejected",
                                            "cancelled",
                                        ].includes(item.status) && (
                                            <button
                                                onClick={() =>
                                                    buyAgain(item.data)
                                                }
                                                className="btn btn-outline rounded-2xl btn-primary my-4 min-w-[100px]"
                                            >
                                                Buy again
                                            </button>
                                        )}
                                        {item.delivery?.status ===
                                            "completed" &&
                                            item.status !== "completed" && (
                                                <button
                                                    onClick={() =>
                                                        confirmReceipt(
                                                            item.data
                                                        )
                                                    }
                                                    className="btn btn-outline rounded-2xl btn-primary my-4 min-w-[100px]"
                                                >
                                                    Confirm receipt
                                                </button>
                                            )}
                                        {item.status !== "completed" && (
                                            <button className="btn btn-outline rounded-2xl btn-primary my-4 min-w-[100px]">
                                                Contact us
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    {orders.data.length > 0 && (
                        <Pagination links={orders.meta.links} />
                    )}
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
