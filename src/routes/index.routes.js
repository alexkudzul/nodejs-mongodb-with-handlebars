const { Router } = require('express');
const router = Router();

const { Index, About } = require('../controllers/IndexController');

router.get('/', Index);

router.get('/about', About);


module.exports = router;