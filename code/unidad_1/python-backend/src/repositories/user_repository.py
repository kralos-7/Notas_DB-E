class UserRepository:
    def __init__(self):
        self.users = [
            {"id": 1, "nombre": "Carlos Rojas", "email": "carlos@example.com"},
            {"id": 2, "nombre": "Ana Martínez", "email": "ana@example.com"}
        ]

    def get_by_id(self, user_id: int):
        for user in self.users:
            if user["id"] == user_id:
                return user
        return None
