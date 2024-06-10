import React from "react";

const DeliveryDetails = ({ delivery }) => {
    return (
        <>
            <div className="flex flex-col gap-2 sm:mx-12 mx-4 mb-4">
                <h1 className="text-center text-primary text-lg font-semibold">
                    Delivery Details
                </h1>
                <div className="flex sm:w-auto w-fit justify-between">
                    <span className="text-nowrap">Order ID:</span>
                    <span className="text-info">{delivery.order_id}</span>
                </div>
                <div className="flex sm:w-auto w-fit justify-between">
                    <span className="text-nowrap">Delivery type:</span>
                    <span className="text-info uppercase">{delivery.type}</span>
                </div>
                <div className="flex sm:w-auto w-fit justify-between">
                    <span className="text-nowrap">Order Date:</span>
                    <span className="text-info">
                        {delivery.order.created_at}
                    </span>
                </div>
                <div className="flex sm:w-auto w-fit justify-between">
                    <span className="text-nowrap">Order cost:</span>
                    <span className="text-info">
                        {delivery.order.total + " VND"}
                    </span>
                </div>
                <div className="flex sm:w-auto w-fit justify-between">
                    <span className="text-nowrap">Free ship discount: </span>
                    <span className="text-info">
                        {delivery.order.free_ship_discount + " VND"}
                    </span>
                </div>
                <div className="flex sm:w-auto w-fit justify-between">
                    <span className="text-nowrap">Shipping fee:</span>
                    <span className="text-info">
                        {delivery.order.shipping_fee + " VND"}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <span className="text-nowrap">Customer name:</span>
                    <span className="text-info">{delivery.name}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <span className="text-nowrap">Customer phone:</span>
                    <span className="text-info">{delivery.phone}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <span className="text-nowrap">Customer address:</span>
                    <span className="text-info text-right">
                        {delivery.province + ", " + delivery.address}
                    </span>
                </div>
            </div>
        </>
    );
};

export default DeliveryDetails;
