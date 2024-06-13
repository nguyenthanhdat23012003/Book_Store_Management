import { Link } from "@inertiajs/react";
import React from "react";

const ProductDetails = ({ product }) => {
    const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

    console.log(product);

    return (
        <>
            {product.type === "book" && (
                <div className="flex flex-col gap-2 sm:mx-12 m-4">
                    <h1 className="text-primary text-lg font-semibold">Book</h1>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Authors:
                        </span>
                        <span className="text-neutral">
                            {product.authors.toString()}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Cover type:
                        </span>
                        <span className="text-neutral uppercase">
                            {product.cover_type}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Publisher:
                        </span>
                        <span className="text-neutral">
                            {product.publisher}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Number of pages:
                        </span>
                        <span className="text-neutral">
                            {product.number_of_pages}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Language:
                        </span>
                        <span className="text-neutral">
                            {displayNames.of(product.language)}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Publication date:
                        </span>
                        <span className="text-neutral">
                            {product.publication_date}
                        </span>
                    </div>
                </div>
            )}

            {product.type === "cd" && (
                <div className="flex flex-col gap-2 sm:mx-12 m-4">
                    <h1 className="text-primary text-lg font-semibold">
                        Compact disc
                    </h1>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Collections:
                        </span>
                        <span className="text-neutral">
                            {product.collections}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Albums:
                        </span>
                        <span className="text-neutral">
                            {product.collections.toString()}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Artists:
                        </span>
                        <span className="text-neutral">
                            {product.artists.toString()}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Label:
                        </span>
                        <div className="collapse rounded-none">
                            <input className="w-32" type="checkbox" />
                            <div className="collapse-title font-medium p-0">
                                View
                            </div>
                            <div className="collapse-content">
                                {product.record_label.length === 0 && (
                                    <span className="text-neutral">
                                        No label found
                                    </span>
                                )}
                                <div className="flex flex-col">
                                    {product.record_label.map(
                                        (label, index) => (
                                            <span
                                                key={index}
                                                className="text-neutral"
                                            >
                                                {"- " + label}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Tracklist:
                        </span>
                        <div className="collapse rounded-none">
                            <input className="w-32" type="checkbox" />
                            <div className="collapse-title font-medium p-0">
                                View
                            </div>
                            <div className="collapse-content">
                                {product.track_list.length === 0 && (
                                    <span className="text-neutral">
                                        No tracks found
                                    </span>
                                )}
                                <div className="flex flex-col text-neutral">
                                    {product.track_list.map((track, index) => (
                                        <span key={index}>
                                            {track["position"] +
                                                ". " +
                                                track["title"] +
                                                " (duration: " +
                                                track["duration"] +
                                                ")"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex flex-col">
                        <span className="text-nowrap text-gray-600">
                            Videos:
                        </span>
                        <div className="collapse rounded-none">
                            <input className="w-32" type="checkbox" />
                            <div className="collapse-title font-medium p-0">
                                View
                            </div>
                            <div className="collapse-content">
                                {product.videos.length === 0 && (
                                    <span className="text-neutral">
                                        No videos found
                                    </span>
                                )}
                                <div className="flex flex-col">
                                    {product.videos.map((video, index) => (
                                        <div key={index}>
                                            <a
                                                href={video["uri"]}
                                                className="underline text-info hover:text-cyan-500"
                                                target="_blank"
                                            >
                                                {video["title"] +
                                                    " " +
                                                    video["duration"] +
                                                    " min."}
                                            </a>
                                            <p className="text-gray-600 text-sm">
                                                {video["description"]}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Country:
                        </span>
                        <span className="text-neutral">{product.country}</span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Release date:
                        </span>
                        <span className="text-neutral">
                            {product.release_date}
                        </span>
                    </div>
                </div>
            )}

            {product.type === "dvd" && (
                <div className="flex flex-col gap-2 sm:mx-12 m-4">
                    <h1 className="text-primary text-lg font-semibold">
                        Digital Video Disc
                    </h1>

                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Director:
                        </span>
                        <span className="text-neutral">
                            {product.director.toString()}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Actors:
                        </span>
                        <span className="text-neutral">
                            {product.actors.toString()}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Writer:
                        </span>
                        <span className="text-neutral">
                            {product.writer.toString()}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Disc type:
                        </span>
                        <span className="text-neutral uppercase">
                            {product.disc_type}
                        </span>
                    </div>
                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Runtime:
                        </span>
                        <span className="text-neutral">{product.runtime}</span>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Language:
                        </span>
                        <span className="text-neutral">{product.language}</span>
                    </div>

                    <div className="sm:grid sm:grid-cols-2 flex justify-between">
                        <span className="text-nowrap text-gray-600">
                            Release date:
                        </span>
                        <span className="text-neutral">
                            {product.release_date}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetails;
