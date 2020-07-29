const express = require("express");
const MenuController = require("../controllers/menu");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-menu", [md_auth.ensureAuth], MenuController.addMenu);
// Get menu doesn't have authentication because all users should be able to see them
api.get("/get-menus", MenuController.getMenus);
api.put("/update-menu/:id", [md_auth.ensureAuth], MenuController.updateMenu);
api.put("/activate-menu/:id", [md_auth.ensureAuth], MenuController.updateMenu)
api.delete("/delete-menu/:id", [md_auth.ensureAuth], MenuController.deleteMenu)


module.exports = api;