import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    batch: "",
    registeredYear: "",
    country: "",
    state: "",
    city: "",
    designation: "",
    currentStatus: "",
    courseType: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, user);
      navigate("/");
    } catch (error) {
      console.error(
        "There was an error updating the user:",
        error.response.data
      );
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Update User</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
            <option value="intern">Intern</option>
            <option value="visitor">Visitor</option>
            <option value="learner">Learner</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="batch">
          <Form.Label>Batch</Form.Label>
          <Form.Control
            type="text"
            name="batch"
            value={user.batch}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="registeredYear">
          <Form.Label>Registered Year</Form.Label>
          <Form.Control
            type="number"
            name="registeredYear"
            value={user.registeredYear}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={user.country}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={user.state}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            as="select"
            name="designation"
            value={user.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="student">Student</option>
            <option value="workingProfessional">Working Professional</option>
            <option value="unemployed">Unemployed</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="currentStatus">
          <Form.Label>Current Status</Form.Label>
          <Form.Control
            as="select"
            name="currentStatus"
            value={user.currentStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="courseType">
          <Form.Label>Course Type</Form.Label>
          <Form.Control
            as="select"
            name="courseType"
            value={user.courseType}
            onChange={handleChange}
            required
          >
            <option value="">Select Course Type</option>
            <option value="fullstack">Fullstack</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="intern">Intern</option>
            <option value="internship">Internship</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;