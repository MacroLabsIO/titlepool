import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Dropdown, DropdownButton, Image } from "react-bootstrap";
import "./styles.scss";

const TimePicker = React.memo((props) => {

    const { type } = props;

    const [selectedHour, setHour] = useState("01");
    const [selectedMinute, setMinute] = useState("00");
    const [amOrPm, setAmPm] = useState("pm");
    const [selectedType, setType] = useState("hrs");

    const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const minutes = Array.from(Array(60).keys());
    const amPm = ["am", "pm"];
    const types = ["hrs"];

    return (
        <div className="time_picker d-flex align-items-center">
            <DropdownButton
                title={
                    <span>{selectedHour} <FontAwesomeIcon icon={faCaretDown} /></span>
                }
                id="hours-dropdown"
                className="custom_dropdown me-3"
            >
                {hours.map((item) => (
                    <Dropdown.Item onClick={() => setHour(item)}>{item}</Dropdown.Item>
                ))}
            </DropdownButton>

            <Image className="colon-icon" src="/colon.png" alt="time-colon" />

            <DropdownButton
                title={
                    <span>{selectedMinute} <FontAwesomeIcon icon={faCaretDown} /></span>
                }
                id="minutes-dropdown"
                className="custom_dropdown ms-3 me-4"
            >
                {minutes.map((item) => (
                    <Dropdown.Item onClick={() => setMinute(item)}>{item}</Dropdown.Item>
                ))}
            </DropdownButton>

            {!type ? (
                <DropdownButton
                    title={
                        <span>{amOrPm} <FontAwesomeIcon icon={faCaretDown} /></span>
                    }
                    id="AmPm-dropdown"
                    className="custom_dropdown"
                >
                    {amPm.map((item) => (
                        <Dropdown.Item onClick={() => setAmPm(item)}>{item}</Dropdown.Item>
                    ))}
                </DropdownButton>
            ) : (
                <DropdownButton
                    title={
                        <span>{selectedType} <FontAwesomeIcon icon={faCaretDown} /></span>
                    }
                    id="types-dropdown"
                    className="custom_dropdown"
                >
                    {types.map((item) => (
                        <Dropdown.Item onClick={() => setType(item)}>{item}</Dropdown.Item>
                    ))}
                </DropdownButton>
            )}
        </div>
    );

});

export default TimePicker;