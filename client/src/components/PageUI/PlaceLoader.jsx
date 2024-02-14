export default function () {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8">
            {
                [1, 2, 3, 4, 5, 6].map(number => (
                    <div className="loading-container aspect-square relative"
                        key={number}
                    >
                        <div className="loading-animation aspect-square w-full rounded-2xl"></div>
                        <div className="loading-animation absolute w-[200px] h-10 bottom-24 left-7 rounded-2xl"></div>
                        <div className="loading-animation absolute w-[200px] h-10 bottom-10 left-7 rounded-2xl"></div>
                    </div>
                ))
            }
        </div>
    )
}