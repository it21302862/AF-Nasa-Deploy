import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ModalImage from "react-modal-image";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [apodData, setApodData] = useState([]);
  const [marsData, setMarsData] = useState([]);
  const [currentDate, setCurrentDate] = useState("");
  const apiKey = "yJZPuN2nvNQGZCf4SD7HMM6XhUdl1ZwNXBTrXD2P";
  const [activeRover, setActiveRover] = useState(null);

  const handleSeeMoreClick = (roverName) => {
    navigate(`/mars-rover-photos/${roverName}`);
  };

  const handleSeeMoreAdopClick =()=>  {
    navigate(`/picture-of-the-day`);
  };
  

  // setActiveRover(roverName);

  const toggleRoverDetails = (roverName) => {
    setActiveRover(roverName);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date().toISOString().split("T")[0];
        setCurrentDate(currentDate); // Generate current date
        let apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;
        const response = await axios.get(apiUrl);
        setApodData([response.data]);
      } catch (error) {
        console.error("Error fetching APOD data:", error);
        setApodData([]);
      }
    };

    fetchData();
  }, [apiKey]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeRover) {
          let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${activeRover}/photos?sol=1000&api_key=${apiKey}`;
          const response = await axios.get(apiUrl);
          console.log(response);
          setMarsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching Mars data:", error);
        setMarsData([]);
      }
    };

    fetchData();
  }, [activeRover, apiKey]);

  // const toggleRoverDetails = (roverId) => {
  //   setActiveRover(roverId === activeRover ? null : roverId);
  // };

  return (
    <div>
      <div className="p-2 xl:p-4">
        <div className="grid lg:grid-cols-2 rounded-[20px] min-h-[80vh] w-full bg-black bg-opacity-[80%] border border-gray-500 gap-8">
          <div className="h-full w-full">
            {apodData.length > 0 && (
              <ModalImage
                small={apodData[0].url}
                large={apodData[0].hdurl}
                alt={apodData[0].title}
                hideDownload={true}
                hideZoom={false}
                hideRotate={false}
                className="rounded-t-[20px] lg:rounded-l-[20px] lg:rounded-r-[0px] w-full h-full lg:h-full object-cover"
              />
            )}
          </div>
          <div className="h-full w-full flex flex-row items-center xl:pl-16 xl:pr-24 relative lg:py-8 p-2 py-4">
            <div
              className="hidden xl:flex absolute top-[50%] right-0 -rotate-90 cursor-pointer"
              onClick={handleSeeMoreAdopClick}
              data-testid="view-past-days"
            >
              <span className="text">View Past Days</span>
            </div>

            <div className="flex flex-col gap-5 justify-start items-start">
              <div className="text-white text-md uppercase">
                Astronomy Picture of the day
              </div>
              <div className="text-white text-[40px] text-start">
                {apodData.length > 0 && apodData[0].title}
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="text-[14px]">{currentDate}</div>
                <div className="">
                  <div className="w-[6px] h-[5px] bg-white rounded-full"></div>
                </div>
                <div className="text-[14px]">Deep Sky Collective</div>
              </div>
              <div className="text-start text-[16px]">
                {apodData.length > 0 && apodData[0].explanation}
              </div>
              <div
                className="xl:hidden cursor-pointer"
                onClick={handleSeeMoreClick}
              >
                <span className="text">View Past Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-16">
        <div className="text-white text-[48px] text-start">
          Explore Mars Rover Photos
        </div>
        <div className="text-[16px]">
          Select a rover to see more information
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col items-center gap-4">
            <div
              data-testid="rover-name-1"
              id="rover-name-1"
              className={`p-4 border bg-black hover:bg-[#202020] border-[#303030] rounded-[20px] w-full ${
                activeRover === "curiosity" ? "border-[#37B535]" : ""
              }`}
              onClick={() => toggleRoverDetails("curiosity")}
            >
              <div className="text-white text-[24px] text-start" date-testid="Curiosity">Curiosity</div>
            </div>

            <div
              date-testid="rover-name-2"
              id="rover-name-2"
              className={`p-4 border bg-black hover:bg-[#202020] border-[#303030] rounded-[20px] w-full ${
                activeRover === "opportunity" ? "border-[#37B535]" : ""
              }`}
              onClick={() => toggleRoverDetails("opportunity")}
            >
              <div className="text-white text-[24px] text-start">
                Opportunity
              </div>
            </div>

            <div
              date-testid="rover-name-3"
              id="rover-name-3"
              className={`p-4 border bg-black hover:bg-[#202020] border-[#303030] rounded-[20px] w-full ${
                activeRover === "spirit" ? "border-[#37B535]" : ""
              }`}
              onClick={() => toggleRoverDetails("spirit")}
            >
              <div className="text-white text-[24px] text-start">Spirit</div>
            </div>
          </div>

          {/* Detail Cards */}
          <div
            id="rover-details-1"
            className={`w-full rounded-[20px] bg-black border border-gray-500 ${
              activeRover === "curiosity" ? "" : "hidden"
            }`}
          >
            <div className="flex justify-between items-center p-8">
              <div className="text-white text-[32px] font-bold text-start">
                Curiosity
              </div>
              <div className="">
                <div className="flex flex-row gap-2 items-center">
                  <div className="">
                    <div className="rounded-full h-[10px] w-[10px] bg-[#37B535]"></div>
                  </div>
                  <div className="" data-testid ="active">Active</div>
                </div>
                {/* <div className="flex flex-row gap-2 items-center">
                  <div className="">
                    <div className="rounded-full h-[10px] w-[10px] bg-[#B53535]"></div>
                  </div>
                  <div className="">Inactive</div>
                </div> */}
              </div>
            </div>

            <div className="h-[300px] w-full">
              <img
                src="https://th.bing.com/th?id=OSK.HEROXd0DfgkKmT_N9cSl7tXGQTof9Gk9SmEKa-RGkvD27Vk&w=312&h=200&c=15&rs=2&o=6&pid=SANGAM"
                alt=""
                className="object-cover w-full h-[300px]"
              />
            </div>

            <div className="grid grid-cols-6 gap-4 p-8">
              <div className="col-span-4" data-testid="curiosity desc">
                Curiosity is a car-sized Mars rover exploring Gale
                crater and Mount Sharp on Mars as part of NASA's Mars Science
                Laboratory (MSL) mission.
              </div>
              <div className="col-span-2 flex justify-end w-full">
                <div className="">
                <button onClick={() => handleSeeMoreClick("curiosity")}
                    className="bg-white text-black font-bold py-2 px-4 rounded-full h-fit-content"
                  >
                    View Photos
                  </button>
                </div>
              </div>
              <div className="col-span-6 flex flex-col gap-4">
                {marsData.photos && marsData.photos.length > 0 && (
                  <div className="col-span-6 flex flex-col gap-4">
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Landed Date</div>
                      <div className="">
                        {marsData.photos[0].rover.landing_date}
                      </div>
                    </div>
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Launch Date</div>
                      <div className="">
                        {marsData.photos[0].rover.launch_date}
                      </div>
                    </div>
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Total Photos</div>
                      <div className="">
                        {marsData.photos[0].rover.total_photos}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            id="rover-details-2"
            className={`w-full rounded-[20px] bg-black border border-gray-500 ${
              activeRover === "opportunity" ? "" : "hidden"
            }`}
          >
            <div className="flex justify-between items-center p-8">
              <div className="text-white text-[32px] font-bold text-start">
                Opportunity
              </div>
              <div className="">
                <div className="flex flex-row gap-2 items-center">
                  <div className="">
                    <div className="rounded-full h-[10px] w-[10px] bg-[#37B535]"></div>
                  </div>
                  <div className="">Active</div>
                </div>
                {/* <div className="flex flex-row gap-2 items-center">
                  <div className="">
                    <div className="rounded-full h-[10px] w-[10px] bg-[#B53535]"></div>
                  </div>
                  <div className="">Inactive</div>
                </div> */}
              </div>
            </div>

            <div className="h-[300px] w-full">
              <img
                src="https://th.bing.com/th?id=OSK.HEROXd0DfgkKmT_N9cSl7tXGQTof9Gk9SmEKa-RGkvD27Vk&w=312&h=200&c=15&rs=2&o=6&pid=SANGAM"
                alt=""
                className="object-cover w-full h-[300px]"
              />
            </div>

            <div className="grid grid-cols-6 gap-4 p-8">
              <div className="col-span-4">
              NASA's Opportunity Mars rover mission is complete after 15 years on Mars. Opportunity's record-breaking exploration laid the groundwork for future missions to the Red Planet.
              </div>
              <div className="col-span-2 flex justify-end w-full">
                <div className="">
                  <button
                    onClick={() => handleSeeMoreClick("opportunity")}
                    className="bg-white text-black font-bold py-2 px-4 rounded-full h-fit-content"
                  >
                    View Photos
                  </button>
                </div>
              </div>
              <div className="col-span-6 flex flex-col gap-4">
                {marsData.photos && marsData.photos.length > 0 && (
                  <div className="col-span-6 flex flex-col gap-4">
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Landed Date</div>
                      <div className="">
                        {marsData.photos[0].rover.landing_date}
                      </div>
                    </div>
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Launch Date</div>
                      <div className="">
                        {marsData.photos[0].rover.launch_date}
                      </div>
                    </div>
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Total Photos</div>
                      <div className="">
                        {marsData.photos[0].rover.total_photos}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            id="rover-details-3"
            className={`w-full rounded-[20px] bg-black border border-gray-500 ${
              activeRover === "spirit" ? "" : "hidden"
            }`}
          >
            <div className="flex justify-between items-center p-8">
              <div className="text-white text-[32px] font-bold text-start">
                Spirit
              </div>
              <div className="">
                <div className="flex flex-row gap-2 items-center">
                  <div className="">
                    <div className="rounded-full h-[10px] w-[10px] bg-[#37B535]"></div>
                  </div>
                  <div className="">Active</div>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <img
                src="https://th.bing.com/th?id=OSK.HEROXd0DfgkKmT_N9cSl7tXGQTof9Gk9SmEKa-RGkvD27Vk&w=312&h=200&c=15&rs=2&o=6&pid=SANGAM"
                alt=""
                className="object-cover w-full h-[300px]"
              />
            </div>

            <div className="grid grid-cols-6 gap-4 p-8">
              <div className="col-span-4">
              Spirit, also known as MER-A (Mars Exploration Rover – A) or MER-2, is a Mars robotic rover, active from 2004 to 2010. Spirit was operational on Mars for 2208 sols or 3.3 Martian years (2269 days; 6 years, 77 days). It was one of two rovers of NASA's Mars Exploration Rover Mission managed by the Jet Propulsion Laboratory (JPL).
              </div>
              <div className="col-span-2 flex justify-end w-full">
                <div className="">
                  <button
                    onClick={() => handleSeeMoreClick("spirit")}
                    className="bg-white text-black font-bold py-2 px-4 rounded-full h-fit-content"
                  >
                    View Photos
                  </button>
                </div>
              </div>
              <div className="col-span-6 flex flex-col gap-4">
                {marsData.photos && marsData.photos.length > 0 && (
                  <div className="col-span-6 flex flex-col gap-4">
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Landed Date</div>
                      <div className="">
                        {marsData.photos[0].rover.landing_date}
                      </div>
                    </div>
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Launch Date</div>
                      <div className="">
                        {marsData.photos[0].rover.launch_date}
                      </div>
                    </div>
                    <div className="flex w-full flex-row justify-between items-center border-b border-[#232323] pb-4">
                      <div className="">Total Photos</div>
                      <div className="">
                        {marsData.photos[0].rover.total_photos}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
