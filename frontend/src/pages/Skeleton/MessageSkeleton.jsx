import React from 'react';

const MessageSkeleton = () => {
    return (
        <div className='w-[100%] h-[100%] flex flex-col gap-4 px-[3%] py-[1%] bg-white relative'>

            {Array.from({ length: 11 }).map((_, index) => (
                <div key={index} className={`flex w-52 flex-col gap-4 ${index % 2 === 0 ? 'self-start' : 'self-end'}`}>
                    <div className={`flex items-center gap-4 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
                        <div className="skeleton h-12 w-12 shrink-0 rounded-full animate-pulse bg-gray-700"></div> {/* Circle */}
                        <div className="flex flex-col gap-2">
                            <div className="skeleton h-3 w-28 animate-pulse bg-gray-600"></div>{/* Lines */}
                            <div className="skeleton h-3 w-28 animate-pulse bg-gray-600"></div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default MessageSkeleton;
