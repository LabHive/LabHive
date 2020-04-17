import cors from 'cors'
import express from "express"
import { NOT_FOUND, UNAUTHORIZED } from 'http-status-codes'
import "./database/database"
import { activate } from './endpoints/activate'
import { AdminEndpoint } from './endpoints/admin'
import { changePassword } from './endpoints/changePassword'
import { forgotPassword } from './endpoints/forgotPassword'
import { language } from './endpoints/language'
import { login } from './endpoints/login'
import Profile from './endpoints/Profile'
import { registration } from './endpoints/registration'
import { resetPassword } from './endpoints/resetPassword'
import { search } from "./endpoints/search"
import { testCoverage } from './endpoints/testCoverage'
import { UnauthorizedError } from './errors'
import { authMiddleware } from './middlewares/auth'
import { OPT } from './options'
import utils from './utils'

let app = express()
let router = express.Router()
let adminRouter = new AdminEndpoint(express.Router())

if (OPT.PRODUCTION) {
  app.use(express.static('dist'));
} else {
  app.use(cors());
}

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'deny')
    res.setHeader('Referrer-Policy', 'no-referrer')
    next()
})
app.use('/api/v1', router)
router.use('/admin', adminRouter.router)


router.get('/language', language)
router.post('/registration', registration)
router.post('/forgot-password', forgotPassword)
router.post("/reset-password", resetPassword)
router.post("/login", login)
router.get("/search", search)
router.post("/activate", activate)
router.get("/test-coverage", testCoverage)
router.get("/profile/:id", Profile.getForSlug)


router.use(authMiddleware)

router.post("/change-password", changePassword)
router.get("/profile", Profile.get)
    .post("/profile", Profile.post)
    .delete("/profile", Profile.delete)


app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  return utils.errorResponse(res, NOT_FOUND, "invalid_route")
})

app.use(function(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  if (err instanceof UnauthorizedError) {
    return utils.errorResponse(res, UNAUTHORIZED, "not_authorized");
  }

  return utils.errorResponse(res, NOT_FOUND, "invalid_route")
});


app.listen(5000, function () {
    console.log('Example app listening on port 5000!')
})



