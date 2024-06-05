const Role = require('./role'); // Ensure the path is correct

class Permissions {
  constructor() {
    this.role = new Role();
  }

  getPermissionsByRoleName(roleName) {
    const role = this.role.getRoleByName(roleName);
    return role ? role.permissions : [];
  }
}

module.exports = Permissions;
