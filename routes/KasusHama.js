const express = require('express');
const router = express.Router();
const KasusHama = require('../models/KasusHama');
const DataHama = require('../models/DataHama');
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint GET: Mengambil semua kasus hama
router.get('/', authenticate, async (req, res, next) => {
    try {
      const kasusHama = await KasusHama.findAll({ include: DataHama });
      res.status(200).json(kasusHama);
    } catch (error) {
      next(error);
    }
  });
  
  // Endpoint POST: Menambahkan kasus hama baru
  router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const newKasus = await KasusHama.create(req.body);
      res.status(201).json(newKasus);
    } catch (error) {
      next(error);
    }
  });
  
  // Endpoint PUT: Mengupdate kasus hama berdasarkan id_kasus
  router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const updated = await KasusHama.update(req.body, {
        where: { id_kasus: id }
      });
      if (updated[0] === 1) {
        res.status(200).json({ message: 'Data updated successfully' });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      next(error);
    }
  });
  
  // Endpoint DELETE: Menghapus kasus hama berdasarkan id_kasus
  router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await KasusHama.destroy({
        where: { id_kasus: id }
      });
      if (deleted) {
        res.status(200).json({ message: 'Data deleted successfully' });
      } else {
        res.status(404).json({ message: 'Data not found' });
      }
    } catch (error) {
      next(error);
    }
  });
  module.exports = router;