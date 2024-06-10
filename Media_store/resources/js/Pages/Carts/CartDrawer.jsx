import { Link } from "@inertiajs/react";
import React from "react";

const CartDrawer = ({ cart }) => {
    const cart_items = cart.data;
    return (
        <div className="flex flex-col gap-5 flex-1 p-4 text-gray-900 dark:text-gray-100">
            {cart_items.length === 0 && (
                <div className="p-6 bg-white rounded">
                    <div className="text-center text-2xl text-warning">
                        Your cart is empty!
                    </div>
                </div>
            )}
            {cart_items.length > 0 &&
                cart_items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center px-4 py-2 rounded bg-pink-50 shadow-sm border border-gray"
                    >
                        <Link
                            href={route("products.show", item.id)}
                            className="m-1 h-28 w-full hover:opacity-80"
                        >
                            <img
                                src={item.image_url}
                                className="rounded-lg h-full w-full object-contain object-center"
                                alt={item.type}
                            />
                        </Link>

                        <div className="text-neutral px-4 text-right">
                            <p className="sm:py-3 py-1">
                                <span className="text-xs">đ</span>
                                {Intl.NumberFormat().format(item.price)}
                            </p>
                            <p>{"x" + item.quantity}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default CartDrawer;
