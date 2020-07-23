import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

export const withSuspense = (Comment) => {
    return (props) => {
        return <Suspense fallback={<Preloader />} >
            <Comment {...props} />
        </Suspense>
    };
}