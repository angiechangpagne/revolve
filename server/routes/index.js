const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const apiRoutes=require('../api');

router.use('/api', apiRoutes);

/* GET home page. */
// router.get('/', (req, res, next) =>{
//   res.send("API working")
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
