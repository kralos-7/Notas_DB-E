from repositories.user_repository import UserRepository

class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def get_user_profile(self, user_id: int):
        user = self.repo.get_by_id(user_id)
        if not user:
            raise ValueError("Usuario no encontrado")
        return user
