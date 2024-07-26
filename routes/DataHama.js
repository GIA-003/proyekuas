const express = require('express');
const router = express.Router();
const DataHama = require('../models/DataHama');
const { authenticate, authorize } = require('../middleware/auth'); // Pastikan jalur yang benar

// Rute GET untuk mendapatkan daftar produk
router.get('/',authenticate, async (req, res, next) => {
    try {
      const dataHama = await DataHama.findAll();
      res.status(200).json(dataHama);
    } catch (error) {
      next(error);
    }
});
// saat akan menjalankan progrqam end point yang memerlukan akses khusu jika token akun merupakan user maka program tidak akan berjalan dan akan muncul { message: 'user tidak memiliki hak untuk melakukan hal tersebut' }
// Endpoint POST: Menambahkan data hama baru
router.post('/', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
      const newHama = await DataHama.create(req.body);
      res.status(201).json({ message: 'Data berhasil ditambahkan', data: newHama });
  } catch (error) {
      res.status(500).json({ message: 'Data gagal ditambahkan', error: error.message });
      next(error);
  }
});

// Endpoint PUT: Mengupdate data hama berdasarkan id_hama
router.put('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
  try {
    const id = req.params.id;
    const updated = await DataHama.update(req.body, {
      where: { id_hama: id }
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
// Endpoint DELETE: Menghapus data hama berdasarkan id_hama
router.delete('/:id', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleted = await DataHama.destroy({
        where: { id_hama: id }
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
