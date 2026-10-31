import { Router } from "express";
import { signup, signin, getUserById } from "./auth.service.js";
import { auth } from "../../common/middleware/index.js";
import z from "zod"
import { BadRequestException } from "../../common/exciptions/err.exciptions.js";
import {userloginSchema} from './auth.validation.js'
import { validation } from "../../common/exciptions/service/validation.service.js";
import { upload } from '../common/middlewares/multer.js';
import { signup } from './auth.service.js';
const router = Router()


router.post('/signup', upload().single("pic"), async (req, res) => {
    let data = await signup(req.body);

    res.json(data);
});

export default router;
router.post('/signup', async (req, res) => {
    let data = await signup(req.body)
    res.json(data)
})
router.post('/signin', validation(userloginSchema) ,async (req, res) => {
    let data = await signin(req.body)
    res.json(data)
})
router.get('/get-user-by-id', auth, async (req, res) => {
    console.log(req.user, "from controller");
    let data = await getUserById(req.user?.id)
    res.json(data)
})
router.post('/generate-access-token', async (req, res) => {
    let accessToken = await generateAccessToken(req.body)
    res.json(accessToken)
})
export default router