const express = require('express');
const router = express.Router();
const Produit = require('../models/produit');


router.get('/', async (req, res) => {
  const produits = await Produit.findAll();
  res.render('index', { produits });
});


router.get('/add-produit', (req, res) => {
  res.render('add-produit');
});


router.post('/add-produit', async (req, res) => {
  const { nom, categorie, quantite, prix} = req.body;
  await Produit.create({ nom, categorie, quantite, prix });
  res.redirect('/');
});


router.get('/edit-produit/:id', async (req, res) => {
  const produit = await Produit.findByPk(req.params.id);
  res.render('edit-produit', { produit });
});

// Route to update user information
router.post('/edit-produit/:id', async (req, res) => {
  const { nom, categorie, quantite, prix,} = req.body;
  await Produit.update({nom,categorie, quantite, prix }, {
    where: { id: req.params.id }
  });
  res.redirect('/');
});

// Route to delete a user
router.get('/delete-produit/:id', async (req, res) => {
  await Produit.destroy({
    where: { id: req.params.id }
  });
  res.redirect('/');
});

module.exports = router;
