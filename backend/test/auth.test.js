import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { app } from '../server.js';
import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer'; 

jest.setTimeout(20000);

// Mock nodemailer manually for ES module
const sendMailMock = jest.fn();
jest.spyOn(nodemailer, 'createTransport').mockReturnValue({
  sendMail: sendMailMock,
});

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
  jest.clearAllMocks();
});

describe('Auth API Tests', () => {
  // Test Signup
  describe('POST /signup', () => {
    it('should create a new user, hash password, send verification email, and generate token', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'Password123!',
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User created successfully');

      // Check if user is saved in DB
      const user = await User.findOne({ email: 'johndoe@example.com' });
      expect(user).not.toBeNull();
      expect(user.password).not.toBe('Password123!'); // Ensure password is hashed

      // Check if verification token was generated
      expect(user.verificationToken).toBeDefined();
      expect(user.verificationTokenExpiresAt).toBeDefined();

      // Ensure password is not returned in response
      expect(res.body.user.password).toBeUndefined();

      // Check that the email was sent
      expect(sendMailMock).toHaveBeenCalledWith({
        from: '"MERN-AUTH" wilsonjeffery230@gmail.com',
        to: 'johndoe@example.com',
        subject: 'Verify Your Email',
        html: expect.any(String),
        category: 'Verification Email',
      });
    });

    it('should not create a user if email already exists', async () => {
      await new User({
        name: 'Existing User',
        email: 'existinguser@example.com',
        password: await bcryptjs.hash('Password123!', 10),
        verificationToken: '12345',
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }).save();

      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Jane Doe',
          email: 'existinguser@example.com',
          password: 'Password123!',
        })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('User already exists');
    });
  });

  // Test Login
  describe('POST /login', () => {
    it('should login an existing user and generate a JWT token', async () => {
      const hashedPassword = await bcryptjs.hash('Password123!', 10);
      const user = await new User({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
        verificationToken: '12345',
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }).save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'johndoe@example.com',
          password: 'Password123!',
        })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Logged in successfully');

      // Ensure JWT token is set in cookies
      const token = res.headers['set-cookie'][0];
      expect(token).toContain('token=');

      // Check if token payload contains user ID and role
      const decodedToken = jwt.verify(token.split('=')[1].split(';')[0], process.env.JWT_SECRET);
      expect(decodedToken.userId).toBe(user._id.toString());
      expect(decodedToken.role).toBe(user.role);

      // Ensure password is not returned in response
      expect(res.body.user.password).toBeUndefined();
    });

    it('should return an error for invalid credentials', async () => {
      const hashedPassword = await bcryptjs.hash('Password123!', 10);
      await new User({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword,
        verificationToken: '12345',
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      }).save();

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'johndoe@example.com',
          password: 'WrongPassword!',
        })
        .expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Password Mismatch!!');
    });
  });
});
