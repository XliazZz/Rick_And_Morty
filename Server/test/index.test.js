const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe("Test de RUTAS", () => {

    describe("GET /rickandmorty/character/:id", () => {

        it("Responde con status: 200", async () => {
            const respose =  await session(app).get('/rickandmorty/character/1');
            console.log(respose)
            // expect(respose.statusCode).toBe(200);
        });

        test('Responde con un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const res = await agent.get('/rickandmorty/character/1');

            expect(Object.keys(res.body)).toEqual([
                "id",
                "name",
                "species",
                "gender",
                "status",
                "origin",
                "image",
            ]);
        });

        it('Si hay un error responde con status: 500', async () => {
            await agent.get('/rickandmorty/character/999').expect(500);

        })
    });
})