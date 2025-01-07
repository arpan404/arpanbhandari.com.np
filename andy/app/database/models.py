import uuid
from tortoise import fields
from tortoise.models import Model


class User(Model):
    name = fields.CharField(max_length=60, required=True)
    email = fields.CharField(max_length=100, required=True)
    uid = fields.UUIDField(default=uuid.uuid4, unique=True, pk=True)
    assigned_chats = fields.JSONField(default=[])

    class Meta:
        table = "andy_users"


class Chat(Model):
    uid = fields.UUIDField(required=True, unique=True, pk=True)
    chatUID = fields.UUIDField(default=uuid.uuid4, unique=False)
    chat = fields.JSONField(required=True)

    class Meta:
        table = "andy_chats"
