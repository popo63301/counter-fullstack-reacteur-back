const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;

///////////////////////////////////////////////////

mongoose.connect(
  'mongodb://admin:admin123@ds261253.mlab.com:61253/counter-fullstack-reacteur',
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  console.log('Connected successfully');
});

const counterSchema = new mongoose.Schema({
  value: Number
});

const Counter = mongoose.model('Counter', counterSchema);

///////////////////////////////////////////////////

app.get('/valueCounter', (req, res) => {
  //chercher tout les counter 🚨
  //    si il n'y a pas de counter: 🚨
  //        créer nouveau counter 🚨
  //        sauvegarder dans la base de donnée 🚨
  //            une fois que c'est enregistré: 🚨
  //            envoyer la valeur à l'utilisateur (qui sera 0) 🚨
  //    Sinon, prendre le premier counter et retourner sa valeur 🚨

  Counter.find(function(err, counters) {
    if (counters.length === 0) {
      const newCounter = new Counter({ value: 0 });

      newCounter.save(function(err, counter) {
        return res.send(counter);
      });
    } else {
      const counterDb = counters[0];
      res.send(counterDb);
    }
  });
});

app.post('/increment', (req, res) => {
  //Chercher tout les counters 🚨
  //  prendre le premier counter 🚨
  //  incrémenter sa valeur 🚨
  //  enregistrer dans la db
  //      une fois que j'ai enregistré dans la base de donnée
  //      envoyé valeur enregistré de la db

  Counter.find(function(err, counters) {
    const counter = counters[0];
    counter.value = counter.value + 1;

    counter.save(function(err, counterSaved) {
      return res.send(counterSaved);
    });
  });
});

app.post('/decrement', (req, res) => {
  Counter.find(function(err, counters) {
    const counter = counters[0];
    counter.value = counter.value - 1;

    counter.save(function(err, counterSaved) {
      return res.send(counterSaved);
    });
  });
});

///////////////////////////////////////////////////

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
