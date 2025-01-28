import request from 'supertest';
import app from '../app/index'; // Adjust the path if needed

let server: any;
let port: number;

beforeAll((done) => {
    server = app.listen(0, () => {
        port = server.address().port;
        console.log(`Test server running on http://localhost:${port}`);
        done();
    });
});

afterAll((done) => {
    if (server) {
        server.close(done);
    } else {
        done();
    }
});

describe('GET /search', () => {
    jest.setTimeout(10000); // Extend Jest timeout if needed

    it('should return 200 and the filtered results for a valid query', async () => {
        const response = await request(`http://localhost:${port}`).get('/search').query({ query: 'example' });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
    });

    it('should return 400 if no query parameter is provided', async () => {
        const response = await request(`http://localhost:${port}`).get('/search');
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Query parameter is required and must be a non-empty string' });
    });

    it('should return 500 if an error occurs during data fetching', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress error logs
        const response = await request(`http://localhost:${port}`).get('/search').query({ query: 'error' });
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Failed to fetch data' });
    });
});
