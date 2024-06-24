import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "@inertiajs/react";

const OrderDetails = ({ order }) => {
    return (
        <div className="flex flex-col flex-1 px-4 py-2">
            <div className="flex gap-4 justify-end items-center font-semibold py-2 mb-2">
                <h3 className="text-success uppercase flex gap-2 items-center">
                    <FontAwesomeIcon icon={faTruck} />
                    <span>{order.delivery?.status || "None"}</span>
                    <span
                        className="tooltip tooltip-bottom"
                        data-tip={
                            order.delivery?.created_at
                                ? "Delivered at " + order.delivery?.created_at
                                : "No new update"
                        }
                    >
                        <FontAwesomeIcon icon={faCircleQuestion} />
                    </span>
                </h3>
                <h3 className="text-orange-500 uppercase border-l border-orange-300 px-3">
                    {order.status}
                </h3>
            </div>

            <div className="flex flex-col gap-2 max-h-80 overflow-auto no-scrollbar shadow-inner border">
                {order.order_items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between h-full sm:px-4 my-2"
                    >
                        <Link
                            href={route("products.show", item.id)}
                            className="md:w-2/3 w-full flex flex-wrap"
                        >
                            <div className="md:w-1/4 sm:w-1/3 w-1/2 sm:h-32 p-1 border rounded border-primary">
                                <img
                                    src={item.product.image_path}
                                    className="object-contain object-center w-full h-full rounded-lg"
                                />
                            </div>

                            <div className="md:w-3/4 sm:w-2/3 w-full overflow-hidden px-4">
                                <h1 className="sm:text-xl font-bold uppercase ">
                                    {item.product.type}
                                </h1>
                                <p className="text-ellipsis">
                                    {item.product.name}
                                </p>
                                <p className="text-sm py-1">
                                    {"x" + item.quantity}
                                </p>
                                {item.product.deleted_at ? (
                                    <p className="text-error border-error rounded border px-1 w-fit font-semibold">
                                        Warning: This product has been deleted
                                    </p>
                                ) : (
                                    <p
                                        className={`${
                                            item.quantity >
                                            item.product.in_stock
                                                ? "text-error border-error"
                                                : "text-success border-success"
                                        } rounded border px-1 w-fit font-semibold`}
                                    >
                                        {`Available: ${item.product.in_stock}`}
                                    </p>
                                )}
                            </div>
                        </Link>

                        <div className="sm:block hidden self-center">
                            <p className="text-red-600">
                                <span className="text-xs px-1">đ</span>
                                {Intl.NumberFormat().format(item.product.price)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex sm:justify-end justify-between items-center gap-3 px-4">
                    <h1 className="sm:text-lg text-md font-bold text-slate-600">
                        Total:
                    </h1>
                    <p className="sm:py-3 py-1 text-2xl font-semibold text-primary">
                        <span className="text-xs">đ</span>
                        {Intl.NumberFormat().format(order.total_price)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
