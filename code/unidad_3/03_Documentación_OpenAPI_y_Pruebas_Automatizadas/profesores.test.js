const request = require('supertest');
const app = require('./app');

describe('Pruebas Integradas de Endpoints - API Profesores', () => {
  it('Debe crear un profesor correctamente y responder con HTTP 201', async () => {
    const response = await request(app)
      .post('/api/v1/profesores')
      .send({
        nombre: 'Dr. Carlos Sánchez',
        departamento: 'Ingeniería en Tecnologías Computacionales'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nombre).toBe('Dr. Carlos Sánchez');
    expect(response.body.departamento).toBe('Ingeniería en Tecnologías Computacionales');
  });

  it('Debe retornar HTTP 400 cuando falta el campo departamento', async () => {
    const response = await request(app)
      .post('/api/v1/profesores')
      .send({
        nombre: 'Dra. María Pérez'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
