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
    id = fields.IntField(pk=True, generated=True, auto_increment=True, unique=True)
    uid = fields.UUIDField(default=uuid.uuid4, unique=False)
    chats = fields.JSONField(required=True)
    email = fields.CharField(max_length=100, required=True)

    class Meta:
        table = "andy_chats"
