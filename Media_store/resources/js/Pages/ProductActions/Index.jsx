import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import {
    faCircleExclamation,
    faCaretUp,
    faCaretDown,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import Toast from "@/Components/Toast";
import Pagination from "@/Components/Pagination";

const Index = ({
    productActions,
    queryParams = null,
    alert = null,
    success = false,
}) => {
    const [showModal, setShowModal] = React.useState(false);
    const [action, setAction] = React.useState({});

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

        router.get(route("products.history"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sort = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_dir =
                queryParams.sort_dir === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_dir = "asc";
        }

        router.get(route("products.history"), queryParams);
    };

    const restoreProduct = (product_id) => {
        router.post(route("products.restore", product_id));
    };

    return (
        <>
            <Head title="Product history" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex hidden justify-between">
                        <div className="breadcrumbs">
                            <ul>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        className="font-semibold hover:text-primary text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Media store
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("products.manage")}
                                        className="font-semibold hover:text-primary text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage productActions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("products.history")}
                                        className="font-semibold hover:text-primary text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Actions history
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sm:hidden block">
                        <Link
                            href={route("products.manage")}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-4 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Link>
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
                                        Actor
                                    </th>
                                    <th scope="col" className="text-nowrap">
                                        Product
                                    </th>
                                    <th scope="col" className="text-nowrap">
                                        Action
                                    </th>

                                    <th
                                        scope="col"
                                        className="text-nowrap"
                                        onClick={(e) => sort("done_at")}
                                    >
                                        <div className="flex items-center gap-4 cursor-pointer">
                                            Done at
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "done_at" &&
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
                                                            "done_at" &&
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
                                        Detail
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
                                                    "actor_name",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                onKeyPress("actor_name", e)
                                            }
                                            defaultValue={
                                                queryParams.actor_name
                                            }
                                        />
                                    </th>
                                    <th scope="col">
                                        <TextInput
                                            placeholder="search..."
                                            onBlur={(e) =>
                                                searchFieldChanged(
                                                    "product_name",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                onKeyPress("product_name", e)
                                            }
                                            defaultValue={
                                                queryParams.product_name
                                            }
                                        />
                                    </th>
                                    <th scope="col">
                                        <Select
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "action",
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={queryParams.action}
                                        >
                                            <option value="all">All...</option>
                                            <option value="created">
                                                Create
                                            </option>
                                            <option value="updated">
                                                Update
                                            </option>
                                            <option value="deleted">
                                                Delete
                                            </option>
                                        </Select>
                                    </th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {productActions.data.map((product, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-rose-50 even:bg-base-50 hover:opacity-75"
                                    >
                                        <td scope="col" className="text-nowrap">
                                            {product.id}
                                        </td>
                                        <td scope="col">
                                            {product.actor.name}
                                        </td>
                                        <td
                                            scope="col"
                                            className="overflow-hidden text-ellipsis"
                                        >
                                            {product.product.name}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {product.action}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {product.done_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            <button
                                                className="btn btn-outline rounded-2xl btn-info"
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setAction(product);
                                                }}
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={productActions.meta.links} />
                    </div>
                </div>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <div className="mx-8 py-8">
                    {action.action === "updated" && (
                        <div className="grid grid-cols-3">
                            <span className="text-primary">Field</span>
                            <span className="text-primary">Old</span>
                            <span className="text-primary">New</span>
                            {Object.keys(action.details).map((key) => (
                                <>
                                    <span>{key}</span>
                                    <span>{action.details[key]["old"]}</span>
                                    <span>{action.details[key]["new"]}</span>
                                </>
                            ))}
                        </div>
                    )}
                    {(action.action === "created" ||
                        action.action === "deleted") && (
                        <div className="grid grid-cols-2">
                            <span className="text-primary">Field</span>
                            <span className="text-primary">Value</span>
                            {Object.keys(action.details).map((key) => (
                                <>
                                    <span>{key}</span>
                                    <span>{action.details[key]}</span>
                                </>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end gap-4">
                        {action.action === "deleted" && (
                            <button
                                className="btn btn-outline rounded-2xl btn-success"
                                onClick={() => {
                                    setShowModal(false);
                                    restoreProduct(action.product.id);
                                }}
                            >
                                Restore
                            </button>
                        )}

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

Index.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Index;
