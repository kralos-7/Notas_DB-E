export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async getProfile(req, res) {
    try {
      const user = await this.userService.getUser(req.params.id);
      res.json({ status: "success", data: user });
    } catch (err) {
      res.status(404).json({ status: "error", message: err.message });
    }
  }
}
