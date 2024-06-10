import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    const numberOfSideLinks = 1; // Number of links to show on each side of the current page

    // Find the active page index
    const currentPageIndex = links.findIndex((link) => link.active);
    const currentPage = links[currentPageIndex].label;

    // Function to determine if the link should be included
    const shouldShowLink = (link, index) => {
        const label = link.label;
        return (
            // Always include the first and last page links
            index === 0 ||
            index === links.length - 1 ||
            // Include current page and adjacent pages
            (index >= currentPageIndex - numberOfSideLinks &&
                index <= currentPageIndex + numberOfSideLinks) ||
            // Include the first and last adjacent page links
            label == 1 ||
            label == currentPage ||
            label == links.length - 2
        );
    };

    const processedLinks = [];
    let lastIndex = 0;

    links.forEach((link, index) => {
        if (shouldShowLink(link, index)) {
            if (index - lastIndex > 1) {
                // Add ellipsis if there is a gap between the last included link and the current link
                processedLinks.push({ label: "...", url: null });
            }
            processedLinks.push(link);
            lastIndex = index;
        }
    });

    return (
        <nav className="text-center my-2">
            {processedLinks.map((link, index) => (
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
