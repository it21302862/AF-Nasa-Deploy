import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";
import ModalImage from "react-modal-image";
import { useNavigate } from "react-router-dom";

const MARSImageWithContext = ({ apiKey, earthDate, sol, page, camera }) => {
  const [apodData, setApodData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?&api_key=${apiKey}`;

        if (sol && camera && page && earthDate) {
          apiUrl += `&sol=${sol}&camera=${camera}&page=${page}&earth_date=${earthDate}`;
        } else if (sol && camera && page) {
          apiUrl += `&sol=${sol}&camera=${camera}&page=${page}`;
        } else if (sol && camera && earthDate) {
          apiUrl += `&sol=${sol}&camera=${camera}&earth_date=${earthDate}`;
        } else if (sol && page && earthDate) {
          apiUrl += `&sol=${sol}&page=${page}&earth_date=${earthDate}`;
        } else if (sol && camera) {
          apiUrl += `&sol=${sol}&camera=${camera}`;
        } else if (sol && page) {
          apiUrl += `&sol=${sol}&page=${page}`;
        } else if (earthDate) {
          apiUrl += `&earth_date=${earthDate}`;
        } else if (sol) {
          apiUrl += `&sol=${sol}`;
        }

        const response = await axios.get(apiUrl);
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
  }, [apiKey, earthDate, sol, page, camera]);

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
                {/* <ModalImage
              small={apod.url}
              large={apod.hdurl}
              alt={apod.title}
              hideDownload={true}
              hideZoom={true}
              hideRotate={true}
              style={{ objectFit: "cover" }}
              className="h-[200px] w-full object-cover rounded-t-[20px] "
              
            /> */}
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
                </div>
              </div>
            </div>
          </div>

            // <Card>
            //   <CardContent>
            //     <Typography gutterBottom variant="h6">
            //       {photo.camera.full_name}
            //     </Typography>
            //     <ModalImage
            //       small={photo.img_src}
            //       large={photo.img_src}
            //       alt="Mars Rover Image"
            //       hideDownload={true}
            //       hideZoom={false}
            //       hideRotate={false}
            //       style={{ width: "100%", height: "200px", objectFit: "cover" }}
            //     />
            //     <Typography variant="body2" color="textSecondary">
            //       Sol: {photo.sol}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Earth Date: {photo.earth_date}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Landing Date: {photo.rover.landing_date}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Launch Date: {photo.rover.launch_date}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Total Photos: {photo.rover.total_photos}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Rover Name: {photo.rover.name}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Camera: {photo.camera.name}
            //     </Typography>
            //     <Typography variant="body2" color="textSecondary">
            //       Status: {photo.rover.status}
            //     </Typography>
            //   </CardContent>
            // </Card>
          
        ))
      )}
    </div>
  );
};

export default MARSImageWithContext;
