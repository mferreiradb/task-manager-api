import { describe, afterEach, it, expect } from 'vitest'
import supertest from 'supertest'

import { server } from '@/main/server'

describe('Tasks', async () => {
  const api = supertest(server)
  let cleanup: () => Promise<void> | null

  afterEach(async () => {
    await cleanup()
    cleanup = async () => {}
  })

  it('Should create a new task', async () => {
    // ARRANGE
    const body = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      priority: 'LOW',
      status: 'OPEN',
    }
    cleanup = async () => {
      await api.delete(`/api/v1/tasks/${response.body.taskId}`)
    }

    // ACT
    const response = await api.post('/api/v1/tasks').send(body)

    // ASSERT
    expect(response.status).toBe(201)
    expect(response.body.taskId).toBeDefined()
  })

  it('Should list all tasks', async () => {
    // ARRANGE
    const body = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      priority: 'LOW',
      status: 'OPEN',
    }
    const postResponse = await api.post('/api/v1/tasks').send(body)
    cleanup = async () => {
      await api.delete(`/api/v1/tasks/${postResponse.body.taskId}`)
    }

    // ACT
    const getResponse = await api.get('/api/v1/tasks')

    // ASSERT
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toHaveLength(1)
  })

  it('Should list tasks matching the search request query', async () => {
    // ARRANGE
    const bodies = [
      {
        title: 'Learn to test',
        description: 'Learn to test using vitest',
        dueDate: new Date(),
        priority: 'LOW',
        status: 'OPEN',
      },
      {
        title: 'Go to the gym',
        description: 'Go to the gym to get fit',
        dueDate: new Date(),
        priority: 'HIGH',
        status: 'COMPLETED',
      },
    ]
    const postResponses = await Promise.all(
      bodies.map((body) => api.post('/api/v1/tasks').send(body)),
    )
    cleanup = async () => {
      await Promise.all(
        postResponses.map((postResponse) =>
          api.delete(`/api/v1/tasks/${postResponse.body.taskId}`),
        ),
      )
    }

    // ACT
    const requestQuery = { search: 'vite' }
    const getResponse = await api.get('/api/v1/tasks').query(requestQuery)

    // ASSERT
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toHaveLength(1)
    expect(getResponse.body[0].title).toBe('Learn to test')
    expect(getResponse.body[0].description).toBe('Learn to test using vitest')
  })

  it('Should list tasks matching the filter request query', async () => {
    // ARRANGE
    const bodies = [
      {
        title: 'Learn to test',
        description: 'Learn to test using vitest',
        dueDate: new Date(),
        priority: 'HIGH',
        status: 'OPEN',
      },
      {
        title: 'Go to the gym',
        description: 'Go to the gym to get fit',
        dueDate: new Date(),
        priority: 'HIGH',
        status: 'COMPLETED',
      },
    ]
    const postResponses = await Promise.all(
      bodies.map((body) => api.post('/api/v1/tasks').send(body)),
    )
    cleanup = async () => {
      await Promise.all(
        postResponses.map((postResponse) =>
          api.delete(`/api/v1/tasks/${postResponse.body.taskId}`),
        ),
      )
    }

    // ACT
    const requestQuery = {
      priority: 'HIGH',
      status: 'COMPLETED',
    }
    const getResponse = await api.get('/api/v1/tasks').query(requestQuery)

    // ASSERT
    expect(getResponse.status).toBe(200)
    expect(getResponse.body).toHaveLength(1)
    expect(getResponse.body[0].priority).toBe(requestQuery.priority)
    expect(getResponse.body[0].status).toBe(requestQuery.status)
  })

  it('Should get a task', async () => {
    // ARRANGE
    const body = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      priority: 'LOW',
      status: 'OPEN',
    }
    const postResponse = await api.post('/api/v1/tasks').send(body)
    cleanup = async () => {
      await api.delete(`/api/v1/tasks/${postResponse.body.taskId}`)
    }

    // ACT
    const getResponse = await api.get(`/api/v1/tasks/${postResponse.body.taskId}`)

    // ASSERT
    expect(getResponse.status).toBe(200)
    expect(getResponse.body.id).toBe(postResponse.body.taskId)
    expect(getResponse.body.title).toBe(body.title)
  })

  it('Should update a task', async () => {
    // ARRANGE
    const body = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      priority: 'LOW',
      status: 'OPEN',
    }
    const postResponse = await api.post('/api/v1/tasks').send(body)
    cleanup = async () => {
      await api.delete(`/api/v1/tasks/${postResponse.body.taskId}`)
    }

    // ACT
    const updateBody = {
      title: 'Updated Task',
      description: 'This is an updated task',
      dueDate: new Date(),
      priority: 'HIGH',
      status: 'COMPLETED',
    }
    await api.put(`/api/v1/tasks/${postResponse.body.taskId}`).send(updateBody)

    // ASSERT
    const getResponse = await api.get(`/api/v1/tasks/${postResponse.body.taskId}`)

    console.log(getResponse.status)
    expect(getResponse.status).toBe(200)
    expect(getResponse.body.title).toBe(updateBody.title)
  })

  it('Should delete a task', async () => {
    // ARRANGE
    const body = {
      title: 'Test Task',
      description: 'This is a test task',
      dueDate: new Date(),
      priority: 'LOW',
      status: 'OPEN',
    }
    const postResponse = await api.post('/api/v1/tasks').send(body)

    // ACT
    await api.delete(`/api/v1/tasks/${postResponse.body.taskId}`)

    // ASSERT
    const getResponse = await api.get(`/api/v1/tasks/${postResponse.body.taskId}`)
    expect(getResponse.status).toBe(404)
  })
})
