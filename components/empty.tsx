import Image from "next/image";

interface EmptyProps {
    label: String
}


const Empty = ({ label }: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72">
                <Image
                    src="/empty.png"
                    alt="Empty"
                    fill

                />
            </div>
        </div>
    );
}

export default Empty;