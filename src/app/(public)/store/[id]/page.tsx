import { baseUrl } from "@/shared/urls";
import FollowButton from "./FollowButton";
import ProductsContainer from "@/app/(seller)/seller/store/ProductsContainer";
import Pages from "../../product/category/[category]/Pagination";
import ProductContainer from "../../product/category/[category]/ProductContainer";
import { getToAndFrom } from "@/helpers/toAndFrom";
import SearchLoadingStateUpdate from "../../search/SearchLoadingStateUpdate";

type Review = {
  rating: number;
};

type Product = {
  reviews: Review[];
};
type Follower = {
  id: string;
};

type Store = {
  id: string;
  name: string;
  description: string;
  followers: Follower[];
  products: Product[];
};

const StorePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string };
}) => {
  // fetch store data

  const storeResult = await fetch(`${baseUrl}/seller/store/${params.id}`, {
    next: { tags: ["userStoreInformation"] },
  });
  const storeJson = await storeResult.json();

  const store: Store = storeJson.data;

  const productsResult = await fetch(
    `${baseUrl}/product/getfromstore/${params.id}?page=${searchParams.page}`, {cache: 'no-store'}
  );
  const productsJson = await productsResult.json();

  const { data, meta } = productsJson;

  const { to, from, total } = getToAndFrom(meta);
  // fetch products of that store
  return (
    <div className="max-w-[1100px] m-auto">
      {/* a card to show store information */}
      {/* name, description, rating, a follow button */}

      <div className="bg-indigo-500 text-white flex flex-col items-center justify-center p-3 rounded-md relative my-4">
        <h2 className="text-lg">{store.name}</h2>
        <p>{store?.followers?.length} Followers</p>
        <p className="text-sm">{store.description}</p>

        <FollowButton followers={store.followers} storeId={store.id} />
      </div>

      {/* showing what information */}
      <p className="text-black dark:text-gray-400">
        Showing {from} to {to} of {total}
      </p>

      {/* to update page loading */}
      <SearchLoadingStateUpdate data={data} date={new Date().getTime()} />
      {/* all the product cards */}
      <ProductContainer products={data} />
      {/* pagination if necessary */}
      {
        meta.totalPage > 1 &&
      <div className="flex justify-center my-4">
        <Pages meta={meta} />
      </div>
      }
    </div>
  );
};

export default StorePage;
