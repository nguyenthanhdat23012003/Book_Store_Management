import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router } from "@inertiajs/react";
import {
    faCaretUp,
    faCaretDown,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import OrderDetails from "./OrderDetails";
import InputLabel from "@/Components/InputLabel";
import Toast from "@/Components/Toast";

const Manage = ({ orders, queryParams = null }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [orderdetail, setOrderDetail] = React.useState(null);
    const [reason, setReason] = React.useState("");

    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        if (messages.length === 0) return;
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 3000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [messages]);

    const orderStatus = {
        pending: "bg-warning",
        unpaid: "bg-primary",
        confirmed: "bg-info",
        paid: "bg-info",
        failed: "bg-error",
        completed: "bg-success",
        cancelled: "bg-error",
        rejected: "bg-error",
    };

    queryParams = queryParams || { sort_field: "id", sort_dir: "desc" };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("orders.manage"), queryParams);
    };

    const sort = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_dir =
                queryParams.sort_dir === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_dir = "asc";
        }

        router.get(route("orders.manage"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const rejectOrder = (order) => {
        axios.post(route("order.reject", order.id), { reason }).then((res) => {
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

    const confirmOrder = (order) => {
        axios.post(route("order.confirm", order.id)).then((res) => {
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

    return (
        <>
            <Head title="orders" />

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
                                    <Link
                                        href={route("orders.manage")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage orders
                                    </Link>
                                </li>
                            </ul>
                        </div>
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

            <div className="md:mx-12 md:px-4 lg:px-8 py-12">
                <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-x-auto">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <table className="table table-pin-rows">
                            <thead className="uppercase">
                                <tr>
                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={(e) => sort("id")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            ID
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "id" &&
                                                        queryParams.sort_dir ===
                                                            "desc"
                                                            ? "text-gray-300"
                                                            : "")
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCaretDown}
                                                    className={
                                                        queryParams.sort_field ===
                                                            "id" &&
                                                        queryParams.sort_dir ===
                                                            "asc"
                                                            ? "text-gray-300"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        User
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Total price
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Status
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Payment method
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Delivery type
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={(e) => sort("created_at")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            Created at
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "created_at" &&
                                                        queryParams.sort_dir ===
                                                            "desc"
                                                            ? "text-gray-300"
                                                            : "")
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCaretDown}
                                                    className={
                                                        queryParams.sort_field ===
                                                            "created_at" &&
                                                        queryParams.sort_dir ===
                                                            "asc"
                                                            ? "text-gray-300"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={(e) => sort("completed_at")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            Completed at
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "completed_at" &&
                                                        queryParams.sort_dir ===
                                                            "desc"
                                                            ? "text-gray-300"
                                                            : "")
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    icon={faCaretDown}
                                                    className={
                                                        queryParams.sort_field ===
                                                            "completed_at" &&
                                                        queryParams.sort_dir ===
                                                            "asc"
                                                            ? "text-gray-300"
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">
                                        <TextInput
                                            className="w-full min-w-32"
                                            placeholder="search..."
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
                                    </th>
                                    <th scope="col"></th>
                                    <th scope="col">
                                        <Select
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "status",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full min-w-32"
                                            defaultValue={queryParams.status}
                                        >
                                            <option value="all">All</option>
                                            {Object.keys(orderStatus).map(
                                                (status, index) => (
                                                    <option
                                                        key={index}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </th>
                                    <th scope="col">
                                        <Select
                                            className="w-full min-w-32"
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={
                                                queryParams.payment_method
                                            }
                                        >
                                            <option value="all">All</option>
                                            <option value="cod">COD</option>
                                            <option value="vnpay">
                                                VN Pay
                                            </option>
                                        </Select>
                                    </th>
                                    <th scope="col">
                                        <Select
                                            className="w-full min-w-32"
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "delivery_type",
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={
                                                queryParams.delivery_type
                                            }
                                        >
                                            <option value="all">All</option>
                                            <option value="rush">
                                                Rush order
                                            </option>
                                            <option value="normal">
                                                Normal order
                                            </option>
                                        </Select>
                                    </th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.data.map((order, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-rose-50 even:bg-base-50 hover:opacity-75"
                                    >
                                        <td scope="col" className="text-nowrap">
                                            {order.id}
                                        </td>
                                        <td
                                            scope="col"
                                            className="oberflow-hidden"
                                        >
                                            <Link
                                                href={route(
                                                    "order.show",
                                                    order.id
                                                )}
                                                className="hover:underline hover:text-primary cursor-pointer"
                                            >
                                                {order.user_name}
                                            </Link>
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {Intl.NumberFormat().format(
                                                order.total_price
                                            ) + " vnd"}
                                        </td>
                                        <td scope="col">
                                            <span
                                                className={`text-nowrap uppercase px-4 py-2 rounded-lg font-semibold text-white ${
                                                    orderStatus[order.status]
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td
                                            scope="col"
                                            className="text-nowrap uppercase"
                                        >
                                            {order.payment_method}
                                        </td>
                                        <td
                                            scope="col"
                                            className="text-nowrap uppercase"
                                        >
                                            {order.delivery_type}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {order.created_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {order.completed_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            <button
                                                className="btn btn-outline btn-info rounded-2xl"
                                                onClick={(e) => {
                                                    setShowModal(true);
                                                    setOrderDetail(order);
                                                }}
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={orders.meta.links} />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="py-8">
                    <h3 className="mb-5 text-center text-lg">
                        {`Order form "${orderdetail?.user_name}"`}
                    </h3>
                    <OrderDetails order={orderdetail} />
                    {orderdetail?.status === "pending" && (
                        <div className="my-4 mx-12">
                            <div>
                                <InputLabel
                                    htmlFor="reason"
                                    value="Choose reason for refusal:"
                                    className="mb-2 text-lg"
                                />
                                <Select
                                    id="reason"
                                    defaultValue=""
                                    className="w-60"
                                    onChange={(e) => setReason(e.target.value)}
                                >
                                    <option value="">Select reason...</option>
                                    <option value="undeliveried">
                                        Delivery does not support
                                    </option>
                                    <option value="out_of_stock">
                                        Out of stock
                                    </option>
                                    <option value="item_not_found">
                                        Can find item in stock
                                    </option>
                                    <option value="other">Other...</option>
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-4 mx-4">
                        {orderdetail?.status === "pending" && (
                            <>
                                <button
                                    className="btn btn-outline btn-success rounded-2xl"
                                    onClick={() => {
                                        setShowModal(false);
                                        setReason("");
                                        confirmOrder(orderdetail);
                                    }}
                                >
                                    Confirm
                                </button>

                                <button
                                    className="btn btn-outline btn-error rounded-2xl"
                                    onClick={() => {
                                        setShowModal(false);
                                        setReason("");
                                        rejectOrder(orderdetail);
                                    }}
                                    disabled={reason === ""}
                                >
                                    Reject
                                </button>
                            </>
                        )}

                        <button
                            className="btn btn-outline rounded-2xl btn-warning"
                            onClick={() => {
                                setShowModal(false);
                                setReason("");
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

Manage.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default Manage;
