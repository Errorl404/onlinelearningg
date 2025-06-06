const express = require('express');
const app = express();

// Static files
app.use('/public', express.static('public'));
app.use(express.static('public'));

// Body parser (urlencoded)
app.use(express.urlencoded({ extended: true }));

// Load middlewares
require('./middlewares/dbLocal.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/passport.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/view.mdw')(app);
require('./middlewares/route.mdw')(app);
require('./middlewares/error.mdw')(app);
require('./middlewares/paypal.mdw')(app);
require('./middlewares/cloudinary.mdw')(app);

// Simple test route để check server có chạy
app.get('/test', (req, res) => {
  res.send('Hello from WebCTT2 test route!');
});

// Import model (đảm bảo model đã được export đúng)
const Course = require('./models/Course.model');

// Example cập nhật dữ liệu mẫu (đảm bảo chạy khi app đã kết nối DB)
async function updateCourse() {
  try {
    const doc = await Course.findOne({_id: '60047f3899dbc32298745e80'});
    if (doc) {
      doc.numberOfVideo = 4;
      doc.videos = [
        { name: 'Machine learning overview', source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/1_z97lxw.mp4' },
        { name: 'First application', source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/2_pne144.mp4' },
        { name: 'Finding algorithm', source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/3_io1o37.mp4' },
        { name: 'End course', source: 'https://res.cloudinary.com/teamwebctt2/video/upload/v1610988326/webctt2/video/machineLearning/4_jm9lkt.mp4' }
      ];
      await doc.save();
      console.log('Course updated and saved');
    }
  } catch (error) {
    console.error('Error updating course:', error);
  }
}

// Call updateCourse after DB connected
updateCourse();

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
