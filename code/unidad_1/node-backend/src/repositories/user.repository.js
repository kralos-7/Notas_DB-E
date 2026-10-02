export class UserRepository {
  constructor() {
    this.users = [
      { id: "1", nombre: "Carlos Rojas", email: "carlos@example.com" },
      { id: "2", nombre: "Ana Martínez", email: "ana@example.com" }
    ];
  }

  async findById(id) {
    return this.users.find(user => user.id === id) || null;
  }
}
