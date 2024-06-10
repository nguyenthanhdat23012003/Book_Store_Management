import React from "react";

const ProductDetails = ({ product }) => {
    const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

    return (
        <>
            {product.type === "book" && (
                <div className="flex flex-col gap-2 sm:mx-12 mx-4 mb-4">
                    <h1 className="text-primary text-lg font-semibold">Book</h1>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Authors:
                        </span>
                        <span className="text-info">{product.authors}</span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Cover type:
                        </span>
                        <span className="text-info uppercase">
                            {product.cover_type}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Publisher:
                        </span>
                        <span className="text-info">{product.publisher}</span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Number of pages:
                        </span>
                        <span className="text-info">
                            {product.number_of_pages}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Language:
                        </span>
                        <span className="text-info">
                            {displayNames.of(product.language)}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Publication date:
                        </span>
                        <span className="text-info">
                            {product.publication_date}
                        </span>
                    </div>
                </div>
            )}

            {product.type === "cd" && (
                <div className="flex flex-col gap-2 sm:mx-12 mx-4 mb-4">
                    <h1 className="text-primary text-lg font-semibold">
                        Compact disc
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Collections:
                        </span>
                        <span className="text-info">{product.collections}</span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Albums:
                        </span>
                        <div className="flex flex-col">
                            {product.albums.map((album, index) => (
                                <span
                                    key={index}
                                    className="text-neutral underline"
                                >
                                    {album + ", "}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Artists:
                        </span>
                        <div className="flex flex-col">
                            {product.artists.map((artist, index) => (
                                <span
                                    key={index}
                                    className="text-neutral underline"
                                >
                                    {artist + ", "}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Record label:
                        </span>
                        <div className="flex flex-col">
                            {Object.keys(product.record_label).map(
                                (record, index) => (
                                    <span key={index} className="text-info">
                                        {`${record} : ${product.record_label[record]}`}
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Release date:
                        </span>
                        <span className="text-info">
                            {product.release_date}
                        </span>
                    </div>
                </div>
            )}

            {product.type === "dvd" && (
                <div className="flex flex-col gap-2 sm:mx-12 mx-4 mb-4">
                    <h1 className="text-primary text-lg font-semibold">
                        Digital Video Disc
                    </h1>

                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Director:
                        </span>
                        <span className="text-info">{product.director}</span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Disc type:
                        </span>
                        <span className="text-info uppercase">
                            {product.disc_type}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Runtime:
                        </span>
                        <span className="text-info">
                            {product.runtime + " minutes"}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Studio:
                        </span>
                        <span className="text-info">{product.studio}</span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Language:
                        </span>
                        <span className="text-info">
                            {displayNames.of(product.language)}
                        </span>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Release date:
                        </span>
                        <span className="text-info">
                            {product.release_date}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
