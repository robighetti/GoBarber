import express from 'express';
import routes from './routes';

/*
  SOLID
  Single Responsability Principle
  Open/closed principle
  Liskov substitution principle
  Interface segragation principle
  Dependency inversion principle
*/

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀️ Server started on port 3333 🙂 ');
});
