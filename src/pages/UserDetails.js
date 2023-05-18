import React, { useState } from "react";
import { useGetExamDataQuery } from "../store/services/examDataApi";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import img from "../assets/img.png";
const UserDetails = () => {
  // Store form data in state
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  // Query the  data using the useGetExamDataQuery hook
  const { data, isLoading } = useGetExamDataQuery();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    // Update form data when input values change
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Store form data in local storage
    localStorage.setItem("UserData", JSON.stringify(formData));
    // Navigate to the seat screen
    navigate("/seat-screen");
  };

  return (
    <>
      <Row>
        <Col lg="12">
          <Card>
            {isLoading ? (
              <h5>Loading...</h5>
            ) : (
              <div className="position-relative">
                <img
                  src={data?.image || img}
                  className="card-img-top w-100"
                  alt="..."
                  style={{ maxHeight: "300px", width: "100%" }}
                />
              </div>
            )}

            <CardBody className="ml-5 mt-4 ">
              {isLoading ? (
                <h5>Loading...</h5>
              ) : (
                <>
                  {" "}
                  <CardTitle className="font-bold mb-1">
                    {data?.title}
                  </CardTitle>
                  <CardText className="mb-1">{data?.year}</CardText>
                  <CardText className="mb-1">{data?.detail1}</CardText>
                  <CardText className="mb-1">{data?.detail2}</CardText>
                  <CardText className="mb-1">{data?.detail3}</CardText>{" "}
                </>
              )}
              <Form className="mt-4 absolute" onSubmit={submitHandler}>
                <Row>
                  <Col lg="6">
                    <Row>
                      <Col>
                        <Label className="block">Enter details:</Label>
                      </Col>
                    </Row>
                    <Row className="mb-3 mt-3">
                      <Col>
                        <Input
                          required
                          onChange={(e) => onChangeHandler(e)}
                          value={formData.name}
                          name="name"
                          placeholder="Name"
                          className="w-full md:w-80 bg-gray-200 py-2 px-3 rounded-md border border-gray-300 placeholder-gray-500"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Input
                          required
                          onChange={(e) => onChangeHandler(e)}
                          value={formData?.age}
                          name="age"
                          type="number"
                          min={0}
                          className="w-full md:w-80 bg-gray-200 py-2 px-3 rounded-md border border-gray-300 placeholder-gray-500"
                          placeholder="Age"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Input
                          required
                          onChange={(e) => onChangeHandler(e)}
                          value={formData?.gender}
                          type="select"
                          name="gender"
                          id="gender"
                          className="w-full md:w-80 bg-gray-200 py-2 px-3 rounded-md border border-gray-300"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </Input>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col className="flex justify-center">
                        <Button
                          //   to="/seat-screen"
                          className="bg-green-400 px-5 py-1"
                        >
                          Select Seats
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UserDetails;
