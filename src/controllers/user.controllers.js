const router = require('express').Router();

const User = require('../models/user.models');
const transporter = require('../configs/mail');
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);

    transporter.sendMail({
      from: 'ABC systems PVT LTD',

      to: user.email,

      subject: user.role === 'admin' ? `${user.first_name} ${user.last_name} has registered with us` : `Welcome to ABC system ${user.first_name} ${user.last_name}`,

      text: user.role === 'admin' ? `Please welcome ${user.first_name} ${user.last_name}` : `Hi ${user.first_name}, Please confirm your email address`,

      html: user.role === 'admin' ? `<p>Please welcome ${user.first_name} ${user.last_name}</p>` : `<p>Hi ${user.first_name}, Please confirm your email address</p>`,
    });

    return res.status(201).send('user registered successfully');
  } catch (err) {
    return res.status(500).send({ err });
  }
});


// endpoint to get paginated users

router.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pagesize || 5;
    const skip = (page - 1) * pageSize;
    const users = await User
      .find()
      .skip(skip)
      .limit(pageSize)
      .lean()
      .exec();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});


module.exports = router;