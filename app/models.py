from sqlalchemy import Column, Integer, String, LargeBinary, DateTime, Float, ForeignKey
from sqlalchemy.sql import func
from datetime import datetime, timedelta
from .database import Base
from sqlalchemy.orm import relationship

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String(15), nullable=False)
    photo = Column(LargeBinary, nullable=False)
    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String(50), default='Pending')
    

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    phone_number = Column(String(15), nullable=False)
    name = Column(String(100), nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(255), nullable=False)  # Добавлено поле для имени
    last_name = Column(String(255), nullable=False)   # Добавлено поле для фамилии
    created_at = Column(DateTime(timezone=True), default=func.now(), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class EmailVerification(Base):
    __tablename__ = "email_verifications"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False)
    code = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime, nullable=False, default=lambda: datetime.datetime.utcnow() + datetime.timedelta(minutes=10))