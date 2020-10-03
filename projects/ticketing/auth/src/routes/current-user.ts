import express from 'express';

const router = express.Router();
router.get('/api/users/currentuser', (request, response) => {
    response.send("[ticketing.windows][currentUserRouter][HttpGet] =>")
});

export { router as currentUserRouter };