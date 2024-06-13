import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextAreaInput from "@/Components/TextAreaInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "@/Components/Select";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenrePicker from "@/Components/GenrePicker";
import DynamicJson from "@/Components/DynamicJson";

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        type: "",
        image: "",
        description: "",
        price: "",
        in_stock: "",
        genre: [],
        weight: "",
        book: {
            authors: [],
            cover_type: "",
            publisher: "",
            pages: "",
            language: "",
            publication_date: "",
        },
        cd: {
            artists: [],
            collections: "",
            albums: [],
            record_label: [],
            track_list: [],
            videos: [],
            country: "",
            release_date: "",
        },
        dvd: {
            disc_type: "",
            director: [],
            actors: [],
            writer: [],
            runtime: "",
            language: "",
            country: "",
            release_date: "",
        },
    });

    const listGenres = [
        "Adventure",
        "Classics",
        "Fantasy",
        "Fiction",
        "Horror",
        "Mystery",
        "Thriller",
        "Romance",
        "Suspense",
        "Young",
        "Biography",
        "CookBook",
        "Essay",
        "Poetry",
        "Art",
        "Business",
        "Computer",
        "Education",
        "Engineering",
        "Heath",
        "Fitness",
        "Law",
        "Mathematics",
        "Medical",
        "Psychology",
        "Philosophy",
        "Social",
        "Sports",
        "Technology",
        "Drama",
        "LGBT",
        "Humor",
        "Economics",
        "Comics",
        "Graphic",
        "Hobbies",
        "Family",
        "Relationships",
        "Study",
        "Foreign",
        "Game",
        "Gardening",
        "Disciplines",
        "Music",
        "Nature",
        "Pet",
        "Travel",
        "Adult",
        "Aid",
        "Nonfiction",
        "Christian",
        "Classical",
        "Country",
        "Jazz",
        "Misc",
        "Rap",
        "Rock",
        "Soul",
        "Soundtrack",
        "Standard",
        "World",
        "Punk",
        "Blues",
        "Opera",
        "Symphony",
        "Garage",
        "EDM",
        "Beat",
        "House",
        "Electro",
        "Hop",
        "Pop",
    ];

    const language = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        it: "Italian",
        pt: "Portuguese",
        ru: "Russian",
        zh: "Chinese",
        ja: "Japanese",
        ko: "Korean",
        ar: "Arabic",
        nl: "Dutch",
        sv: "Swedish",
        no: "Norwegian",
        da: "Danish",
        fi: "Finnish",
        pl: "Polish",
        tr: "Turkish",
        el: "Greek",
        he: "Hebrew",
        th: "Thai",
        cs: "Czech",
        hu: "Hungarian",
        ro: "Romanian",
        sk: "Slovak",
        uk: "Ukrainian",
        bg: "Bulgarian",
        hr: "Croatian",
        sr: "Serbian",
        sl: "Slovenian",
        lv: "Latvian",
        lt: "Lithuanian",
        et: "Estonian",
        is: "Icelandic",
        ga: "Irish",
        mt: "Maltese",
        cy: "Welsh",
    };

    const onAddedTracklist = (object) => {
        setData("cd", {
            ...data.cd,
            track_list: [...data.cd.track_list, object],
        });
    };

    const onAddedVideo = (object) => {
        setData("cd", {
            ...data.cd,
            videos: [...data.cd.videos, object],
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <>
            <Head title="Products" />

            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex hidden justify-between">
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
                                        href={route("products.manage")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Manage products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("products.create")}
                                        className="font-semibold hover:text-amber-700 text-lg text-slate-800 dark:text-gray-200 leading-tight"
                                    >
                                        Create new product
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sm:hidden block">
                        <Link
                            href={route("products.manage")}
                            className="hover:bg-gray-100 dark:hover:bg-gray-700 p-4 rounded-full"
                        >
                            <FontAwesomeIcon icon={faArrowLeftLong} />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex justify-center">
                            <form
                                className="md:grid md:grid-cols-2 flex flex-col gap-6 w-full max-w-3xl"
                                onSubmit={onSubmit}
                            >
                                {/* name */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="name"
                                            value="Product name"
                                        />
                                    </div>
                                    <TextInput
                                        isFocused={true}
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="w-full"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        type="text"
                                        placeholder="Enter product name"
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                {/* image */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="image"
                                            value="Product image (less than 1024kB)"
                                        />
                                    </div>
                                    <TextInput
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="w-full file-input"
                                        onChange={(e) =>
                                            setData("image", e.target.files[0])
                                        }
                                    />
                                    <InputError message={errors.image} />
                                </div>
                                {/* desription */}
                                <div className="col-span-2">
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="description"
                                            value="Product description"
                                        />
                                    </div>
                                    <TextAreaInput
                                        id="description"
                                        name="description"
                                        className="w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    ></TextAreaInput>
                                    <InputError message={errors.description} />
                                </div>
                                {/* price */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="price"
                                            value="Product price (thousand VND)"
                                        />
                                    </div>
                                    <TextInput
                                        className="w-full"
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        placeholder="10"
                                    />
                                    <InputError message={errors.price} />
                                </div>
                                {/* quantity */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="stock"
                                            value="Quantity in stock"
                                        />
                                    </div>
                                    <TextInput
                                        className="w-full"
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={data.in_stock}
                                        onChange={(e) =>
                                            setData("in_stock", e.target.value)
                                        }
                                        placeholder="10"
                                    />
                                    <InputError message={errors.in_stock} />
                                </div>
                                {/* weight */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="weight"
                                            value="Weight (gram)"
                                        />
                                    </div>
                                    <TextInput
                                        className="w-full"
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        min="0"
                                        value={data.weight}
                                        onChange={(e) =>
                                            setData("weight", e.target.value)
                                        }
                                        placeholder="100"
                                    />
                                    <InputError message={errors.weight} />
                                </div>
                                {/* genres */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="genre"
                                            value="Product genre"
                                        />
                                    </div>
                                    <GenrePicker
                                        genres={listGenres}
                                        onSelect={(selectedGenres) => {
                                            setData("genre", selectedGenres);
                                        }}
                                        value={data.genre}
                                    />
                                    <InputError message={errors.genre} />
                                </div>
                                {/* Type */}
                                <div>
                                    <div className="mb-2 block">
                                        <InputLabel
                                            htmlFor="type"
                                            value="Product type"
                                        />
                                    </div>
                                    <Select
                                        className="w-full"
                                        id="type"
                                        name="type"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select type...
                                        </option>
                                        <option value="book">Book</option>
                                        <option value="cd">Compact disc</option>
                                        <option value="dvd">
                                            Digital video disc
                                        </option>
                                    </Select>
                                    <InputError message={errors.type} />
                                </div>

                                {/* Book info */}
                                {data.type === "book" && (
                                    <>
                                        {/* Book's authors */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="authors"
                                                    value="Book's authors"
                                                />
                                            </div>
                                            <TextInput
                                                id="authors"
                                                name="authors"
                                                value={data.book.authors}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("book", {
                                                        ...data.book,
                                                        authors:
                                                            e.target.value.split(
                                                                ","
                                                            ) ??
                                                            e.target.value.split(),
                                                    })
                                                }
                                                type="text"
                                                placeholder="Mr.John Doe, Ms.Jane Smith..."
                                            />
                                            <InputError
                                                message={errors["book.authors"]}
                                            />
                                        </div>
                                        {/* Book's cover type */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="cover_type"
                                                    value="Book's cover type"
                                                />
                                            </div>
                                            <Select
                                                id="cover_type"
                                                name="cover_type"
                                                value={data.book.cover_type}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("book", {
                                                        ...data.book,
                                                        cover_type:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select cover type...
                                                </option>
                                                <option value="paperback">
                                                    Paper back
                                                </option>
                                                <option value="hardcover">
                                                    Hard cover
                                                </option>
                                            </Select>
                                            <InputError
                                                message={
                                                    errors["book.cover_type"]
                                                }
                                            />
                                        </div>
                                        {/* Book's publisher */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="publisher"
                                                    value="Book's publisher"
                                                />
                                            </div>
                                            <TextInput
                                                id="publisher"
                                                name="publisher"
                                                value={data.book.publisher}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("book", {
                                                        ...data.book,
                                                        publisher:
                                                            e.target.value,
                                                    })
                                                }
                                                type="text"
                                                placeholder="Beacon PLC..."
                                            />
                                            <InputError
                                                message={
                                                    errors["book.publisher"]
                                                }
                                            />
                                        </div>
                                        {/* Book's language */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="language"
                                                    value="Book's language"
                                                />
                                            </div>
                                            <Select
                                                id="language"
                                                name="language"
                                                value={data.book.language}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("book", {
                                                        ...data.book,
                                                        language:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select language...
                                                </option>
                                                {Object.entries(language).map(
                                                    ([key, value]) => (
                                                        <option
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {value}
                                                        </option>
                                                    )
                                                )}
                                            </Select>
                                            <InputError
                                                message={
                                                    errors["book.language"]
                                                }
                                            />
                                        </div>
                                        {/* Book's pages */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="pages"
                                                    value="Number of pages"
                                                />
                                            </div>
                                            <TextInput
                                                className="w-full"
                                                id="pages"
                                                name="pages"
                                                type="number"
                                                min="0"
                                                value={data.book.pages}
                                                onChange={(e) =>
                                                    setData("book", {
                                                        ...data.book,
                                                        pages: e.target.value,
                                                    })
                                                }
                                                placeholder="100"
                                            />
                                            <InputError
                                                message={errors["book.pages"]}
                                            />
                                        </div>
                                        {/* Book's published date */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="publication_date"
                                                    value="Publication date"
                                                />
                                            </div>
                                            <TextInput
                                                className="w-full"
                                                id="publication_date"
                                                name="publication_date"
                                                type="date"
                                                value={
                                                    data.book.publication_date
                                                }
                                                onChange={(e) =>
                                                    setData("book", {
                                                        ...data.book,
                                                        publication_date:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors[
                                                        "book.publication_date"
                                                    ]
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                {data.type === "cd" && (
                                    <>
                                        {/* CD's videos */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="videos"
                                                    value="CD's videos"
                                                />
                                            </div>
                                            <DynamicJson
                                                keys={[
                                                    "title",
                                                    "uri",
                                                    "duration",
                                                    "description",
                                                ]}
                                                inputID="videos"
                                                onAdded={onAddedVideo}
                                                values={data.cd.videos}
                                            />
                                            <InputError
                                                message={errors["cd.videos"]}
                                            />
                                        </div>

                                        {/* CD's artists */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="artists"
                                                    value="CD's artists"
                                                />
                                            </div>
                                            <TextInput
                                                id="artists"
                                                name="artists"
                                                value={data.cd.artists}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("cd", {
                                                        ...data.cd,
                                                        artists:
                                                            e.target.value.split(
                                                                ","
                                                            ) ??
                                                            e.target.value.split(),
                                                    })
                                                }
                                                type="text"
                                                placeholder="John, Doe, Jane, Smith..."
                                            />
                                            <InputError
                                                message={errors["cd.artists"]}
                                            />
                                        </div>
                                        {/* CD's tracklist */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="track_list"
                                                    value="CD's track_list"
                                                />
                                            </div>
                                            <DynamicJson
                                                keys={[
                                                    "position",
                                                    "title",
                                                    "duration",
                                                ]}
                                                inputID="track_list"
                                                onAdded={onAddedTracklist}
                                                values={data.cd.track_list}
                                            />
                                            <InputError
                                                message={
                                                    errors["cd.track_list"]
                                                }
                                            />
                                        </div>
                                        {/* CD's record label */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="record_label"
                                                    value="CD's record_label"
                                                />
                                            </div>
                                            <TextInput
                                                id="record_label"
                                                name="record_label"
                                                value={data.cd.record_label}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("cd", {
                                                        ...data.cd,
                                                        record_label:
                                                            e.target.value.split(
                                                                ","
                                                            ) ??
                                                            e.target.value.split(),
                                                    })
                                                }
                                                type="text"
                                                placeholder="Sony Music, Warner Music..."
                                            />
                                            <InputError
                                                message={
                                                    errors["cd.record_label"]
                                                }
                                            />
                                        </div>
                                        {/* CD's collections */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="collections"
                                                    value="CD's collections"
                                                />
                                            </div>
                                            <TextInput
                                                id="collections"
                                                name="collections"
                                                value={data.cd.collections}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("cd", {
                                                        ...data.cd,
                                                        collections:
                                                            e.target.value,
                                                    })
                                                }
                                                type="text"
                                                placeholder="Best of, Vintage, Classic, Greatest hits..."
                                            />
                                            <InputError
                                                message={
                                                    errors["cd.collections"]
                                                }
                                            />
                                        </div>
                                        {/* CD's albums */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="albums"
                                                    value="CD's albums"
                                                />
                                            </div>
                                            <TextInput
                                                id="albums"
                                                name="albums"
                                                value={data.cd.albums}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("cd", {
                                                        ...data.cd,
                                                        albums:
                                                            e.target.value.split(
                                                                ","
                                                            ) ??
                                                            e.target.value.split(),
                                                    })
                                                }
                                                type="text"
                                                placeholder="Album 1, Album 2, Album 3..."
                                            />
                                            <InputError
                                                message={errors["cd.albums"]}
                                            />
                                        </div>
                                        {/* CD's release date */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="release_date"
                                                    value="Release date"
                                                />
                                            </div>
                                            <TextInput
                                                className="w-full"
                                                id="release_date"
                                                name="release_date"
                                                type="date"
                                                value={data.cd.release_date}
                                                onChange={(e) =>
                                                    setData("cd", {
                                                        ...data.cd,
                                                        release_date:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors["cd.release_date"]
                                                }
                                            />
                                        </div>
                                        {/* CD's country */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="country"
                                                    value="CD's country"
                                                />
                                            </div>
                                            <TextInput
                                                id="country"
                                                name="country"
                                                value={data.cd.country}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("cd", {
                                                        ...data.cd,
                                                        country: e.target.value,
                                                    })
                                                }
                                                type="text"
                                                placeholder="US, Brazil..."
                                            />
                                            <InputError
                                                message={errors["cd.country"]}
                                            />
                                        </div>
                                    </>
                                )}

                                {data.type === "dvd" && (
                                    <>
                                        {/* DVD's director */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="director"
                                                    value="DVD's director"
                                                />
                                            </div>
                                            <TextInput
                                                id="director"
                                                name="director"
                                                value={data.dvd.director}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        director:
                                                            e.target.value,
                                                    })
                                                }
                                                type="text"
                                                placeholder="Dolly Carrol..."
                                            />
                                            <InputError
                                                message={errors["dvd.director"]}
                                            />
                                        </div>
                                        {/* DVD's disc type */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="disc_type"
                                                    value="DVD's disc type"
                                                />
                                            </div>
                                            <Select
                                                id="disc_type"
                                                name="disc_type"
                                                value={data.dvd.disc_type}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        disc_type:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="" disabled>
                                                    Select disc type...
                                                </option>
                                                <option value="Blu-ray">
                                                    Blu-ray
                                                </option>
                                                <option value="HD-DVD">
                                                    HD DVD
                                                </option>
                                            </Select>
                                            <InputError
                                                message={
                                                    errors["dvd.disc_type"]
                                                }
                                            />
                                        </div>
                                        {/* DVD's actors */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="actors"
                                                    value="DVD's actors"
                                                />
                                            </div>
                                            <TextInput
                                                id="actors"
                                                name="actors"
                                                value={data.dvd.actors}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        actors:
                                                            e.target.value.split(
                                                                ","
                                                            ) ??
                                                            e.target.value.split(),
                                                    })
                                                }
                                                type="text"
                                                placeholder="Dolly Carrol..."
                                            />
                                            <InputError
                                                message={errors["dvd.actors"]}
                                            />
                                        </div>
                                        {/* DVD's writer */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="writer"
                                                    value="DVD's writer"
                                                />
                                            </div>
                                            <TextInput
                                                id="writer"
                                                name="writer"
                                                value={data.dvd.writer}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        writer:
                                                            e.target.value.split(
                                                                ","
                                                            ) ??
                                                            e.target.value.split(),
                                                    })
                                                }
                                                type="text"
                                                placeholder="Semon..."
                                            />
                                            <InputError
                                                message={errors["dvd.writer"]}
                                            />
                                        </div>
                                        {/* DVD's language */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="language"
                                                    value="DVD's language"
                                                />
                                            </div>
                                            <TextInput
                                                id="language"
                                                name="language"
                                                type="text"
                                                value={data.dvd.language}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        language:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="English, Spanish..."
                                            />
                                            <InputError
                                                message={errors["dvd.language"]}
                                            />
                                        </div>
                                        {/* DVD's runtime */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="runtime"
                                                    value="DVD's runtime (minutes)"
                                                />
                                            </div>
                                            <TextInput
                                                className="w-full"
                                                id="runtime"
                                                name="runtime"
                                                type="number"
                                                min="0"
                                                value={data.dvd.runtime}
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        runtime: e.target.value,
                                                    })
                                                }
                                                placeholder="60"
                                            />
                                            <InputError
                                                message={errors["dvd.runtime"]}
                                            />
                                        </div>
                                        {/* DVD's country */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="country"
                                                    value="DVD's country"
                                                />
                                            </div>
                                            <TextInput
                                                id="country"
                                                name="country"
                                                value={data.dvd.country}
                                                className="w-full"
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        country: e.target.value,
                                                    })
                                                }
                                                type="text"
                                                placeholder="US, Brazil..."
                                            />
                                            <InputError
                                                message={errors["dvd.country"]}
                                            />
                                        </div>
                                        {/* DVD's release date */}
                                        <div>
                                            <div className="mb-2 block">
                                                <InputLabel
                                                    htmlFor="release_date"
                                                    value="Release date"
                                                />
                                            </div>
                                            <TextInput
                                                className="w-full"
                                                id="release_date"
                                                name="release_date"
                                                type="date"
                                                value={data.dvd.release_date}
                                                onChange={(e) =>
                                                    setData("dvd", {
                                                        ...data.dvd,
                                                        release_date:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <InputError
                                                message={
                                                    errors["dvd.release_date"]
                                                }
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center justify-end gap-2 col-span-2">
                                    <button
                                        className="btn btn-outline rounded-2xl btn-success"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Submit
                                    </button>
                                    <Link
                                        href={route("products.manage")}
                                        className="btn btn-outline rounded-2xl btn-warning"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Create.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user} children={page} />
);

export default Create;
