import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Head, usePage, Link } from "@inertiajs/react";
import React from "react";

const manage = ({ products }) => {
    const page = usePage();
    const [alert, setAlert] = React.useState(false);

    return (
        <>
            <Head title="Product" />

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
                                        href={route("products.manage")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage products
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex flex-wrap">
                                {products.data.map((product, index) => (
                                    <div
                                        key={index}
                                        className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full p-4"
                                    >
                                        <div className="card indicator w-full bg-base-100 shadow-xl">
                                            <figure className="min-h-[100px]">
                                                <span className="indicator-item badge badge-primary">
                                                    new
                                                </span>
                                                <img
                                                    src={product.image_path}
                                                    alt="Shoes"
                                                />
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title uppercase">
                                                    {product.type}
                                                </h2>
                                                <div className="h-20 overflow-hidden">
                                                    <p className="text-ellipsis">
                                                        {product.name}
                                                    </p>
                                                </div>
                                                <div className="text-2xl text-orange-400">
                                                    {Intl.NumberFormat().format(
                                                        product.price
                                                    ) + " vnd"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination links={products.links} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

manage.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default manage;
