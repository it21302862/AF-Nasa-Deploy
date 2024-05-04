import React, { useState } from "react";
import { DatePicker, Button, Menu, Dropdown, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import MARSImageWithContext from "../components/NasaAPI/MarsRover";
import { useParams } from "react-router-dom";

const MarsRoverPhotos = () => {
  const { RangePicker } = DatePicker;

  const items = [
    {
      key: "all",
      label: "All",
    },
  ];

  const cams = [
    {
      key: "fhaz",
      label: "FHAZ",
    },
    {
      key: "rhaz",
      label: "RHAZ",
    },
    {
      key: "mast",
      label: "MAST",
    },
    {
      key: "chemcam",
      label: "CHEMCAM",
    },
    {
      key: "mahli",
      label: "MAHLI",
    },
    {
      key: "mardi",
      label: "MARDI",
    },
    {
      key: "navcam",
      label: "NAVCAM",
    },
    {
      key: "pancam",
      label: "PANCAM",
    },
    {
      key: "minites",
      label: "MINITES",
    },
    // Add other camera options
  ];

  const apiKey = "yJZPuN2nvNQGZCf4SD7HMM6XhUdl1ZwNXBTrXD2P";
  const [searchOption, setSearchOption] = useState("date");
  const [SelectCamera, setSelectCamera] = useState("Select Camera");
  const [earthDate, setEarthDate] = useState("");
  const [sol, setSol] = useState("");
  const [camera, setCamera] = useState("");
  const [page, setPage] = useState("");
  const { roverName } = useParams();

  console.log(roverName);


  const [tempSol, setTempSol] = useState(sol);
  const [tempEarthDate, setTempEarthDate] = useState(earthDate);
  const [tempCam, setTempCam] = useState(camera);
  const [tempPage, setTempPage] = useState(page);

  const handleSearchOptionChange = (option) => {
    setSearchOption(option.key);
    console.log(option);
  };


  const handleDateChange = (date) => {
    const localDate = date.startOf('day').format('YYYY-MM-DD');
    setTempEarthDate(localDate);
  };
  
  const handleCamera1Change = (option) => {
    setTempCam(option.key); 
    console.log(option.key);
  };

  const handleSolChange = (event) => {
    setTempSol(event.target.value);
  };

  const handlePageChange = (event) => {
    setTempPage(event.target.value);
  };

  const handleSearch = () => {
    setEarthDate(tempEarthDate);
    setSol(tempSol);
    setCamera(tempCam);
    setPage(tempPage);
    console.log(earthDate, sol, camera, page);
  };

  const menu = (
    <Menu onClick={handleSearchOptionChange}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  const cam = (
    <Menu onClick={handleCamera1Change}>
      {cams.map((cam) => (
        <Menu.Item key={cam.key}>{cam.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <div className="container p-0">
        <div className=" bg-black border border-gray-600 rounded-md flex flex-col md:flex-row md:items-center gap-5 p-4">
            <div className="flex flex-wrap gap-2">
              <DatePicker onChange={handleDateChange} />
              <Input
                onChange={handleSolChange}
                placeholder="Enter Sol Number"
              />
              <Input
                onChange={handlePageChange}
                placeholder="Enter Page Number"
              />
              <div className="">
                <label>Search Option:</label>
                <Dropdown overlay={cam} placement="bottomLeft">
                  <Button>{SelectCamera}</Button>
                </Dropdown>
              </div>
            </div>

          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <p className="mt-8">
          Sol: {tempSol ? tempSol : "No sol selected"} <br />
          Selected Date: {tempEarthDate
            ? tempEarthDate
            : "No date selected"}{" "}
          <br />
          Selected Page: {tempPage ? tempPage : "No page selected"}
          <br />
          Selected Camera: {tempCam ? tempCam : "No camera selected"} <br />
          <br />
          Click Search to see the Results
        </p>

        <MARSImageWithContext
          apiKey={apiKey}
          earthDate={earthDate}
          sol={sol}
          page={page}
          camera={camera}
          roverName={roverName} 
        />
      </div>
    </div>
  );
};

export default MarsRoverPhotos;
