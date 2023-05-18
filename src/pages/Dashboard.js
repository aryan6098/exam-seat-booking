import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText,
  Button,
  Label,
} from "reactstrap";
import img from "../assets/img.png"
import { useGetExamDataQuery } from "../store/services/examDataApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Query the  data using the useGetExamDataQuery hook
  const { data, isLoading } = useGetExamDataQuery();
  const registeredUser = JSON.parse(localStorage.getItem("SelectedSeats"));
  return (
    <>
      {/* Conditional rendering based on the loading state */}

      {isLoading ? (
        <>Loading...</>
      ) : (
        <Row className="mt-10 px-10">
          <Col lg={10}>
            <Card className="bg-gray-200">
              <Link to={"/user-details/"}>
                <Row className="flex">
                  <Col md={4} className="p-4">
                    <CardImg
                      className="w-full h-auto max-h-32"
                      src={data?.image || img}
                      alt="user image"
                    />
                  </Col>
                  <Col md={8} className="px-4 py-4">
                    <CardBody>
                      <CardTitle className="font-bold">{data?.title || "title"}</CardTitle>
                      <CardText className="mt-2">{data?.year || "Year"}</CardText>
                      <CardText className="mt-2">{data?.detail1 || "detail1"}</CardText>
                    </CardBody>
                  </Col>
                </Row>
              </Link>
            </Card>
          </Col>
        </Row>
      )}
      {/* Button to display when no user is registered */}
      {registeredUser ? (
        <Row className="mt-4 flex items-center justify-center">
          <Col className="w-64">
            {registeredUser?.map((data, index) => (
              <div
                className="text-center mb-3 px-5 py-1 bg-green-400 text-white"
                key={index}
              >
                {data?.name}{" "}
                <Label>
                  Seat no. {data?.selectedSeats?.row}
                  {data?.selectedSeats?.column}
                </Label>
              </div>
            ))}
          </Col>
        </Row>
      ) : (
        <Row className="mt-4 text-center">
          <Col>
            <Button className="px-5 bg-danger py-1 text-white">
              No User Registered
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Dashboard;
