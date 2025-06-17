"use client";

import { useEffect, useState } from "react";
import api from "./lib/api";
import ListingCard from "./components/ListingCard";
import Navbar from "./components/Navbar";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchListings = async () => {
    try {
      const res = await api.get("/listings", {
        params: {
          location,
          minPrice,
          maxPrice,
        },
      });
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSearch = () => {
    fetchListings();
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">
          Find Your Perfect Stay
        </h1>

        {/* Airbnb-Style Search Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-100 p-4 rounded-full shadow-sm mb-8">
          <input
            type="text"
            placeholder="Where to?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 px-5 py-3 bg-white text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder-gray-500"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-36 px-5 py-3 bg-white text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder-gray-500"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-36 px-5 py-3 bg-white text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 placeholder-gray-500"
          />
          <button
            onClick={handleSearch}
            className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition"
          >
            Search
          </button>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing: any) => (
            <ListingCard
              key={listing._id}
              {...listing}
              image={listing.image || listing.images?.[0]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
