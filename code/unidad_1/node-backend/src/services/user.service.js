export class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo; // Inyección de dependencias por constructor
  }

  async getUser(id) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    return user;
  }
}
