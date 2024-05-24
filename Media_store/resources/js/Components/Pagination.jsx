import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <nav className="text-center my-2">
            {links.map((link, index) => (
                <Link
                    key={index}
                    preserveScroll
                    href={link.url || ""}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={
                        "inline-block px-3 py-2 rounded-lg text-gray-600 text-xs " +
                        (link.active ? "bg-amber-400 " : " ") +
                        (!link.url
                            ? "!text-gray-300 cursor-not-allowed "
                            : "hover:bg-amber-400 ")
                    }
                ></Link>
            ))}
        </nav>
    );
}
