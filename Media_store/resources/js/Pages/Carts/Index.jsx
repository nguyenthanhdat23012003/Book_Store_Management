import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMinus,
    faPlus,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";

const Index = ({}) => {
    const page = usePage();
    const cart_items = page.props.cart.data;

    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [removeProductID, setRemoveProductID] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [sendingRequest, setSendingRequest] = useState(false);

    const getSelectedProducts = () => {
        return cart_items.filter((product) =>
            selectedProducts.includes(product.id)
        );
    };

    const removeItems = () => {
        router.get(route("product.removeFromCart", removeProductID));
    };

    // keep track of the quantity of each product
    const [quantities, setQuantities] = useState(
        cart_items.reduce((acc, product) => {
            acc[product.id] = product.quantity;
            return acc;
        }, {})
    );

    // change the quantity of a product
    const changeQuantity = (product_id, quantity) => {
        // console.log("change quantity to", product_id, quantity);
        if (quantity === 0) {
            setOpenModal(true);
            setRemoveProductID(product_id);
        } else {
            axios
                .get(route("product.changeQuantity", product_id), {
                    params: {
                        quantity: quantity,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    setSendingRequest(false);
                    setQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [product_id]: quantity,
                    }));
                })
                .catch((error) => {
                    console.error("Error updating quantity:", error);
                    setSendingRequest(false);
                });
        }
    };

    const handleCheckboxChanged = (product_id) => {
        setSelectedProducts((prev) => {
            if (prev.includes(product_id)) {
                return prev.filter((id) => id !== product_id);
            } else {
                return [...prev, product_id];
            }
        });
    };

    const handleSelectAllChange = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedProducts(cart_items.map((product) => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const calculateTotalPrice = () => {
        return cart_items.reduce((total, product) => {
            if (selectedProducts.includes(product.id)) {
                return total + product.price * product.quantity;
            }
            return total;
        }, 0);
    };

    return (
        <>
            <Head title="Product" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                            Your cart
                        </h2>
                    </div>
                </div>
            </header>
            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12 mb-12">
                    <div className="flex flex-col gap-5 flex-1 p-4 text-gray-900 dark:text-gray-100">
                        {cart_items.length > 0 &&
                            cart_items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-wrap sm:items-center px-4 py-2 rounded bg-fuchsia-100 shadow-lg border border-gray"
                                >
                                    <div className="flex grow lg:w-1/5 md:w-1/3 w-2/5 justify-center items-center h-full sm:px-4">
                                        <div className="sm:px-2">
                                            <TextInput
                                                type="checkbox"
                                                checked={
                                                    selectedProducts.includes(
                                                        item.id
                                                    ) || selectAll
                                                }
                                                onChange={() =>
                                                    handleCheckboxChanged(
                                                        item.id
                                                    )
                                                }
                                                className="w-5 h-5 checkbox checkbox-primary"
                                            />
                                        </div>
                                        <div className="m-1">
                                            <img
                                                src={item.image_url}
                                                className="rounded-lg shadow-2xl w-40"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex grow flex-wrap lg:w-3/5 md:w-2/3 w-3/5 justify-between items-center">
                                        <div className="lg:w-1/2 w-full overflow-hidden px-4">
                                            <h1 className="sm:text-2xl font-bold uppercase ">
                                                {item.type}
                                            </h1>
                                            <p className="sm:py-3 py-1 text-ellipsis">
                                                {item.name}
                                            </p>
                                        </div>
                                        <div className="text-orange-400 lg:w-3/12 md:w-1/2 w-full px-4">
                                            <h1 className="sm:text-2xl text-md font-bold">
                                                Unit price
                                            </h1>
                                            <p className="sm:py-3 py-1">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    item.price
                                                )}
                                            </p>
                                        </div>
                                        <div className="sm:flex justify-between items-center lg:w-3/12 md:w-1/2 w-full">
                                            <div className="flex justify-between items-center mx-3">
                                                <button
                                                    className="btn px-2"
                                                    disabled={sendingRequest}
                                                    onClick={() => {
                                                        if (!sendingRequest) {
                                                            changeQuantity(
                                                                item.id,
                                                                quantities[
                                                                    item.id
                                                                ] - 1
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faMinus}
                                                    />
                                                </button>
                                                <span className="px-4 py-2">
                                                    {quantities[item.id]}
                                                </span>
                                                <button
                                                    className="btn px-2"
                                                    disabled={sendingRequest}
                                                    onClick={() => {
                                                        if (!sendingRequest) {
                                                            changeQuantity(
                                                                item.id,
                                                                quantities[
                                                                    item.id
                                                                ] + 1
                                                            );
                                                        }
                                                    }}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />
                                                </button>
                                            </div>
                                            <p className="text-red-600 font-bold text-xl text-center">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    item.quantity * item.price
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="lg:w-1/5 w-full flex sm:justify-end justify-center">
                                        <button
                                            className="btn btn-primary my-4"
                                            onClick={() => {
                                                setRemoveProductID(item.id);
                                                setOpenModal(true);
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Model to confirm remove item */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
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
                            className="btn btn-success"
                            onClick={() => {
                                setOpenModal(false);
                                removeItems();
                            }}
                        >
                            Confirm
                        </button>
                        <button
                            className="btn btn-error"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="fixed right-0 left-0 bottom-0 bg-pink-100 px-4 py-4 shadow">
                <div className="max-w-3xl mx-auto flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <TextInput
                            type="checkbox"
                            onChange={handleSelectAllChange}
                            className="w-4 h-4 checkbox"
                            id="select-all"
                        />
                        <InputLabel
                            htmlFor="select-all"
                            checked={selectAll}
                            className="cursor-pointer"
                        >
                            Select all
                        </InputLabel>
                    </div>
                    <div className="flex sm:gap-12 gap-2 items-center ">
                        <div className="text-xl">
                            <span>
                                Total:{" "}
                                <span className="text-red-600">
                                    {Intl.NumberFormat().format(
                                        calculateTotalPrice()
                                    ) + " vnd"}
                                </span>
                            </span>
                        </div>
                        <button
                            className="btn btn-primary text-slate-200 text-lg"
                            onClick={() => console.log(getSelectedProducts())}
                            disabled={getSelectedProducts().length === 0}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

Index.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default Index;
