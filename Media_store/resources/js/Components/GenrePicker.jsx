import { faCheck, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Combobox, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

const GenrePicker = ({ value = [], genres, onSelect = () => {} }) => {
    const [selected, setSelected] = useState(value);
    const [query, setQuery] = useState("");

    const listGenres =
        query === ""
            ? genres
            : genres.filter((genre) =>
                  genre.toLowerCase().includes(query.toLowerCase())
              );

    const onSelected = (genres) => {
        setSelected(genres);
        onSelect(genres);
    };
    return (
        <>
            <Combobox value={selected} onChange={onSelected} multiple>
                <div className="relative mt-1">
                    <div className="relative w-full rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ">
                        <Combobox.Input
                            className={
                                "pt-3 pb-2 border-gray-300 dark:border-gray-700 focus:ring-indigo-300 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 block w-full rounded-md mt-1 sm:text-sm"
                            }
                            placeholder="Select genres..."
                            displayValue={(genre) => {
                                return genre.length > 0 ? genre.toString() : "";
                            }}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Combobox.Button
                            className={
                                "absolute inset-y-0 right-0 flex items-center px-3"
                            }
                        >
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className="w-6"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options
                            className={
                                "absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg max-h-40 ring-1 ring-black/5 overflow-auto focus:outline-none sm:text-sm"
                            }
                        >
                            {listGenres.length === 0 && query !== "" ? (
                                <div className="block px-4 py-2 text-gray-700 dark:text-gray-300">
                                    No results found
                                </div>
                            ) : (
                                listGenres.map((genre, index) => (
                                    <Combobox.Option
                                        key={index}
                                        value={genre}
                                        className={({ active }) =>
                                            `${
                                                active
                                                    ? "bg-teal-600 text-white"
                                                    : ""
                                            } cursor-default select-none relative py-2 pl-3 pr-9`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`${
                                                        selected
                                                            ? "font-semibold italic"
                                                            : "font-normal"
                                                    } block truncate ml-10`}
                                                >
                                                    {genre}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`${
                                                            active
                                                                ? ""
                                                                : "text-teal-600"
                                                        } absolute inset-y-0 left-0 flex items-center pl-4`}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className="w-5"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </>
    );
};

export default GenrePicker;
