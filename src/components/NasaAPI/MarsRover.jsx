import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import ModalImage from "react-modal-image";
import { useNavigate } from "react-router-dom";

const MARSImageWithContext = ({ apiKey, earthDate, sol, page, camera ,roverName }) => {
  const [apodData, setApodData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?&api_key=${apiKey}`;
        if (sol) {
          apiUrl += `&sol=${sol}`;
          if (camera) {
            apiUrl += `&camera=${camera}`;
          }
          if (page) {
            apiUrl += `&page=${page}`;
          }
          if (earthDate) {
            apiUrl += `&earth_date=${earthDate}`;
          }
        } else if (earthDate) {
          apiUrl += `&earth_date=${earthDate}`;
        }

        const response = await axios.get(apiUrl);
        console.log(response);

        if (Array.isArray(response.data.photos)) {
          setApodData(response.data.photos);
        } else {
          setApodData([response.data.photos]);
        }
      } catch (error) {
        console.error("Error fetching Mars rover photos:", error);
        setApodData([]);
      }
    };

    fetchData();
  }, [apiKey, earthDate, sol, page, camera ,roverName]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      {apodData.length === 0 ? (
        <Typography variant="body1" align="center">
          No Mars rover photos available
        </Typography>
      ) : (
        apodData.map((photo, index) => (
          <div key={index} className="w-full h-full">
            <div
              className="cursor-pointer bg-black border border-gray-600 rounded-[20px]"
              onClick={() => handleSeeMoreClick(apod)}
            >
              <div className="p-0">
                <img
                  src={photo.img_src}
                  alt="{photo.camera.full_name}"
                  className="h-[200px] w-full object-cover rounded-t-[20px]"
                />
                <div className="p-4">
                  <Typography variant="h6" component="div">
                    {photo.camera.full_name}
                  </Typography>
                  <div className="flex flex-row gap-3 items-center">
                    <div className="text-[14px]">Sol: {photo.sol}</div>
                    <div className="">
                      <div className="w-[6px] h-[5px] bg-white rounded-full"></div>
                    </div>
                    <div className="text-[14px]">{photo.earth_date}</div>
                  </div>
                  <div className="text-[14px]">Landing date: {photo.rover.landing_date}</div>
                  <div className="text-[14px]">Launch date: {photo.rover.launch_date}</div>
                  <div className="text-[14px]">Total photos: {photo.rover.total_photos}</div>
                  <div className="text-[14px]" style={{ color: 'green' }}>Status: {photo.rover.status}</div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MARSImageWithContext;
