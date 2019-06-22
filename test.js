import { describe, it } from 'mocha';
import chai,{expect} from 'chai';
import chaiHttp from 'chai-http';

import app from './index';

chai.should();

chai.use(chaiHttp);

describe('Tests for Mars Photos API', () => {
        describe('GET /api/v1/search', () => {
          it('should return status code 200',  (done) => {
            chai.request(app)
              .get('/api/v1/search?sol=0&camera=FHAZ')
              .then((res) => {
                  const body = res.body;
                  expect(body).to.contain.property('message');
                  expect(body).to.contain.property('photos');
                  done()
              })
          });

          it('should return status code 200',  (done) => {
            chai.request(app)
              .get('/api/v1/search?sol=2&camera=FHAZ')
              .then((res) => {
                  const body = res.body;
                  expect(body).to.contain.property('message');
                  done()
              })
          });
        });
})