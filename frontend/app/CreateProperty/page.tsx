'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProperty() {
  const BASE_URL = "http://localhost:8000/api";
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    location: "",
    price: 0,
    property_type: { name: "" },
    available_start: "",
    available_end: "",
    photos: [{ url: "", alt_text: "Room Image" }],
    rooms: [{ name: "", capacity: 3 }],
    amenities: [{ name: "" }],
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    parentField: string | null = null,
    index: number | null = null
  ) => {
    const { name, value } = e.target;

    if (parentField) {
      if (index !== null) {
        const updatedArray = [...(formState as any)[parentField]];
        updatedArray[index] = {
          ...updatedArray[index],
          [name]: value,
        };
        setFormState((prev) => ({
          ...prev,
          [parentField]: updatedArray,
        }));
      } else {
        // for property_type object
        setFormState((prev) => ({
          ...prev,
          [parentField]: {
            ...prev[parentField as keyof typeof formState],
            [name]: value,
          },
        }));
      }
    } else {
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to create a property");
      router.push('/login');
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/properties/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Failed to create property');
      }

      const data = await res.json();
      router.push(`/properties/${data.id}`);
    } catch (error) {
      console.error("Error submitting property:", error);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-3xl font-semibold py-5">Create a New Property</h1>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Property Title"
          className="w-full p-2 border border-gray-200 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border border-gray-200 rounded"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border border-gray-200 rounded"
          required
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="date"
          name="available_start"
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="date"
          name="available_end"
          onChange={handleChange}
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="url"
          onChange={(e) => handleChange(e, "photos", 0)}
          placeholder="Image URL"
          className="w-full p-2 border border-gray-200 rounded"
        />
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e, "rooms", 0)}
          placeholder="Room Name"
          className="w-full p-2 border border-gray-200 rounded"
          required
        />
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e, "amenities", 0)}
          placeholder="Amenity Name"
          className="w-full p-2 border border-gray-200 rounded"
          required
        />
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e, "property_type")}
          placeholder="Property Type Name"
          className="w-full p-2 border border-gray-200 rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Property
        </button>
      </form>
    </div>
  );
}
