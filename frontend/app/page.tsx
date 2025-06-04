import Navbar from "../components/Navbar";
import Card from "../components/Card";

interface Photo {
  id: string | number;
  url: string; // Changed from 'urls' to 'url'
  alt_text: string;
}

interface Hotel {
  id: string | number;
  photos?: Photo[];
  location: string;
  host: {
    username: string;
  };
  title: string;
  available_start: string;
  available_end: string;
  price: number;
}

export default async function Home() {
  const res = await fetch("http://localhost:8000/api/properties", {
    cache: "no-store", // use 'force-cache' or 'no-store' based on need
  });
  const hotels: Hotel[] = await res.json();

  return (
    <div>
      <div className="mx-5 my-7">
        <h1 className="text-3xl font-semibold mb-3">Properties</h1>
        <section className="flex flex-wrap">
          {hotels.map((hotel) => (
            <Card key={hotel.id} {...hotel} />
          ))}
        </section>
      </div>
    </div>
  );
}