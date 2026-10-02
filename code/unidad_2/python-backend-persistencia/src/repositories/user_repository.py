from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select, text
from models.models import Usuario

class UsuarioRepositorySQLAlchemy:
    def __init__(self, session: Session):
        self.session = session

    def get_by_id_with_posts(self, user_id: int):
        stmt = select(Usuario).where(Usuario.id == user_id).options(joinedload(Usuario.posts))
        return self.session.scalars(stmt).first()

    def ejecucion_analitica_raw(self):
        query = text("SELECT usuario_id, COUNT(*) FROM posts GROUP BY usuario_id;")
        return self.session.execute(query).fetchall()
