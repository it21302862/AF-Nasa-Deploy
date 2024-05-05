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
  const [showRoverNames, setShowRoverNames] = useState(false);

  const handleSeeMoreClick = (roverName) => {
    navigate(`/mars-rover-photos/${roverName}`);
  };

  const handleSeeMoreAdopClick = () => {
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

  const handleJoinWithUsClick = () => {
    setShowRoverNames(true); // Set state to true when button is clicked
  };

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
              <div className="text-blue-200 text-[40px] text-start">
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
      <div className="p-2 xl:p-4">
        <div className="grid lg:grid-cols-2 rounded-[20px] min-h-[80vh] w-full bg-black bg-opacity-[80%] border border-gray-500 gap-8">
          <div className="h-full w-full">
            <video controls autoPlay>
              <source
                src="https://media.istockphoto.com/id/1491429091/video/earth-as-viewed-from-moon-surface-the-surface-of-the-moon-strewn-with-small-rocks-and-sand.mp4?s=mp4-640x640-is&k=20&c=eA4TRZshqSJonvSllKyiON86Pa0Fis9Oyb2CI7zWfJc="
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="h-full w-full flex flex-row items-center xl:pl-16 xl:pr-24 relative lg:py-8 p-2 py-4">
            <div className="flex flex-col gap-5 justify-start items-start">
              <div className="text-white text-md uppercase">
                Explore Mars Rover Photos
              </div>
              <div className="text-white text-[40px] text-start">
                MARS ROVER API EXPLORER
              </div>
              <div className="text-start text-[16px]">
                Explore the Red Planet through the lens of NASA’s remarkable
                rovers: Launched in 2011, Curiosity is a car-sized rover that
                landed on Mars in 2012. Its mission: to investigate the planet’s
                past habitability and search for signs of ancient microbial
                life. Curiosity has provided stunning images and valuable data
                about Mars’ geology and climate. Active from 2004 to 2018,
                Opportunity explored the Martian surface. It discovered iron
                meteorites, investigated craters, and survived dust storms.
                Opportunity’s longevity and discoveries captured our
                imagination. Spirit, Opportunity’s twin, operated from 2004 to
                2010. It studied rocks, analyzed soil, and contributed to our
                understanding of Mars. Spirit’s legacy lives on as a pioneer in
                Martian exploration.
              </div>
              <div className="text-start text-blue-200 text-[16px]">
                Join us on this interplanetary journey!
              </div>
              <button
                onClick={handleJoinWithUsClick}
                className="bg-black border border-white hover:bg-white hover:text-black font-semibold text-white py-2 px-6 rounded-full"
                data-testid="join-with-us"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>

        {showRoverNames && (
          <div className="mt-8 grid lg:grid-cols-2 gap-16">
            <div className="flex flex-col items-center gap-4">
              <div
                data-testid="rover-name-1"
                id="rover-name-1"
                className={`p-4 border bg-black hover:bg-[#202020] border-[#303030] rounded-[20px] w-full ${
                  activeRover === "curiosity" ? "border-[#87CEFA]" : ""
                }`}
                onClick={() => toggleRoverDetails("curiosity")}
              >
                <div
                  className="text-white text-[24px] text-start"
                  date-testid="Curiosity"
                >
                  Curiosity
                </div>
              </div>

              <div
                date-testid="rover-name-2"
                id="rover-name-2"
                className={`p-4 border bg-black hover:bg-[#202020] border-[#303030] rounded-[20px] w-full ${
                  activeRover === "opportunity" ? "border-[#87CEFA]" : ""
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
                  activeRover === "spirit" ? "border-[#87CEFA]" : ""
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
                    <div className="" data-testid="active">
                      Active
                    </div>
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
                  src="https://th.bing.com/th/id/R.72f58efd3329917d303d2ca2beafde6f?rik=%2bFvOfX6RHOhCjA&riu=http%3a%2f%2fwww.nasa.gov%2fcenters%2fames%2fimages%2fcontent%2f671125main_msl20110519_PIA14156.jpg&ehk=%2fgsfmqPDUyxPaGq4NMKldyKWorE3lJDK%2bZ%2beTtbMuqA%3d&risl=&pid=ImgRaw&r=0"
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
                    <button
                      onClick={() => handleSeeMoreClick("curiosity")}
                      className="bg-black text-white border-white border-2 rounded-full py-2 px-4 font-bold hover:bg-gray-800 hover:border-gray-800 hover:text-white"
                    >
                      View Photos
                    </button>
                  </div>
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
                  src="https://mars.nasa.gov/system/news_items/main_images/8414_1_MAIN_mars-rover-opportunity-tracks-Sol3754B-pia18605-CROPPED.jpg"
                  alt=""
                  className="object-cover w-full h-[300px]"
                />
              </div>

              <div className="grid grid-cols-6 gap-4 p-8">
                <div className="col-span-4">
                  NASA's Opportunity Mars rover mission is complete after 15
                  years on Mars. Opportunity's record-breaking exploration laid
                  the groundwork for future missions to the Red Planet.
                </div>
                <div className="col-span-2 flex justify-end w-full">
                  <div className="">
                    <button
                      onClick={() => handleSeeMoreClick("opportunity")}
                      className="bg-black text-white border-white border-2 rounded-full py-2 px-4 font-bold hover:bg-gray-800 hover:border-gray-800 hover:text-white"
                    >
                      View Photos
                    </button>
                  </div>
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
                  src="https://th.bing.com/th/id/R.48b470a16a5f9f63f81fb8b1230e49cb?rik=zXA8xyIOaNbHBw&riu=http%3a%2f%2fwww.nasa.gov%2fimages%2fcontent%2f706048main_pia16440-43_946-710.jpg&ehk=HcVGW1io3vkxWA532zwJ4URVFsN1MAJEoOb5OG0uu8k%3d&risl=&pid=ImgRaw&r=0"
                  alt=""
                  className="object-cover w-full h-[300px]"
                />
              </div>

              <div className="grid grid-cols-6 gap-4 p-8">
                <div className="col-span-4">
                  Spirit, also known as MER-A (Mars Exploration Rover – A) or
                  MER-2, is a Mars robotic rover, active from 2004 to 2010.
                  Spirit was operational on Mars for 2208 sols or 3.3 Martian
                  years (2269 days; 6 years, 77 days). It was one of two rovers
                  of NASA's Mars Exploration Rover Mission managed by the Jet
                  Propulsion Laboratory (JPL).
                </div>
                <div className="col-span-2 flex justify-end w-full">
                  <div className="">
                    <button
                      onClick={() => handleSeeMoreClick("spirit")}
                      className="bg-black text-white border-white border-2 rounded-full py-2 px-4 font-bold hover:bg-gray-800 hover:border-gray-800 hover:text-white"
                    >
                      View Photos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
