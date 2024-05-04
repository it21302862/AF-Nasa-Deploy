import React, { useState } from "react";
import { DatePicker, Select, Input, Button } from "antd";
import MARSImageWithContext from "../components/NasaAPI/MarsRover";

const { Option } = Select;

const MarsImages = () => {
  const [expanded, setExpanded] = useState(false);
  const [sol, setSol] = useState("");
  const [earthDate, setEarthDate] = useState("");
  const [camera, setCamera] = useState("");
  const [page, setPage] = useState("");
  const apiKey = "yJZPuN2nvNQGZCf4SD7HMM6XhUdl1ZwNXBTrXD2P";

  const handleDateChange = (date, dateString) => {
    setEarthDate(dateString);
  };

  const handleSolChange = (value) => {
    setSol(value);
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleCameraChange = (value) => {
    setCamera(value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="field">
          <label>Earth Date:</label>
          <DatePicker onChange={handleDateChange} />
        </div>
        <div className="field">
          <label>Sol:</label>
          <Input type="number" value={sol} onChange={(e) => handleSolChange(e.target.value)} />
        </div>
        <div className="field">
          <label>Page:</label>
          <Input type="number" value={page} onChange={(e) => handlePageChange(e.target.value)} />
        </div>
      </div>
      <Select
        value={camera}
        onChange={handleCameraChange}
        style={{ width: 200, marginBottom: 16 }} // Apply inline style
      >
        <Option value="fhaz">FHAZ</Option>
        <Option value="rhaz">RHAZ</Option>
        <Option value="mast">MAST</Option>
        <Option value="chemcam">CHEMCAM</Option>
        <Option value="mahli">MAHLI</Option>
        <Option value="mardi">MARDI</Option>
        <Option value="navcam">NAVCAM</Option>
        <Option value="pancam">PANCAM</Option>
        <Option value="minites">MINITES</Option>
        {/* Add other camera options */}
      </Select>

      <MARSImageWithContext
        apiKey={apiKey}
        earthDate={earthDate}
        sol={sol}
        page={page}
        camera={camera}
      />
    </div>
  );
};

export default MarsImages;
