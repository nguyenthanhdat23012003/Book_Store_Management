import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router } from "@inertiajs/react";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import OrderDetails from "./OrderDetails";
import InputLabel from "@/Components/InputLabel";

const Manage = ({ orders, queryParams = null, alert, success }) => {
    // console.log(orders);
    const [showModal, setShowModal] = React.useState(false);
    const [orderdetail, setOrderDetail] = React.useState(null);
    const [reason, setReason] = React.useState("");

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

    queryParams = queryParams || { sort_field: "id", sort_dir: "asc" };

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
        router.put(route("order.reject", order.id), { reason });
    };

    const confirmOrder = (order) => {
        router.put(route("order.confirm", order.id), {
            reason: reason,
        });
    };

    return (
        <>
            <Head title="orders" />

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
                                        href={route("orders.manage")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage orders
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            {alert && (
                <div className="toast toast-top toast-center">
                    <div
                        className={`alert ${
                            success ? "alert-success" : "alert-error"
                        }`}
                    >
                        <span>{alert}</span>
                    </div>
                </div>
            )}

            <div className="sm:mx-12 sm:px-6 lg:px-8 py-12">
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
                                            {order.data.id}
                                        </td>
                                        <td
                                            scope="col"
                                            className="oberflow-hidden"
                                        >
                                            <Link
                                                href={route(
                                                    "order.show",
                                                    order.data.id
                                                )}
                                                className="hover:underline hover:text-primary cursor-pointer"
                                            >
                                                {order.data.user_name}
                                            </Link>
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {Intl.NumberFormat().format(
                                                order.data.total_price
                                            ) + " vnd"}
                                        </td>
                                        <td scope="col">
                                            <span
                                                className={`text-nowrap uppercase px-4 py-2 rounded-lg font-semibold text-white ${
                                                    orderStatus[
                                                        order.data.status
                                                    ]
                                                }`}
                                            >
                                                {order.data.status}
                                            </span>
                                        </td>
                                        <td
                                            scope="col"
                                            className="text-nowrap uppercase"
                                        >
                                            {order.data.payment_method}
                                        </td>
                                        <td
                                            scope="col"
                                            className="text-nowrap uppercase"
                                        >
                                            {order.data.delivery_type}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {order.data.created_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {order.data.completed_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            <button
                                                className="btn btn-outline btn-info"
                                                onClick={(e) => {
                                                    setShowModal(true);
                                                    setOrderDetail(order.data);
                                                }}
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={orders.links} />
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
                        <div className="flex justify-center items-center mb-4">
                            <div>
                                <InputLabel
                                    htmlFor="reason"
                                    value="Choose reason for refusal:"
                                    className="mb-2 text-lg"
                                />
                                <Select
                                    id="reason"
                                    defaultValue=""
                                    className="w-full min-w-40"
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
                                    className="btn btn-outline btn-success"
                                    onClick={() => {
                                        setShowModal(false);
                                        setReason("");
                                        confirmOrder(orderdetail);
                                    }}
                                >
                                    Confirm
                                </button>

                                <button
                                    className="btn btn-outline btn-error"
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
                            className="btn btn-outline btn-warning"
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
