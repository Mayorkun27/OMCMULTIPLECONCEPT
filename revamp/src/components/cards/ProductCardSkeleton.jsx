import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className='transition-all duration-300 rounded-xl group min-h-80 overflow-hidden flex flex-col items-start relative border border-gray-200 p-3'>
      <div className="bg-gray-200 animate-pulse rounded-t-lg h-[250px] w-full"></div>
      <div className="text-start w-full mt-2 p-3 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse pt-2"></div>
        <div className="flex items-center gap-2 uppercase">
          <span
            className={`w-6 h-6 animate-pulse bg-gray-200 rounded-full`}
          ></span>
          <p className='h-3 bg-gray-200 rounded w-1/2 animate-pulse'></p>
        </div>
      </div>
      <div className="w-full p-3">
        <div className='h-10 bg-gray-200 rounded-md w-full animate-pulse'></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
