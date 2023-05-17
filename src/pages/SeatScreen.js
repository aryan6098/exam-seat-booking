import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Button } from "reactstrap";

const SeatScreen = () => {
  const navigate = useNavigate();
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("UserData"));

  const existingSelectedSeats =
    JSON.parse(localStorage.getItem("SelectedSeats")) || [];

  // Check if userData exists before destructuring properties
  const {  age, gender } = userData || {};

  // State for selected seats
  const [selectedSeats, setSelectedSeats] = useState({});
  // Rows and columns configuration
  const rows = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  const columns = [1, 2, 3, 4, 5, 6];

  // Check if a seat is selected
  const isSeatSelected = (row, column) => {
    return selectedSeats.row === row && selectedSeats.column === column;
  };
  // Check if a seat is eligible for selection
  const isSeatEligible = (row, column) => {
    if (gender === "female" && (column === 3 || column === 4)) {
      return false; // Female users cannot select aisle seats
    }

    if (age <= 20 && (column === 1 || column === 6)) {
      return false; // Users <=20 years old cannot select column 1 and column 6
    }

    if (age >= 30 && rows.indexOf(row) >= 7) {
      return false; // Users >=30 years old cannot select last 6 rows (H,I,J,K,L,M)
    }
    // Check if the seat is already occupied by another user
    const occupiedSeats = existingSelectedSeats.map(
      (user) => user.selectedSeats
    );
    return !occupiedSeats.some(
      (seat) => seat?.row === row && seat?.column === column
    );
  };
  // Handle seat selection
  const handleSeatSelection = (row, column) => {
    if (isSeatEligible(row, column)) {
      const seat = { row, column };
      setSelectedSeats(seat);
    }
  };

  const submitSelectedSeats = () => {
    userData.selectedSeats = {
      row: selectedSeats.row,
      column: selectedSeats.column,
    };
    const updatedFormData = [...existingSelectedSeats, userData];

    localStorage.setItem("SelectedSeats", JSON.stringify(updatedFormData));
    navigate("/");
  };
  return (
    <Container className="p-20">
      <h6>Select Seats</h6>
      <Row className="w-64 flex items-center flex-col">
        <Row>
          <Col></Col>
        </Row>
        <div className="flex flex-wrap">
          <div className="w-4"></div>
          {columns.map((column, index) => (
            <React.Fragment key={index}>
              {index > 0 && index % 3 === 0 && <div className="mx-4"></div>}
              <div
                key={`column${column}`}
                className="w-6  ml-2 flex items-center justify-center"
              >
                {column}
              </div>
            </React.Fragment>
          ))}
        </div>
        {rows.map((row) => (
          <div key={`row${row}`} className="flex flex-wrap">
            <div className="w-4 font-bold text-gray-700 mr-1">{row}</div>
            {columns.map((column, index) => (
              <React.Fragment key={`${row}${column}`}>
                {index > 0 && index % 3 === 0 && <div className="mx-4"></div>}

                <div
                  key={`${row}${column}`}
                  className={`w-6 h-5 square-full m-1 flex items-center justify-center ${
                    isSeatEligible(row, column)
                      ? isSeatSelected(row, column)
                        ? "bg-gray-400 text-white" // If the seat is selected, set the background color to gray
                        : "bg-green-400 text-white" // If the seat is eligible but not selected, set the background color to green
                      : "bg-gray-400 text-gray-700" // If the seat is not eligible, set the background color to gray
                  }`}
                  onClick={() => handleSeatSelection(row, column)}
                ></div>
              </React.Fragment>
            ))}
          </div>
        ))}
        <Row className="mt-4">
          <Col>
            <Button
              className={`px-10 py-1 bg-green-400 text-white ${
                Object.keys(selectedSeats).length === 0 ? "opacity-50" : ""
              }`}
              onClick={submitSelectedSeats}
              disabled={Object.keys(selectedSeats).length === 0}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default SeatScreen;
