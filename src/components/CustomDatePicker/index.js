import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

const CustomDatePicker = React.memo((props) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="date_picker">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          console.log(date, "date");
          setStartDate(date);
        }}
        placeholderText="Date"
      />
      <FontAwesomeIcon icon={faCalendarDays} color="#8C979A" />
    </div>
  );
});

export default CustomDatePicker;
