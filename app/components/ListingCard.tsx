import Link from "next/link";

interface ListingProps {
  _id: string;
  title: string;
  location: string;
  price: number;
  image: string;
}

export default function ListingCard({ _id, title, location, price, image }: ListingProps) {
  return (
    <Link href={`/listing/${_id}`} className="block">
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition duration-300">
        <img
          src={image || "https://placehold.co/600x400"}
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4 space-y-1">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="text-base font-semibold text-rose-500 mt-1">₹ {price.toLocaleString()} / night</p>
        </div>
      </div>
    </Link>
  );
}
