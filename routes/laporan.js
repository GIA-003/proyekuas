const express = require('express');
const router = express.Router();
const Laporan = require('../models/laporan');
const KasusHama = require('../models/KasusHama');
const Pegawai = require('../models/pegawai');
const DataHama = require('../models/DataHama');
const { authenticate, authorize } = require('../middleware/auth');
// GET: Mengambil semua laporan
router.get('/', authenticate, async (req, res, next) => {
    try {
      const laporan = await Laporan.findAll({
        include: [KasusHama, Pegawai, DataHama]
      });
      res.status(200).json(laporan);
    } catch (error) {
      next(error);
    }
  });
  
  // POST: Menambahkan laporan baru
  router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const newLaporan = await Laporan.create(req.body);
      res.status(201).json(newLaporan);
    } catch (error) {
      next(error);
    }
  });
  
  // PUT: Mengupdate laporan berdasarkan id_laporan
  router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const updated = await Laporan.update(req.body, {
        where: { id_laporan: id }
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
  
  // DELETE: Menghapus laporan berdasarkan id_laporan
  router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await Laporan.destroy({
        where: { id_laporan: id }
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