import express  from 'express';
import  {signup}  from '../controllers/auth.controller.js';
const router = express.Router();
router.post('/signup', signup);
export default router;
//Route đăng ký người dùng: Sử dụng hàm signup để xử lý các yêu cầu đăng ký.
