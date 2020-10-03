import express from 'express';

const router = express.Router();
router.post('/api/users/signin', (request, response) => {
    response.send("[signInRouter][HttpPost] =>")
});

export { router as signInRouter };