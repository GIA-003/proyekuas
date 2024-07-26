const express = require('express');
const router = express.Router();
const Pegawai = require('../models/pegawai');
const { authenticate, authorize } = require('../middleware/auth');
// Endpoint GET: Mengambil semua data pegawai
router.get('/', authenticate, async (req, res, next) => {
    try {
      const pegawai = await Pegawai.findAll();
      res.status(200).json(pegawai);
    } catch (error) {
      next(error);
    }
  });
  
  // Endpoint POST: Menambahkan data pegawai baru
  router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const newPegawai = await Pegawai.create(req.body);
      res.status(201).json(newPegawai);
    } catch (error) {
      next(error);
    }
  });
  
  // Endpoint PUT: Mengupdate data pegawai berdasarkan pegawaiID
  router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const updated = await Pegawai.update(req.body, {
        where: { pegawaiID: id }
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
  
  // Endpoint DELETE: Menghapus data pegawai berdasarkan pegawaiID
  router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Pegawai.destroy({
        where: { pegawaiID: id }
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