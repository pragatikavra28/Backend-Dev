import express from 'express';
import multer from 'multer';

const app = express();
app.use(express.json());

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }
});

function authorize(role) {
  return (req, res, next) => {
    if (req.user?.role !== role)
      return res.status(403).send('Forbidden');
    next();
  };
}

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file.mimetype.includes('pdf'))
    return res.status(400).send('Invalid file');
  res.send('Uploaded');
});

app.post('/course', authorize('instructor'), (req, res) => {
  res.send('Course created');
});

app.listen(8000, () => {
  console.log("Server started");
});