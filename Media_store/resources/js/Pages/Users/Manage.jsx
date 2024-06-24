import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faCaretUp,
    faCaretDown,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import Select from "@/Components/Select";
import Toast from "@/Components/Toast";

const Manage = ({ users, queryParams = null }) => {
    const [showModal, setShowModal] = useState(false);
    const [focusUser, setForcusUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [action, setAction] = useState(null);
    const currUser = usePage().props.auth.user;

    useEffect(() => {
        if (messages.length === 0) return;
        const timer = setInterval(() => {
            setMessages((currentMessages) => currentMessages.slice(1));
        }, 3000);

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

        router.get(route("users.index"), queryParams);
    };

    const sort = (name) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_dir =
                queryParams.sort_dir === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_dir = "asc";
        }

        router.get(route("users.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const block = (user) => {
        axios.post(route("users.changeActive", user.id)).then((res) => {
            setMessages([
                ...messages,
                {
                    type: "alert-success",
                    message: res.data.message,
                },
            ]);
            router.reload();
        });
    };

    const changeRole = (user) => {
        axios.post(route("users.changeRole", user.id)).then((res) => {
            setMessages([
                ...messages,
                {
                    type: "alert-success",
                    message: res.data.message,
                },
            ]);
            router.reload();
        });
    };

    return (
        <>
            <Head title="Users" />

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
                                            href={route("users.index")}
                                            className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                        >
                                            Manage users
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
                        <Link
                            href={route("users.create")}
                            className="btn btn-outline rounded-2xl btn-success -mb-4"
                        >
                            Add new
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
                                        Name
                                    </th>
                                    <th scope="col" className="text-nowrap">
                                        Email
                                    </th>
                                    <th scope="col" className="text-nowrap">
                                        Role
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
                                        onClick={(e) => sort("blocked_at")}
                                    >
                                        <div className="flex items-center justify-between gap-2 cursor-pointer">
                                            Blocked at
                                            <div className="flex flex-col">
                                                <FontAwesomeIcon
                                                    icon={faCaretUp}
                                                    className={
                                                        "-mb-1 " +
                                                        (queryParams.sort_field ===
                                                            "blocked_at" &&
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
                                                            "blocked_at" &&
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
                                        <TextInput
                                            placeholder="search..."
                                            onBlur={(e) =>
                                                searchFieldChanged(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            onKeyPress={(e) =>
                                                onKeyPress("email", e)
                                            }
                                            defaultValue={queryParams.email}
                                        />
                                    </th>
                                    <th scope="col">
                                        <Select
                                            onChange={(e) =>
                                                searchFieldChanged(
                                                    "role",
                                                    e.target.value
                                                )
                                            }
                                            defaultValue={queryParams.role}
                                        >
                                            <option value="all">All...</option>
                                            <option value="admin">Admin</option>
                                            <option value="manager">
                                                Manager
                                            </option>
                                            <option value="customer">
                                                Customer
                                            </option>
                                        </Select>
                                    </th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.data.map((user, index) => (
                                    <tr
                                        key={index}
                                        className="odd:bg-rose-50 even:bg-base-50 hover:opacity-75"
                                    >
                                        <td scope="col" className="text-nowrap">
                                            {user.id}
                                        </td>
                                        <td scope="col">
                                            <div className="max-w-40 overflow-hidden text-ellipsis">
                                                <span className=" text-nowrap">
                                                    {user.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td scope="col">
                                            <div className="max-w-40 overflow-hidden text-ellipsis">
                                                <span className=" text-nowrap">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {user.role}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {user.created_at}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {user.blocked_at || "-"}
                                        </td>
                                        <td scope="col" className="text-nowrap">
                                            {currUser.id !== user.id ? (
                                                <div className="flex gap-2 items-center">
                                                    <span
                                                        onClick={() => {
                                                            setAction(1);
                                                            setShowModal(true);
                                                            setForcusUser(user);
                                                        }}
                                                        className={`hover:underline cursor-pointer ${
                                                            user.blocked_at
                                                                ? "text-success"
                                                                : "text-error"
                                                        }`}
                                                    >
                                                        {user.blocked_at
                                                            ? "Unblock"
                                                            : "Block"}
                                                    </span>
                                                    <span
                                                        onClick={() => {
                                                            setAction(2);
                                                            setShowModal(true);
                                                            setForcusUser(user);
                                                        }}
                                                        className="hover:underline cursor-pointer text-info"
                                                    >
                                                        {user.role ===
                                                        "customer"
                                                            ? "Make manager"
                                                            : "Make customer"}
                                                    </span>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination links={users.meta.links} />
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
                        {action == 1
                            ? `Are you sure to ${
                                  focusUser.blocked_at ? "unblock" : "block"
                              } user "${focusUser.name}"?`
                            : `Are you sure to make user "${
                                  focusUser.name
                              }" become ${
                                  focusUser.role === "customer"
                                      ? "manager"
                                      : "customer"
                              }?`}
                    </h3>
                    <div className="flex justify-center gap-4">
                        <button
                            className="btn btn-outline rounded-2xl btn-success"
                            onClick={() => {
                                setShowModal(false);
                                action == 1
                                    ? block(focusUser)
                                    : changeRole(focusUser);
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
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Manage;
