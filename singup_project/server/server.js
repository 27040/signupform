const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const port = 5000;

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'deptxo6sw',
  api_key: '179645425228663',
  api_secret: 'f98P5sh8Tqi93VWOC90EGczgScE',
});

// Multer configuration with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'uploads', // Cloudinary folder
    allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed file types
  },
});

const upload = multer({ storage });

// Middleware
app.use(cors(
  {
    origin:["https://signupformfrontend-cyan.vercel.app"],
    methods:["POST","GET"],
    credentials:true
  }

));
app.use(express.json());
app.use(fileUpload({useTempfiles: true, tempFileDir: '/tmp/'}));

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Media upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ imageUrl: req.file.path });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
