import cors from 'cors';
import './database/database';
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
import { OPT } from './options';
import { activate } from './endpoints/activate';

let app = express();
let router = express.Router();

if (OPT.PRODUCTION) {
  app.use(express.static('dist'));
} else {
  app.use(cors());
}

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'deny');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});
app.use('/api/v1', router);

router.get('/language', language);
router.post('/registration', registration);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/login', login);
router.get('/search', search);
router.get('/lab-locations', labLocations);
router.post('/activate', activate);

router.use(authMiddleware);

router.post('/change-password', changePassword);
router
  .get('/profile', Profile.get)
  .post('/profile', Profile.post)
  .delete('/profile', Profile.delete);

app.listen(5000, function() {
  console.log('Example app listening on port 5000!');
});
