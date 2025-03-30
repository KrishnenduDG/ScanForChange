import React, { useRef, useState } from "react";
import axios from "axios";

export default function Scan() {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const useCameraRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [waste, setWaste] = useState(null);

  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No image selected!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    const token = localStorage.getItem("token");

    try {
      // **Step 1: Upload Image**
      const uploadResponse = await axios.post(
        "https://scanforchange.onrender.com/api/utils/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );

      if (uploadResponse.status === 200) {
        const uploadedImageUrl = uploadResponse.data.url;
        alert("Image uploaded successfully!");
        setLoading(false);

        // **Step 2: Send Image URL & Location Data**
        await sendImageWithLocation(uploadedImageUrl);
      } else {
        alert("Image upload failed! Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert(error.response?.data?.message || "Server Error");
      setLoading(false);
    }
  };

  const sendImageWithLocation = async (imageUrl) => {
    setScanning(true);

    const token = localStorage.getItem("token");
    const payload = {
      img_url: imageUrl,
      location: [23, 33], // Example static coordinates, replace with actual GPS location
    };

    try {
      const response = await axios.post(
        "https://scanforchange.onrender.com/api/waste/register",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      console.log("Location Data Response:", response.data);
      alert("Image & location data sent successfully!");
      setScanning(false);
      setWaste(response.data.data); // Store waste data
    } catch (error) {
      console.error("Error sending location data:", error);
      alert(error.response?.data?.message || "Server Error");
      setScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h2 className="text-2xl font-bold mt-5 mb-5">Scan</h2>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageCapture}
        className="hidden"
        ref={useCameraRef}
      />

      {/* Open Camera Button */}
      {!image ? (
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => useCameraRef.current && useCameraRef.current.click()}
        >
          Open Camera
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="Captured"
            className="mt-2 rounded-lg shadow-lg w-[300px] h-[300px] object-cover"
          />
            <>
    {!waste && (
      <>
         <button
            className={`px-6 py-3 rounded-lg shadow-md mt-5 text-white ${
              loading || scanning ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={handleUpload}
            disabled={loading || scanning}
          >
            {loading ? "Uploading..." : scanning ? "Scanning..." : "Upload Image"}
          </button>
      </>
    )}
  </>
         
        </div>
      )}

      {/* Waste Detection Results */}
      {waste && (
        <div className="bg-gray-100 mt-10 w-full max-w-lg p-5 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-3 text-center">♻️ Waste Detected</h2>

          {/* Categories Found */}
          {waste.categories_found?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Categories:</h3>
              <ul className="list-disc ml-5 mt-2">
                {waste.categories_found.map((category, index) => (
                  <li key={index} className="text-gray-700">{category}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Wastes Found */}
          {waste.wastes_found?.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Wastes Found:</h3>
              <ul className="list-disc ml-5 mt-2">
                {waste.wastes_found.map((wasteItem, index) => (
                  <li key={index} className="text-gray-700">{wasteItem}</li>
                ))}
              </ul>
            </div>
          )}

          {waste.points > 0 && (
            <p>Total earned points : {waste.points}</p>
          )}
        </div>
      )}
    </div>
  );
}
