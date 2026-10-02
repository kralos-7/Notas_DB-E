export class UsuarioRepositoryPrisma {
  constructor(prismaClient) {
    this.prisma = prismaClient;
  }

  async findByIdWithPosts(id) {
    return await this.prisma.usuario.findUnique({
      where: { id: Number(id) },
      include: { posts: true }
    });
  }

  async create(data) {
    return await this.prisma.usuario.create({ data });
  }

  async obtenerReporteConteo() {
    return await this.prisma.$queryRaw`
      SELECT u.nombre, COUNT(p.id) as total_posts
      FROM "Usuario" u JOIN "Post" p ON u.id = p."usuarioId"
      GROUP BY u.id;
    `;
  }
}
