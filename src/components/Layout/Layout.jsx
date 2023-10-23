import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Suspense fallback={<div>gggg</div>}>
        <Outlet />
      </Suspense>
    </>
  );
};
