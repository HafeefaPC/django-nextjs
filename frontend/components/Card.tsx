"use client";
import Image from "next/image";
import { useState } from "react";

interface Photo {
  id: string | number;
  url: string; // Changed from 'urls' to 'url'
  alt_text: string;
}

interface CardProps {
  id: string | number;
  photos?: Photo[];
  location?: string;
  host: {
    username: string;
  };
  title: string;
  available_start: string;
  available_end: string;
  price: number;
}

export default function Card({
  id,
  photos,
  location,
  host,
  title,
  available_start,
  available_end,
  price,
}: CardProps) {
  const [imageError, setImageError] = useState(false);
  
  const defaultImage = "https://q-xx.bstatic.com/xdata/images/hotel/max500/60626094.jpg?k=7bce74b3dc14f5542f74d26be7ec1e94e2df47c6fcee3c3db54331b11cf8523c&o=";
  
  // Get the first photo or use default
  const displayImage = !imageError && photos && photos[0] 
    ? photos[0].url 
    : defaultImage;
    
  const displayAlt = photos && photos[0] 
    ? photos[0].alt_text 
    : "Property image";

  return (
    <div className="w-1/4">
      <a href={`/properties/${id}`} className="m-3 rounded-lg hover:cursor-pointer block">
        <Image
          className="rounded-lg object-cover"
          src={displayImage}
          alt={displayAlt}
          width={300}
          height={200}
          onError={() => setImageError(true)}
        />
        <p className="font-semibold">{location}</p>
        <p>Stay with {host.username}</p>
        <p>{title}</p>
        <p>
          {available_start} - {available_end}
        </p>
        <p className="font-bold">{price}$/night</p>
      </a>
    </div>
  );
}