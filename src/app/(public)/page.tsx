


// a section for most popular content
// a section to show some category links
// a section for newest arrivals

import { Suspense } from "react";
import PopularSection from "./PopularSection";

const PublicPage = ()=> {
    return (
        <div className="max-w-[1100px] m-auto mt-4">
            <div>
                <h1 className="text-large border-b-4 inline-block">Popular Items</h1>
            <Suspense fallback={<p>loading popular contents</p>}>
                <PopularSection/>
            </Suspense>
            </div>
            <div className="static h-[200px] bg-green-300">
                this is static content
            </div>
            <div className="static h-[200px] bg-green-400">
                this is static content
            </div>
            <div className="static h-[200px] bg-green-500">
                this is static content
            </div>
        </div>
    )
}

export default PublicPage;