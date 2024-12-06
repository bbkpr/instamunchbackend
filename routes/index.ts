import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/somejson', (req, res) => {
  res.json({ hey: 'guys' });
});

module.exports = router;
