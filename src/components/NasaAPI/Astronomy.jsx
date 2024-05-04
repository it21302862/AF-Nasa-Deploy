import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button, Modal } from "@mui/material";
import ModalImage from "react-modal-image";
import { useNavigate } from "react-router-dom";

const APODImage = ({ apiKey, date, startDate, endDate, count, thumbs }) => {
  const [apodData, setApodData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedApod, setSelectedApod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

        if (date) {
          apiUrl += `&date=${date}`;
        } else if (startDate && endDate) {
          apiUrl += `&start_date=${startDate}&end_date=${endDate}`;
        } else if (count) {
          apiUrl += `&count=${count}`;
        }

        const response = await axios.get(apiUrl);
        if (Array.isArray(response.data)) {
          setApodData(response.data);
        } else {
          setApodData([response.data]);
        }
      } catch (error) {
        console.error("Error fetching APOD data:", error);
        setApodData([]);
      }
    };

    fetchData();
  }, [apiKey, date, startDate, endDate, count, thumbs]);

  const handleSeeMoreClick = (apod) => {
    setSelectedApod(apod);
  };

  const handleCloseModal = () => {
    setSelectedApod(null);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  console.log(apodData);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
      {apodData.length === 0 ? (
        <Typography variant="body1" align="center">
          No APOD data available
        </Typography>
      ) : (
        apodData.map((apod) => (
          <div key={apod.date} className="w-full h-full" >
          <div className="cursor-pointer bg-black border border-gray-600 rounded-[20px]"  onClick={() => handleSeeMoreClick(apod)}>
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
            <img src={apod.url} alt="{apod.title}" className="h-[200px] w-full object-cover rounded-t-[20px]"/>
            <div className="p-4">
            <Typography  variant="h6" component="div">
                {apod.title}
              </Typography>
              <div className="flex flex-row gap-3 items-center">
                <div className="text-[14px]">{apod.date}</div>
                <div className="">
                  <div className="w-[6px] h-[5px] bg-white rounded-full"></div>
                </div>
                <div className="text-[14px]">{apod.copyright}</div>
              </div>
              </div>
            </div>
             
          </div>
          </div>
        ))
      )}
      {selectedApod && (
        <Modal open={true}  className="overflow-scroll " >
          <CardContent onClose={handleCloseModal}  >
          <div className="grid lg:grid-cols-2 rounded-[20px] min-h-[80vh] w-full bg-black bg-opacity-[80%] border border-gray-500 gap-8">
          <div className="absolute top-10 right-16 cursor-pointer z-[20]" onClick={handleCloseModal}>
                <span className="text ">Close</span>
              </div>
          <div className="h-full w-full">
            {apodData.length > 0 && (
              <ModalImage
                small={selectedApod.url}
                large={selectedApod.hdurl}
                alt={selectedApod.title}
                hideDownload={true}
                hideZoom={true}
                hideRotate={true}
                className="rounded-t-[20px] lg:rounded-l-[20px] lg:rounded-r-[0px] w-full h-full lg:h-screen object-cover"
              />
            )}
          </div>
          <div className="h-full w-full flex flex-row items-center xl:pl-16 xl:pr-24 relative lg:py-8 p-2 py-4">
            <div className="flex flex-col gap-5 justify-start items-start">
              <div className="text-white text-[40px] text-start">
                {selectedApod.title}
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="text-[14px]">{selectedApod.date}</div>
                <div className="">
                  <div className="w-[6px] h-[5px] bg-white rounded-full"></div>
                </div>
                <div className="text-[14px]">{selectedApod.copyright}</div>
              </div>
              <div className="text-start text-[16px]">
                {selectedApod.explanation}
              </div>
              
            </div>
          </div>
        </div>
          </CardContent>
        </Modal>
      )}
    </div>
  );
};

export default APODImage;
