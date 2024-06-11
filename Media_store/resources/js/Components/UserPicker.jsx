import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useState } from "react";

const UserPicker = ({ value, options, onSelect }) => {
    const [selected, setSelected] = useState(value);
    const [query, setQuery] = useState("");

    const listPeople =
        query === ""
            ? options
            : options.filter((person) =>
                  person.name.toLowerCase().includes(query.toLowerCase())
              );

    const onSelected = (people) => {
        setSelected(people);
        onSelect(people);
    };
    return (
        <>
            <Combobox value={selected} onChange={onSelected} multiple>
                <div className="relative mt-1">
                    <div className="relative w-full rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm ">
                        <Combobox.Input
                            className={
                                "border-gray-300 dark:border-gray-700 bg-gray-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-indigo-300 focus:border-indigo-500 dark:focus:ring-indigo-600 dark:focus:border-indigo-600 block w-full rounded-md shadow-sm mt-1 sm:text-sm"
                            }
                            placeholder="Select users..."
                            displayValue={(people) => {
                                return people.length > 0
                                    ? `${people.length} users selected`
                                    : "";
                            }}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Combobox.Button
                            className={
                                "absolute inset-y-0 right-0 flex items-center px-3"
                            }
                        >
                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
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
                                "absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 rounded-md shadow-lg max-h-60 ring-1 ring-black/5 overflow-auto focus:outline-none sm:text-sm"
                            }
                        >
                            {listPeople.length === 0 && query !== "" ? (
                                <div className="block px-4 py-2 text-gray-700 dark:text-gray-300">
                                    No results found
                                </div>
                            ) : (
                                listPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        value={person}
                                        className={({ active }) =>
                                            `${
                                                active
                                                    ? "text-gray-200 dark:text-white bg-teal-600"
                                                    : "text-gray-800 dark:text-gray-400"
                                            } cursor-default select-none relative py-2 pl-3 pr-9`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`${
                                                        selected
                                                            ? "font-semibold text-white"
                                                            : "font-normal"
                                                    } block truncate ml-10`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`${
                                                            active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        } absolute inset-y-0 left-0 flex items-center pl-4`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" />
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
            {selected && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {selected.map((person) => (
                        <span
                            key={person.id}
                            className="bagde badge-primary gap-2 rounded-md px-2 py-1 text-nowrap"
                        >
                            {person.name}
                        </span>
                    ))}
                </div>
            )}
        </>
    );
};

export default UserPicker;
