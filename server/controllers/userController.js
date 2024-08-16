const User = require("../models/User");

// Create a user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get users with pagination, filtering, sorting, and search
exports.getUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = "asc",
      search
    } = req.query;
    const {
      batch,
      role,
      registeredYear,
      currentStatus,
      courseType,
      designation,
      city,
      state,
      country
    } = req.query;

    // Validate and restrict limit to specific values
    const allowedLimits = [10, 25, 50, 100];
    const parsedLimit = parseInt(limit);
    if (!allowedLimits.includes(parsedLimit)) {
      return res.status(400).json({ error: "Invalid limit value" });
    }

    // Initialize filters
    let filters = {};

    if (batch) filters.batch = batch;
    if (role) filters.role = role;
    if (registeredYear) filters.registeredYear = registeredYear;
    if (currentStatus) filters.currentStatus = currentStatus;
    if (courseType) filters.courseType = courseType;
    if (designation) filters.designation = designation;
    if (city) filters.city = city;
    if (state) filters.state = state;
    if (country) filters.country = country;

    // Search by name, email, or phone
    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    // Get sorted data
    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Fetch users with filters, pagination, and sorting
    const users = await User.find(filters)
      .sort(sortOptions)
      .skip((page - 1) * parsedLimit)
      .limit(parsedLimit);

    // Count total documents matching the filters
    const count = await User.countDocuments(filters);

    res.json({
      users,
      totalPages: Math.ceil(count / parsedLimit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};