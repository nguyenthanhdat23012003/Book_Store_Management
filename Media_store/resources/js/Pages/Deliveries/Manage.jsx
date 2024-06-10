import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Head, Link, router } from "@inertiajs/react";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import InputLabel from "@/Components/InputLabel";
import DeliveryDetails from "./DeliveryDetails";
import Toast from "@/Components/Toast";

const Manage = ({ deliveries, queryParams = null }) => {
    const [showModal, setShowModal] = React.useState(false);
    const [deliverydetail, setdeliveryDetail] = React.useState(null);
    const [reason, setReason] = React.useState("");

    const [messages, setMessages] = React.useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [messages]);

    queryParams = queryParams || { sort_field: "id", sort_dir: "desc" };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("deliveries.manage"), queryParams);
    };

    const sort = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_dir =
                queryParams.sort_dir === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_dir = "asc";
        }

        router.get(route("deliveries.manage"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const deliveriestatus = {
        pending: "bg-warning",
        "in progress": "bg-info",
        completed: "bg-success",
        rejected: "bg-error",
    };

    const confirmDelivery = (delivery) => {
        axios.post(route("delivery.confirm", delivery.id)).then((res) => {
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

    const rejectDelivery = (delivery) => {
        axios
            .post(route("delivery.reject", delivery.id), { reason })
            .then((res) => {
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

    const completedDelivery = (delivery) => {
        axios.post(route("delivery.complete", delivery.id)).then((res) => {
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
            <Head title="deliveries" />

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
                                        href={route("deliveries.manage")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage deliveries
                                    </Link>
                                </li>
                            </ul>
                        </div>
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
                                        onClick={() => sort("id")}
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

                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={() => sort("delivery_id")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            Order ID
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "delivery_id" &&
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
                                                            "delivery_id" &&
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
                                        Customer name
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Status
                                    </th>

                                    <th scope="col" className="text-nowrap">
                                        Delivery type
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={() => sort("rejected_at")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            rejected at
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "rejected_at" &&
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
                                                            "rejected_at" &&
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
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="in progress">
                                                In Progress
                                            </option>
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="rejected">
                                                Rejected
                                            </option>
                                        </Select>
                                    </th>

                                    <th scope="col">
                                        <Select
                                            className="w-full min-w-32"
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "type",
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={queryParams.type}
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
                                {deliveries.data.map((delivery, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-rose-50 even:bg-base-50 hover:opacity-75"
                                    >
                                        <td scope="col" className="text-nowrap">
                                            {delivery.data.id}
                                        </td>

                                        <td scope="col" className="text-nowrap">
                                            {delivery.data.order?.id}
                                        </td>
                                        <td
                                            scope="col"
                                            className="oberflow-hidden"
                                        >
                                            {delivery.data.name}
                                        </td>
                                        <td scope="col">
                                            <span
                                                className={`text-nowrap uppercase px-4 py-2 rounded-lg font-semibold text-white ${
                                                    deliveriestatus[
                                                        delivery.data.status
                                                    ]
                                                }`}
                                            >
                                                {delivery.data.status}
                                            </span>
                                        </td>
                                        <td
                                            scope="col"
                                            className="text-nowrap uppercase"
                                        >
                                            {delivery.data.type}
                                        </td>

                                        <td scope="col" className="text-nowrap">
                                            {delivery.data.rejected_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {delivery.data.completed_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            <button
                                                className="btn btn-outline rounded-2xl btn-info"
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setdeliveryDetail(
                                                        delivery.data
                                                    );
                                                }}
                                            >
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <Pagination links={deliveries.links} />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={(e) => setShowModal(false)}>
                <div className="py-8 w-96 sm:w-auto">
                    <DeliveryDetails delivery={deliverydetail} />

                    {deliverydetail?.status === "pending" && (
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
                                    <option value="other">Other...</option>
                                </Select>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-4 mx-4">
                        {deliverydetail?.status === "pending" && (
                            <>
                                <button
                                    className="btn btn-outline rounded-2xl btn-success"
                                    onClick={() => {
                                        setShowModal(false);
                                        setReason("");
                                        confirmDelivery(deliverydetail);
                                    }}
                                >
                                    Confirm
                                </button>

                                <button
                                    className="btn btn-outline rounded-2xl btn-error"
                                    onClick={() => {
                                        setShowModal(false);
                                        setReason("");
                                        rejectDelivery(deliverydetail);
                                    }}
                                    disabled={reason === ""}
                                >
                                    Reject
                                </button>
                            </>
                        )}

                        {deliverydetail?.status === "in progress" && (
                            <button
                                className="btn btn-outline rounded-2xl btn-success"
                                onClick={() => {
                                    setShowModal(false);
                                    completedDelivery(deliverydetail);
                                }}
                            >
                                Complete
                            </button>
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
