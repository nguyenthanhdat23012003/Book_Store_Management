import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

const Dashboard = ({ auth }) => {
    return (
        <>
            <Head title="Dashboard" />

            <div className="h-screen overflow-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="hero py-12">
                                <div className="hero-content text-center">
                                    <div className="max-w-md">
                                        <h1 className="text-5xl font-bold">
                                            Welcome to media store
                                        </h1>
                                        <p className="py-6">
                                            Provident cupiditate voluptatem et
                                            in. Quaerat fugiat ut assumenda
                                            excepturi exercitationem quasi. In
                                            deleniti eaque aut repudiandae et a
                                            id nisi.
                                        </p>

                                        {auth.user.role === "customer" && (
                                            <Link
                                                href={route("products.index")}
                                                className="btn btn-info text-white"
                                            >
                                                See products
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="carousel rounded-box">
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
                                        alt="Burger"
                                    />
                                </div>
                                <div className="carousel-item">
                                    <img
                                        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
                                        alt="Burger"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Dashboard.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        {page}
    </AuthenticatedLayout>
);

export default Dashboard;
