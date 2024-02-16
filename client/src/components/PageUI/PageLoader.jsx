export default function () {
    return (
        <div className="w-full h-screen">
            <div className="flex flex-col justify-start gap-4 w-full h-full relative">
                <div className="loading-animation aspect-square w-full h-[400px] rounded-2xl"></div>
                <div className="loading-animation aspect-square w-full h-[50px] rounded-2xl"></div>
                <div className="loading-animation aspect-square w-[80%] h-[50px] rounded-2xl"></div>
                <div className="loading-animation aspect-square w-[60%] h-[50px] rounded-2xl"></div>
                <div className="loading-animation aspect-square w-[30%] h-[50px] rounded-2xl"></div>
            </div>
        </div>
    )
}