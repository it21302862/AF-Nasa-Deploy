import React, { useState } from "react";
import APODImage from "../components/NasaAPI/Astronomy";
import { DatePicker, Button, Menu, Dropdown , Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function PictureOfTheDay() {
  const { RangePicker } = DatePicker;

  const items = [
    {
      key: "date",
      label: "Date",
    },
    {
      key: "dateRange",
      label: "Date Range",
    },
    {
      key: "count",
      label: "Count",
    },
  ];

  const initialApiKey = "yJZPuN2nvNQGZCf4SD7HMM6XhUdl1ZwNXBTrXD2P";
  const [searchOption, setSearchOption] = useState("date");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [count, setCount] = useState("");
  const [thumbs, setThumbs] = useState(false);

  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [tempCount, setTempCount] = useState(count);
  const [tempThumbs, setTempThumbs] = useState(thumbs);

  const handleSearchOptionChange = (option) => {
    setSearchOption(option.key);
    console.log(option);
  };

  const handleDateChange = (date) => {
    setTempSelectedDate(date.toISOString().split("T")[0]);
  };

  const handleCountChange = (event) => {
    setTempCount(event.target.value);
    console.log(tempCount);
  };

  const handleRangePickerChange = (dates, dateStrings) => {
    setTempEndDate(dateStrings[1]);
    console.log(tempEndDate);

    setTempStartDate(dateStrings[0]);
    console.log(tempStartDate);
  };

  const handleSearch = () => {
    if (searchOption === "date") {
      setSelectedDate(tempSelectedDate);
      setStartDate("");
      setEndDate("");
      setCount("");
    } else if (searchOption === "dateRange") {
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
      setSelectedDate("");
      setCount("");
    } else if (searchOption === "count") {
      setCount(tempCount);
      setSelectedDate("");
      setStartDate("");
      setEndDate("");
    }
    setThumbs(tempThumbs);
  };

  const menu = (
    <Menu onClick={handleSearchOptionChange}>
      {items.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <div className="container p-0">
        <div className=" bg-black border border-gray-600 rounded-md flex flex-col md:flex-row md:items-center gap-5 p-4">
          <div className="">
            <label>Search Option:</label>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button>{searchOption}</Button>
            </Dropdown>
          </div>
          {searchOption === "date" && <DatePicker onChange={handleDateChange} />}
          {searchOption === "dateRange" && (
            <RangePicker onChange={handleRangePickerChange} />
          )}
          {searchOption === "count" && (
            <div className="">
<Input onChange={handleCountChange} placeholder="Enter Number of Photos" />
            </div>
            
          )}
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        <p className="mt-8">
          Start Date: {tempStartDate ? tempStartDate : "No date selected"} <br />
          End Date: {tempEndDate ? tempEndDate : "No date selected"} <br />
          Selected Date: {tempSelectedDate ? tempSelectedDate : "No date selected"} <br />
          Count: {tempCount ? tempCount : "No count selected"}
          <br />
          Click Search to see the Results
        </p>

        <APODImage
          apiKey={initialApiKey}
          date={selectedDate}
          startDate={startDate}
          endDate={endDate}
          count={count}
          thumbs={thumbs}
        />
      </div>
    </div>
  );
}

export default PictureOfTheDay;
