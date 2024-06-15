import {
    faCircleExclamation,
    faClipboardList,
    faMoneyBill1Wave,
    faRightToBracket,
    faStar,
    faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OrderTimeLine = ({ order }) => {
    console.log(order);
    return (
        <>
            <ul className="timeline timeline-vertical lg:timeline-horizontal">
                <li>
                    <div className="timeline-start timeline-box border-success text-success">
                        Order placed
                    </div>
                    <div className="timeline-middle">
                        <div className="rounded-full border border-success text-success h-12 w-12 flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faClipboardList}
                                className="w-8 h-6"
                            />
                        </div>
                    </div>
                    <div className="timeline-end">{order.created_at}</div>

                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-end">
                        {order.payment.paid_at || order.payment.updated_at}
                    </div>
                    <div className="timeline-middle">
                        <div
                            className={`rounded-full border ${
                                (order.payment_method === "cod" ||
                                    order.payment.paid_at) &&
                                "border-success text-success"
                            } h-12 w-12 flex items-center justify-center`}
                        >
                            <FontAwesomeIcon
                                icon={faMoneyBill1Wave}
                                className="w-8 h-6"
                            />
                        </div>
                    </div>
                    <div
                        className={`timeline-start timeline-box ${
                            (order.payment_method === "cod" ||
                                order.payment.paid_at) &&
                            "border-success text-success"
                        }`}
                    >
                        Order paid (
                        {`${Intl.NumberFormat().format(order.total_price)} VND`}
                        )
                    </div>
                    <hr />
                </li>

                {order.status === "rejected" && (
                    <li className="text-error">
                        <hr />
                        <div className="timeline-end">
                            {order.delivery.rejected_at}
                        </div>
                        <div className="timeline-middle">
                            <div className="rounded-full border border-error h-12 w-12 flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faCircleExclamation}
                                    className="w-8 h-6"
                                />
                            </div>
                        </div>
                        <div className="timeline-start timeline-box border-error">
                            Order rejected
                        </div>
                    </li>
                )}

                {order.status === "cancelled" && (
                    <li className="text-error">
                        <hr />
                        <div className="timeline-end">{order.updated_at}</div>
                        <div className="timeline-middle">
                            <div className="rounded-full border border-error h-12 w-12 flex items-center justify-center">
                                <FontAwesomeIcon
                                    icon={faCircleExclamation}
                                    className="w-8 h-6"
                                />
                            </div>
                        </div>
                        <div className="timeline-start timeline-box border-error">
                            Order cancelled
                        </div>
                        <hr />
                    </li>
                )}

                {order.status !== "cancelled" &&
                    order.status !== "rejected" && (
                        <>
                            <li>
                                <hr />
                                <div className="timeline-end">
                                    {order.delivery.confirmed_at}
                                </div>
                                <div className="timeline-middle">
                                    <div
                                        className={`rounded-full border ${
                                            order.delivery.confirmed_at &&
                                            "border-success text-success"
                                        } h-12 w-12 flex items-center justify-center`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTruckFast}
                                            className="w-8 h-6"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`timeline-start timeline-box ${
                                        order.delivery.confirmed_at &&
                                        "border-success text-success"
                                    }`}
                                >
                                    Order shipped out
                                </div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-end">
                                    {order.delivery.completed_at}
                                </div>
                                <div className="timeline-middle">
                                    <div
                                        className={`rounded-full border ${
                                            order.delivery.completed_at &&
                                            "border-success text-success"
                                        } h-12 w-12 flex items-center justify-center`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightToBracket}
                                            className="w-8 h-6 fa-rotate-90"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`timeline-start timeline-box ${
                                        order.delivery.completed_at &&
                                        "border-success text-success"
                                    }`}
                                >
                                    Order received
                                </div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-end">
                                    {order.completed_at}
                                </div>
                                <div className="timeline-middle">
                                    <div
                                        className={`rounded-full border ${
                                            order.completed_at &&
                                            "border-success text-success"
                                        } h-12 w-12 flex items-center justify-center`}
                                    >
                                        <FontAwesomeIcon
                                            icon={faStar}
                                            className="w-8 h-6"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`timeline-start timeline-box ${
                                        order.completed_at &&
                                        "border-success text-success"
                                    }`}
                                >
                                    Order completed
                                </div>
                            </li>
                        </>
                    )}
            </ul>
        </>
    );
};

export default OrderTimeLine;
