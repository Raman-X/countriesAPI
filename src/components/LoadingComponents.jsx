import React from "react";

const LoadingComponents = () => {
  const loadingSkeleton = () => {
    return (
      <div className="flex w-66 flex-col gap-8 pt-8">
        <div className="skeleton h-36 w-full"></div>
        <div className="skeleton h-4 w-32"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    );
  };
  return (
    <div
      className={
        "grid sm:grid-cols-2 [@media(min-width:860px)]:grid-cols-3 gap-8 justify-items-center"
      }
    >
      {loadingSkeleton()} {loadingSkeleton()} {loadingSkeleton()}
      {loadingSkeleton()} {loadingSkeleton()} {loadingSkeleton()}
    </div>
  );
};

export default LoadingComponents;
