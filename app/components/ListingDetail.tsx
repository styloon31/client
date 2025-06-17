"use client";

import { useContext, useState } from "react";
import { addDays } from "date-fns";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AuthContext } from "../context/AuthContext";
import api from "@/app/lib/api";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "./Navbar";

export default function ListingDetail({ listing }: { listing: any }) {
  const { token } = useContext(AuthContext);
  const stripePromise = loadStripe("pk_test_51RZWyOQsSTQ00jF40oIkQn8TQE2ZclpNhn1CW7NeYspd8YFGmWzA4xttqQ2nYBJIPS79K24zMx35k0YjzY64emV400DiWPWV7W");

  const [bookingRange, setBookingRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>(
    listing.images?.[0] || listing.image || "https://placehold.co/600x400"
  );

  const handleBooking = async () => {
    const range = bookingRange[0];

    if (!token) {
      setMessage("⚠️ Please login first to book.");
      return;
    }

    if (!range.startDate || !range.endDate) {
      setMessage("⚠️ Please select a valid date range.");
      return;
    }

    try {
      const stripe = await stripePromise;

      const res = await api.post(
        "/payments/create-checkout-session",
        {
          listing,
          startDate: range.startDate.toISOString(),
          endDate: range.endDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await stripe?.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      console.error(err);
      setMessage("❌ Payment failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage}
            alt={listing.title}
            className="rounded-2xl w-full h-[400px] object-cover shadow mb-4"
          />
          <div className="flex gap-2 overflow-x-auto">
            {(listing.images || []).map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`Image ${i + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-24 object-cover rounded-lg cursor-pointer transition border-2 ${
                  selectedImage === img ? "border-rose-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{listing.title}</h1>
          <p className="text-gray-600">{listing.description}</p>
          <p className="text-gray-500">
            📍 <span className="font-medium">{listing.location}</span>
          </p>
          <p className="text-lg font-semibold text-rose-600">
            ₹ {listing.price.toLocaleString()} / night
          </p>

          <div>
            <h3 className="text-md font-semibold mb-2">Select Booking Dates:</h3>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setBookingRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={bookingRange}
              className="rounded-lg border"
            />
          </div>

          <button
            className="mt-4 bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg shadow transition"
            onClick={handleBooking}
          >
            Book Now
          </button>

          {message && (
            <p className="text-red-500 font-medium mt-2 text-sm">{message}</p>
          )}
        </div>
      </div>
    </>
  );
}
