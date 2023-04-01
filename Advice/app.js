const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve your static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
