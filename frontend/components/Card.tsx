import Image from "next/image";

interface Photo {
  id: string | number;
  urls: string;
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
  return (
    <div className="w-1/4">
      <a href={`/properties/${id}`} className="m-3 rounded-lg hover:cursor-pointer block">
        {photos?.map((photo) => (
          <Image
            className="rounded-lg"
            key={photo.id}
            src={photo.urls}
            alt={photo.alt_text}
            width={300}
            height={200}
          />
        ))}
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
