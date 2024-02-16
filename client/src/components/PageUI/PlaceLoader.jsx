export default function () {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8">
            {
                [1, 2, 3, 4, 5, 6].map(number => (
                    <div className="loading-container aspect-square relative"
                        key={number}
                    >
                        <div className="loading-animation aspect-square w-full rounded-2xl"></div>
                        <div className="loading-animation absolute md:w-20 md:h-10 w-10 h-5 md:bottom-24 bottom-4 left-7 rounded-2xl"></div>
                        <div className="loading-animation absolute md:w-20 md:h-10 w-10 h-5 md:bottom-10 bottom-1 left-7 rounded-2xl"></div>
                    </div>
                ))
            }
        </div>
    )
}