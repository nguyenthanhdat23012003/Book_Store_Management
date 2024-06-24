import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleExclamation,
    faCaretUp,
    faCaretDown,
    faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TextAreaInput from "@/Components/TextAreaInput";
import Checkbox from "@/Components/Checkbox";

const Create = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        role: "customer",
        message: "Welcome to the media store!",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("users.store"));
    };

    return (
        <>
            <Head title="Create users" />

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
                                    <li>
                                        <Link
                                            href={route("users.create")}
                                            className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                        >
                                            Create users
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
                </div>
            </header>

            <div className="flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center cursor-pointer">
                                <Checkbox
                                    name="role"
                                    checked={data.role === "manager"}
                                    onChange={(e) =>
                                        setData(
                                            "role",
                                            data.role === "manager"
                                                ? "customer"
                                                : "manager"
                                        )
                                    }
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                    Make this user an manager
                                </span>
                            </label>
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="message"
                                value="Message (optional)"
                            />

                            <TextAreaInput
                                id="message"
                                name="message"
                                className="w-full"
                                value={data.message}
                                onChange={(e) =>
                                    setData("message", e.target.value)
                                }
                            ></TextAreaInput>

                            <InputError
                                message={errors.message}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-end gap-2 mt-4">
                            <button
                                className="btn btn-outline rounded-2xl btn-success"
                                type="submit"
                                disabled={processing}
                            >
                                Submit
                            </button>
                            <Link
                                href={route("users.index")}
                                className="btn btn-outline rounded-2xl btn-warning"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

Create.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Create;
