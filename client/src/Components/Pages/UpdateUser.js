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
    registeredYear: ""
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
    await axios.put(`http://localhost:5000/api/users/${id}`, user);
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="my-4">Update User</h1>
      <Form onSubmit={handleSubmit}>
        {/* Same form fields as CreateUser with prefilled values */}
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
        <Button variant="primary" type="submit" className="mt-3">
          Update User
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUser;
