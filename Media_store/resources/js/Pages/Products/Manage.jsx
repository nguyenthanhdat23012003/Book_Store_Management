import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faCaretUp,
    faCaretDown,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import Toast from "@/Components/Toast";

const Manage = ({
    products,
    queryParams = null,
    alert = null,
    success = false,
}) => {
    const [showModal, setShowModal] = React.useState(false);
    const [productID, setProductID] = React.useState(null);

    if (alert) {
        setTimeout(() => {
            router.reload();
        }, 3000);
    }

    queryParams = queryParams || { sort_field: "id", sort_dir: "asc" };

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("products.manage"), queryParams);
    };

    const sort = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_dir =
                queryParams.sort_dir === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_dir = "asc";
        }

        router.get(route("products.manage"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const confirmDeleteProduct = () => {
        router.delete(route("products.destroy", productID));
    };

    return (
        <>
            <Head title="Products" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="sm:block hidden">
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
                                            href={route("products.manage")}
                                            className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                        >
                                            Manage products
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
                        <div className="flex justify-between gap-2 items-center">
                            <Link
                                href={route("products.history")}
                                className="btn btn-outline rounded-2xl btn-success -mb-4"
                            >
                                View histories
                            </Link>
                            <Link
                                href={route("products.create")}
                                className="btn btn-outline rounded-2xl btn-success -mb-4"
                            >
                                Add new
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {alert && (
                <Toast
                    messages={[
                        {
                            message: alert,
                            type: success ? "alert-success" : "alert-error",
                        },
                    ]}
                />
            )}

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
                                        Name
                                    </th>
                                    <th scope="col" className="text-nowrap">
                                        Type
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={(e) => sort("price")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            Unit price
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "price" &&
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
                                                            "price" &&
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
                                        onClick={(e) => sort("in_stock")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            In stock
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "in_stock" &&
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
                                                            "in_stock" &&
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
                                                    "type",
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={queryParams.type}
                                        >
                                            <option value="all">All...</option>
                                            <option value="book">Book</option>
                                            <option value="cd">
                                                Compact Disc
                                            </option>
                                            <option value="dvd">
                                                Digital Video Disc
                                            </option>
                                        </Select>
                                    </th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.data.map((product, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-rose-50 even:bg-base-50 hover:opacity-75"
                                    >
                                        <td scope="col" className="text-nowrap">
                                            {product.id}
                                        </td>
                                        <td scope="col">
                                            <div className="max-w-60 overflow-hidden text-ellipsis">
                                                <Link
                                                    href={route(
                                                        "products.show",
                                                        product.id
                                                    )}
                                                    className="text-nowrap hover:underline hover:text-primary cursor-pointer"
                                                >
                                                    {product.name}
                                                </Link>
                                            </div>
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {product.type}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {Intl.NumberFormat().format(
                                                product.price
                                            ) + " vnd"}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            <span
                                                className={`${
                                                    product.in_stock == 0 &&
                                                    "text-error"
                                                }`}
                                            >
                                                {product.in_stock}
                                            </span>
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {product.created_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            <Link
                                                href={route(
                                                    "products.edit",
                                                    product.id
                                                )}
                                                className="hover:underline mx-1 text-blue-500"
                                            >
                                                Edit
                                            </Link>

                                            <span
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setProductID(product.id);
                                                }}
                                                className="hover:underline cursor-pointer mx-1 text-red-500"
                                            >
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={products.meta.links} />
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

Manage.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default Manage;
