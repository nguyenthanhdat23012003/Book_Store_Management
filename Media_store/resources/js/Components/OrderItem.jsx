export default function OrderItem({ item }) {
    return (
        <div className="flex flex-wrap sm:items-center px-4 py-2 rounded bg-fuchsia-100 shadow-lg border border-gray">
            <div className="flex grow lg:w-1/2 w-full justify-center sm:px-4">
                <div className="w-1/4 m-1">
                    <img
                        src={item.product.image_path}
                        className="rounded-lg shadow-2xl w-"
                    />
                </div>
                <div className="w-3/4 overflow-hidden px-4">
                    <p className="sm:py-3 py-1 text-sm text-ellipsis">
                        {item.product.name}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap lg:w-1/2 w-full justify-center items-center">
                <div className="sm:w-1/3 w-full flex justify-between items-center text-orange-400">
                    <h3 className="block sm:hidden">Unit price:</h3>
                    <p className="sm:py-3 py-1 sm:w-full w-auto text-center">
                        <span className="text-xs">đ</span>
                        {Intl.NumberFormat().format(item.product.price)}
                    </p>
                </div>
                <div className="sm:w-1/3 w-full flex justify-between items-center text-orange-400">
                    <h3 className="block sm:hidden">Quantity:</h3>
                    <p className="sm:py-3 py-1 sm:w-full w-auto text-center">
                        {item.quantity}
                    </p>
                </div>
                <div className="sm:w-1/3 w-full flex justify-between items-center text-red-600 font-bold text-xl">
                    <h3 className="block sm:hidden">Total:</h3>
                    <p className="sm:py-3 py-1 sm:w-full w-auto text-center">
                        <span className="text-xs">đ</span>
                        {Intl.NumberFormat().format(
                            item.quantity * item.product.price
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}