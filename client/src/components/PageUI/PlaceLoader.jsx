export default function () {
    return (
        <div className="grid grid-cols-1 p-2 md:p-0 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mt-8">
            {
                [1, 2, 3, 4, 5, 6].map(number => (
                    <>
                        <div className="flex flex-col gap-2 justify-start loading-container aspect-square relative"
                            key={number}
                        >
                            <div className="loading-animation aspect-square w-full rounded-2xl"></div>
                            <div className="loading-animation aspect-square w-[80%] h-10 rounded-2xl"></div>
                        </div>
                    </>
                ))
            }
        </div>
    )
}