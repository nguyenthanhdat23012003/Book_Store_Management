import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import OrderItem from "@/Components/OrderItem";
import Timeline from "@/Components/Timeline";

const show = ({ order }) => {
    const { data, setData, put } = useForm({
        order_id: order.id,
        phone: "1234567890",
        province: "Ha Noi",
        address: "Hai Ba Trung",
        delivery_type: "normal",
        shipping_fee: 0,
        free_ship_discount: 0,
        total_price: 0,
        payment_method: "vn pay",
    });

    let totalWeight = 0;
    order.order_items.forEach((item) => {
        totalWeight += item.product.weight * item.quantity;
    });

    useEffect(() => {
        let free_ship =
            Math.max(0, totalWeight + 250 - 3000) * 5 +
            (data.province === "Ha Noi" || data.province === "Ho Chi Minh City")
                ? 22000
                : 30000;

        free_ship +=
            data.delivery_type === "normal"
                ? 0
                : order.order_items.length * 10000;

        let discount =
            data.delivery_type === "normal"
                ? free_ship <= 25000
                    ? free_ship
                    : 25000
                : 0;

        setData({
            ...data,
            shipping_fee: free_ship,
            free_ship_discount: discount,
            total_price: order.total_price + free_ship - discount,
        });

        return () => {};
    }, [data.province, data.delivery_type, data.payment_method]);

    const pay = (e) => {
        e.preventDefault();
        put(route("order.update", order.id), data);
    };

    const provinces = [
        "An Giang",
        "Ba Ria-Vung Tau",
        "Bac Giang",
        "Bac Kan",
        "Bac Lieu",
        "Bac Ninh",
        "Ben Tre",
        "Binh Dinh",
        "Binh Duong",
        "Binh Phuoc",
        "Binh Thuan",
        "Ca Mau",
        "Can Tho",
        "Cao Bang",
        "Da Nang",
        "Dak Lak",
        "Dak Nong",
        "Dien Bien",
        "Dong Nai",
        "Dong Thap",
        "Gia Lai",
        "Ha Giang",
        "Ha Nam",
        "Ha Noi",
        "Ha Tinh",
        "Hai Duong",
        "Hai Phong",
        "Hau Giang",
        "Hoa Binh",
        "Hung Yen",
        "Khanh Hoa",
        "Kien Giang",
        "Kon Tum",
        "Lai Chau",
        "Lam Dong",
        "Lang Son",
        "Lao Cai",
        "Long An",
        "Nam Dinh",
        "Nghe An",
        "Ninh Binh",
        "Ninh Thuan",
        "Phu Tho",
        "Phu Yen",
        "Quang Binh",
        "Quang Nam",
        "Quang Ngai",
        "Quang Ninh",
        "Quang Tri",
        "Soc Trang",
        "Son La",
        "Tay Ninh",
        "Thai Binh",
        "Thai Nguyen",
        "Thanh Hoa",
        "Thua Thien-Hue",
        "Tien Giang",
        "Tra Vinh",
        "Tuyen Quang",
        "Vinh Long",
        "Vinh Phuc",
        "Yen Bai",
        "Ho Chi Minh City",
    ];

    return (
        <>
            <Head title="Place order" />

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
                                        href={route("cart.index")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Your cart
                                    </Link>
                                </li>
                                <li>
                                    <span className="font-semibold hover:text-amber-700 hover:underline text-lg text-slate-800 dark:text-gray-200 leading-tight cursor-pointer">
                                        Place order
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="flex flex-col gap-6 p-6 text-gray-900 dark:text-gray-100">
                            <div className="md:flex hidden items-center px-4 py-2 rounded bg-fuchsia-200 shadow-lg border border-gray text-sky-500 text-lg">
                                <div className="w-1/2 ml-6">Products</div>
                                <div className="w-1/2">
                                    <div className="flex justify-between">
                                        <div className="w-1/3 text-center">
                                            Unit price
                                        </div>
                                        <div className="w-1/3 text-center">
                                            Quantity
                                        </div>
                                        <div className="w-1/3 text-center">
                                            Total
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {order.order_items.length > 0 &&
                                order.order_items.map((item) => (
                                    <OrderItem key={item.id} item={item} />
                                ))}

                            <div className="px-4 py-2 mb-4 rounded bg-fuchsia-50 shadow-lg border border-gray text-lg">
                                <div className="my-4 w-full text-center text-orange-500 text-2xl">
                                    Delivery
                                </div>

                                <div className="flex sm:flex-row flex-col justify-between items-center sm:px-4 px-2">
                                    <form
                                        onSubmit={pay}
                                        id="deliveryForm"
                                        className="flex flex-col gap-2"
                                    >
                                        <select
                                            value={data.province}
                                            className="select select-bordered w-full "
                                            onChange={(e) =>
                                                setData(
                                                    "province",
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {provinces.map(
                                                (province, index) => (
                                                    <option
                                                        key={index}
                                                        value={province}
                                                    >
                                                        {province}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <label className="input input-bordered flex items-center gap-2">
                                            Phone number
                                            <input
                                                value={data.phone}
                                                onChange={(e) =>
                                                    setData(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                type="tel"
                                                pattern="[0-9]{10}"
                                                className="grow border-none focus-within:ring-0"
                                                placeholder="0123456789"
                                                required
                                            />
                                        </label>
                                        <label className="input input-bordered flex items-center gap-2">
                                            Address
                                            <input
                                                required
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="grow border-none focus-within:ring-0"
                                                placeholder="Enter your address"
                                            />
                                        </label>
                                        <select
                                            value={data.delivery_type}
                                            onChange={(e) =>
                                                setData(
                                                    "delivery_type",
                                                    e.target.value
                                                )
                                            }
                                            className="select select-bordered w-full "
                                        >
                                            <option value="normal">
                                                Normal order
                                            </option>
                                            <option value="rush">
                                                Rush order
                                            </option>
                                        </select>
                                        <select
                                            value={data.payment_method}
                                            onChange={(e) =>
                                                setData(
                                                    "payment_method",
                                                    e.target.value
                                                )
                                            }
                                            className="select select-bordered w-full "
                                        >
                                            <option value="vn pay">
                                                VN pay
                                            </option>
                                            <option value="cash">Cash</option>
                                        </select>
                                    </form>
                                    <div className="flex sm:w-2/5 w-full flex-col gap-2 text-sm sm:mt-0 mt-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-nowrap">
                                                Merchandise Subtotal:
                                            </h3>
                                            <p className="sm:py-3 py-1 sm:w-full w-auto text-end">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    order.total_price
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-nowrap">
                                                Shipping Total:
                                            </h3>
                                            <p className="sm:py-3 py-1 sm:w-full w-auto text-end">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    data.shipping_fee
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-nowrap">
                                                Voucher Discount:
                                            </h3>
                                            <p className="sm:py-3 py-1 sm:w-full w-auto text-end">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    data.free_ship_discount
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-nowrap">
                                                Total Payment:
                                            </h3>
                                            <p className="sm:py-3 py-1 sm:w-full w-auto text-end text-3xl text-red-500">
                                                <span className="text-xs">
                                                    đ
                                                </span>
                                                {Intl.NumberFormat().format(
                                                    data.total_price
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-pink-700 sm:px-6 px-2 py-4 text-justify">
                                    <span className="text-bold text-lg">
                                        Note:&emsp;
                                    </span>
                                    <span className="text-sm">
                                        Order with a total value of the items
                                        exceeding 100,000 VND will qualify for
                                        free shipping, up to a maximum of 25,000
                                        VND (not apply to rush order) Rush order
                                        will be delivered within 2 hours and
                                        free ship is not supported. We charge an
                                        additional 10,000 VND for each item.
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-center mb-12">
                                <Timeline />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pay button */}
            <div className="fixed right-0 left-0 bottom-0 bg-pink-100 px-4 py-4 shadow">
                <div className="max-w-3xl mx-auto flex justify-end items-center">
                    <button
                        type="submit"
                        form="deliveryForm"
                        className="btn btn-primary text-slate-200 text-lg w-32"
                    >
                        Place order
                    </button>
                </div>
            </div>
        </>
    );
};

show.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default show;
