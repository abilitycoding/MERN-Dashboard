import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Pagination, Form, Button, Row, Col } from "react-bootstrap";
import { FaSync, FaTimes, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/users", {
      params: {
        page,
        limit,
        sortBy,
        sortOrder,
        search: debouncedSearch,
        ...filters
      }
    });
    setUsers(response.data.users);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, filters, sortBy, sortOrder, debouncedSearch, limit]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const clearFilters = () => {
    setFilters({});
    setSortBy("");
    setSortOrder("asc");
    setSearch("");
    setDebouncedSearch("");
    setPage(1);
    setLimit(10);
  };

  const refreshData = () => {
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Dashboard</h1>
      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Link to="/create-user">
            <Button variant="success">
              <FaPlus /> Add User
            </Button>
          </Link>
        </Col>
      </Row>
      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Group controlId="search">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by name, email, phone, location..."
                value={search}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="roleFilter">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={filters.role || ""}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
                <option value="intern">Intern</option>
                <option value="visitor">Visitor</option>
                <option value="learner">Learner</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="sortBy">
              <Form.Label>Sort By</Form.Label>
              <Form.Control
                as="select"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
                <option value="batch">Batch</option>
                <option value="registeredYear">Registered Year</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="limitSelect">
              <Form.Label>Show</Form.Label>
              <Form.Control
                as="select"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end pt-3 gap-3">
            <Button variant="secondary" className="mr-2" onClick={clearFilters}>
              <FaTimes /> Clear Filters
            </Button>
            <Button variant="primary" onClick={refreshData}>
              <FaSync /> Refresh
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="overflow-x-scroll">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Batch</th>
              <th>Registered Year</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.batch}</td>
                  <td>{user.registeredYear}</td>
                  <td>
                    {user.country}, {user.state}, {user.state}
                  </td>
                  <td className="d-flex gap-3">
                    <Link to={`/update-user/${user._id}`}>
                      <Button variant="warning" className="mr-2">
                        <FaEdit /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Pagination className="pt-3 d-flex justify-content-center">
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === page}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default Dashboard;
