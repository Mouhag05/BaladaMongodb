import express, { json } from "express" ;
import route from "./router.js"

   const express = require('express');
   const mongoose = require('mongoose');
   
   const app = express();
   const PORT = 1235;
   mongoose.connect('mongodb+srv://h3-Bachelordev:ZO15b8RZI8N6Wewv@cluster0.pzkszoq.mongodb.net/Paris', {
     useNewUrlParser: true,
     useUnifiedTopology: true
   })
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error(err));
   
   const baladeSchema = new mongoose.Schema({
   
   });
   
   const Balade = mongoose.model('Balade', baladeSchema);
   
   app.get('/all', async (req, res) => {
     try {
       const balades = await Balade.find();
       res.json(balades);
     } catch (err) {
       console.error(err);
       res.status(500).send('Server Error');
     }
   });

   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   
