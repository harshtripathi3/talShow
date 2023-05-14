const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./tests_helper')

beforeEach(async () => {
	// Increasing timeout otherwise sometimes a timeout error can wreck the whole testing phase
  jest.setTimeout(30000) 

	await User.deleteMany({})
	await User.insertMany(helper.initialUsers)
})

describe('adding a new user', () => {
	test('valid user is added succesfully', async () => {
		const user = {
			'username': 'anick',
			'name': 'Anick Bhattacharya',
			'password': '123456'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const users = await helper.usersInDb()
		expect(users).toHaveLength(helper.initialUsers.length + 1)

		const usernames = users.map(user => user.username)
		expect(usernames).toContain('murray')
	})

	test('password less than 3 characters gets 400 response', async () => {
		const user = {
			'username': 'aa09',
			'name': 'AAAA',
			'password': '12'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(400)
	})

	test('duplicate username rejected and receives 400 response', async () => {
		const user = {
			'username': 'Ank',
			'name': 'Ank Bht',
			'password': '123456'
		}

		await api
			.post('/api/users')
			.send(user)
			.expect(400)
	})
})

afterAll(() => {
	mongoose.connection.close()
})