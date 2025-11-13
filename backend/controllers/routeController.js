const Route = require("../models/Route");

// GET /api/routes
exports.listRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    console.error("listRoutes error:", err);
    res.status(500).json({ message: "Failed to fetch routes" });
  }
};

// GET /api/routes/:id
exports.getRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: "Route not found" });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch route" });
  }
};

// POST /api/routes
exports.createRoute = async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (err) {
    console.error("createRoute:", err);
    res.status(500).json({ message: "Failed to create route" });
  }
};

// PUT /api/routes/:id
exports.updateRoute = async (req, res) => {
  try {
    const updated = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Route not found" });
    res.json(updated);
  } catch (err) {
    console.error("updateRoute:", err);
    res.status(500).json({ message: "Failed to update route" });
  }
};

// DELETE /api/routes/:id
exports.deleteRoute = async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error("deleteRoute:", err);
    res.status(500).json({ message: "Failed to delete route" });
  }
};
