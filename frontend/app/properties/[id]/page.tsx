'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { CurrencyDollarIcon, MapPinIcon, HomeIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

interface Photo {
  id: number;
  url: string;
  alt_text: string;
}

interface PropertyType {
  id: number;
  name: string;
}

interface Amenity {
  id: number;
  name: string;
}

interface Host {
  username: string;
}

interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  photos: Photo[];
  host: Host;
  property_type: PropertyType;
  amenities: Amenity[];
}

export default function PropertyDetails() {
  const params = useParams();
  const id = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      axios.get(`http://localhost:8000/api/properties/${id}`, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        setProperty(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching property:", error);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          {property.photos[0] && (
            <Image
              className="rounded-lg shadow-lg"
              src={property.photos[0].url}
              alt={property.photos[0].alt_text}
              width={1000}
              height={600}
            />
          )}
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-2xl font-semibold text-gray-700">{property.title}</h1>
          <p className="text-gray-500 mt-2 text-sm">{property.description}</p>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <MapPinIcon className="h-6 mb-6 inline-block" />
            <span className="text-m font-light text-gray-700">{property.location}</span>
          </div>
          <div className="flex items-center">
            <CurrencyDollarIcon className="h-6 mb-1 inline-block" />
            <span className="text-xl font-light text-gray-700">{property.price} USD</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <UserCircleIcon className="h-6 mb-1 inline-block" />
            <span className="text-m font-light text-gray-700">Host: {property.host.username}</span>
          </div>
          <div className="mt-4">
            <HomeIcon className="h-6 mb-1 inline-block" />
            <span className="text-m font-light text-gray-700">Property Type: {property.property_type.name}</span>
          </div>
          <div className="mt-4">
            <InformationCircleIcon className="h-6 mb-1 inline-block" />
            <span className="text-m font-light text-gray-700">
              Amenities - {property.amenities.map((amenity) => (
                <span key={amenity.id} className="ml-2">{amenity.name}</span>
              ))}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 font-bold text-white px-4 py-2 rounded hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}




