import ListingDetail from "@/app/components/ListingDetail";
import api from "@/app/lib/api";


export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ Get param first
  const res = await api.get(`/listings/${id}`);
  const listing = res.data;

  return <ListingDetail listing={listing} />;
}