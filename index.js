// import axios and express from node modules
import express from 'express';
import axios from 'axios';

// create an app and port for backend
const app = express();
const port = 3000;

// use public folder for static files
app.use(express.static('public'));

const getFact = async function() {
  const response = await axios.get('https://cat-fact.herokuapp.com/facts');
  const result = response.data;
  const fact = result[Math.floor(Math.random()*result.length)];
  return fact;
}

app.get('/', async (req, res) => {
  res.render('index.ejs');
});

app.post('/meow', async (req, res) => {
  try {
    const fact = await getFact();
    res.render('index.ejs', { fact: fact.text });
  } catch (error) {
    res.render('index.ejs', {
      error: `https://http.cat/${error.response.status}`,
    });
    console.log(error.message);
  }
});

// listen on port and start the service
app.listen(port, () => {
  console.log(`Serves is running on port ${port}`);
});
