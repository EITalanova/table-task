import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export const Layout = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="spiner">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};
