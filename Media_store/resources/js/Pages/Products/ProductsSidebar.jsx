import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBarsStaggered,
    faDollarSign,
    faFilter,
    faList,
    faMinus,
    faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";

const ProductsSidebar = ({
    queryParams = null,
    searchFieldChanged = () => {},
    filterPrice = () => {},
    clearAll = () => {},
    sort = () => {},
}) => {
    const genres = [
        "Education",
        "Science",
        "Fiction",
        "Art",
        "History",
        "Action",
        "Animation",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Mystery",
        "Romance",
        "Thriller",
        "Rock",
        "Pop",
        "Jazz",
        "Classical",
        "Country",
        "Electronic",
    ];

    const [range, setRange] = useState({});

    return (
        <>
            <div className="lg:hidden flex flex-col gap-4 p-4">
                <div>
                    <p>Sort by</p>
                </div>
                <button
                    className={`btn w-28 ${
                        queryParams.sort_field !== "random" && "btn-outline"
                    } btn-primary rounded-sm`}
                    onClick={() => sort("random", "asc")}
                >
                    Random
                </button>
                <button
                    className={`btn w-28 ${
                        queryParams.sort_field !== "sold" && "btn-outline"
                    } btn-primary rounded-sm`}
                    onClick={() => sort("sold", "desc")}
                >
                    Top sales
                </button>
                <button
                    className={`btn w-28 ${
                        queryParams.sort_field !== "created_at" && "btn-outline"
                    } btn-primary rounded-sm`}
                    onClick={() => sort("created_at", "desc")}
                >
                    Latest
                </button>
                <select
                    value={
                        queryParams.sort_field === "price"
                            ? queryParams.sort_dir
                            : ""
                    }
                    className={`py-3 rounded-sm border-primary border ${
                        queryParams.sort_field === "price" &&
                        "bg-primary text-white"
                    }`}
                    onChange={(e) => sort("price", e.target.value)}
                >
                    <option value="" disabled>
                        Price...
                    </option>
                    <option value="asc">Price low to high</option>
                    <option value="desc">Price high to low</option>
                </select>
            </div>
            <div className="p-4">
                <div
                    className="text-xl flex items-center gap-1 py-2 mb-2 border-b cursor-pointer hover:text-primary"
                    onClick={() => searchFieldChanged("type", "all")}
                >
                    <FontAwesomeIcon icon={faList} className="w-6" />
                    <h3>All categories</h3>
                </div>
                <div className="mx-4">
                    <ul>
                        <li>
                            <div
                                className={`py-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                                    queryParams.type === "book" &&
                                    "text-primary pl-2 bg-black/5"
                                }`}
                                onClick={() =>
                                    searchFieldChanged("type", "book")
                                }
                            >
                                Book
                            </div>
                        </li>
                        <li>
                            <div
                                className={`py-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                                    queryParams.type === "cd" &&
                                    "text-primary pl-2 bg-black/5"
                                }`}
                                onClick={() => searchFieldChanged("type", "cd")}
                            >
                                CD
                            </div>
                        </li>
                        <li>
                            <div
                                className={`py-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                                    queryParams.type === "dvd" &&
                                    "text-primary pl-2 bg-black/5"
                                }`}
                                onClick={() =>
                                    searchFieldChanged("type", "dvd")
                                }
                            >
                                DVD
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="p-4">
                <div className="text-xl flex items-center gap-1 py-2 mb-2 border-b">
                    <FontAwesomeIcon icon={faFilter} className="w-6" />
                    <h3>Search filter</h3>
                </div>
                {/* Genre */}
                <div className="mx-4 mb-2 border-b">
                    <div
                        className={`flex items-center gap-1 py-2 mb-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                            queryParams.genre === "all" &&
                            "text-primary pl-2 bg-black/5"
                        }`}
                        onClick={() => searchFieldChanged("genre", "all")}
                    >
                        <FontAwesomeIcon icon={faBarsStaggered} />
                        <h3>Common genres</h3>
                    </div>
                    <div className="mb-2">
                        <ul>
                            {genres.map((genre, index) => (
                                <li key={index}>
                                    <div
                                        className={`px-4 py-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                                            queryParams.genre === genre &&
                                            "text-primary pl-6 bg-black/5"
                                        }`}
                                        onClick={() =>
                                            searchFieldChanged("genre", genre)
                                        }
                                    >
                                        {genre}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Price range */}
                <div className="mx-4 mb-2 pb-2 border-b">
                    <div
                        className={`flex items-center gap-1 py-2 mb-2 cursor-pointer ${
                            queryParams.price_range &&
                            "text-primary pl-2 bg-black/5"
                        }`}
                    >
                        <FontAwesomeIcon icon={faDollarSign} />
                        <h3>Price range</h3>
                    </div>
                    <div className="my-2">
                        <div className="flex justify-between items-center mb-4">
                            <input
                                type="number"
                                min={0}
                                value={range.min}
                                className="text-sm w-20 py-2 rounded-none"
                                placeholder="₫ MIN"
                                onChange={(e) =>
                                    setRange({
                                        min: e.target.value,
                                        max: range.max,
                                    })
                                }
                            />
                            <FontAwesomeIcon
                                icon={faMinus}
                                className="w-4 text-gray-500"
                            />

                            <input
                                type="number"
                                min={0}
                                value={range.max}
                                className="text-sm w-20 py-2 rounded-none"
                                placeholder="₫ MAX"
                                onChange={(e) =>
                                    setRange({
                                        min: range.min,
                                        max: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="text-center">
                            <button
                                className="btn btn-outline btn-primary rounded-sm w-full"
                                onClick={() => filterPrice(range)}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Rating */}
                <div className="mb-2 border-b">
                    <div
                        className={`flex items-center gap-1 px-4 py-2 mb-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                            queryParams.rating === "all" &&
                            "text-primary pl-6 bg-black/5"
                        }`}
                        onClick={() => searchFieldChanged("rating", "all")}
                    >
                        <FontAwesomeIcon icon={faStarHalfStroke} />
                        <h3>Rating</h3>
                    </div>
                    <div className="mx-4 mb-2">
                        <ul>
                            {[5, 4, 3, 2, 1].map((rating, index) => (
                                <li key={index}>
                                    <div
                                        className={`flex justify-between w-32 items-center gap-1 py-2 hover:opacity-80 hover:text-primary cursor-pointer ${
                                            queryParams.rating == rating &&
                                            "text-primary pl-2 bg-black/5"
                                        }`}
                                        onClick={() =>
                                            searchFieldChanged("rating", rating)
                                        }
                                    >
                                        <Rating
                                            value={rating}
                                            size="small"
                                            readOnly={true}
                                            emptyIcon={<></>}
                                        />
                                        {index !== 0 && "& up"}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center mx-8">
                <button
                    className="btn btn-outline btn-primary rounded-sm w-full mb-4"
                    onClick={() => clearAll()}
                >
                    Clear all
                </button>
            </div>
        </>
    );
};

export default ProductsSidebar;
