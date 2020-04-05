import cors from 'cors';
import express, { response } from 'express';
import { readFileSync } from 'fs';
import { registration } from './endpoints/registration';
import { forgotPassword } from './endpoints/forgotPassword';
import { resetPassword } from './endpoints/resetPassword';
import { login } from './endpoints/login';
import { authMiddleware } from './middlewares/auth';
import { changePassword } from './endpoints/changePassword';
import { search } from './endpoints/search';
import Profile from './endpoints/Profile';
import { language } from './endpoints/language';
import { labLocations } from './endpoints/labLocations';

let app = express();
let router = express.Router();

export let HMAC_KEY: string;
if (process.env.PRODUCTION) {
  app.use(express.static('dist'));
  HMAC_KEY = readFileSync('./secret/jsonwebtoken_hmacKey.txt', {
    encoding: 'utf8',
  });
} else {
  app.use(cors());
  HMAC_KEY = 'randomHmacKey';
}

app.use(express.json());
app.use('/api/v1', router);

router.get('/language', language);
router.post('/registration', registration);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);
router.get('/search', search);
router.get('/labLocations', labLocations);

router.use(authMiddleware);

router.post('/change-password', changePassword);
router
  .get('/profile', Profile.get)
  .post('/profile', Profile.post)
  .delete('/profile', Profile.delete);

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
