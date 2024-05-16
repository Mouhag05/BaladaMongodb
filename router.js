//  Affiche les balades contenant les lettres de la recherche dans nom_poi ou texte_intro
app.get('/search/:search', async (req, res) => {
    try {
      const search = req.params.search;
      const balades = await Balade.find({
        $or: [
          { nom_poi: { $regex: search, $options: 'i' } },
          { texte_intro: { $regex: search, $options: 'i' } }
        ]
      });
      res.json(balades);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Affiche les balades ayant une URL de site non nulle
  app.get('/site-internet', async (req, res) => {
    try {
      const balades = await Balade.find({ url_site: { $ne: null } });
      res.json(balades);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //  Affiche les balades avec plus de 5 mots clés
  app.get('/mot-cle', async (req, res) => {
    try {
      const balades = await Balade.find({ $where: 'this.mot_cle.length > 5' });
      res.json(balades);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Affiche les balades publiées pendant une année spécifique, triées de la plus ancienne à la plus récente
  app.get('/publie/:annee', async (req, res) => {
    try {
      const annee = parseInt(req.params.annee);
      const balades = await Balade.find({ annee_publication: annee }).sort({ date_publication: 1 });
      res.json(balades);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //  Créer une nouvelle balade
app.post('/add', async (req, res) => {
    const { nom_poi, adresse, categorie, ...autresChamps } = req.body;
    if (!nom_poi || !adresse || !categorie) {
      return res.status(400).json({ message: "Les clés 'nom_poi', 'adresse' et 'categorie' sont obligatoires" });
    }
  
    try {
      const nouvelleBalade = new Balade({ nom_poi, adresse, categorie, ...autresChamps });
      const baladeSauvegardee = await nouvelleBalade.save();
      res.status(201).json(baladeSauvegardee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  //  Ajouter un mot clé à une balade existante
app.put('/add-mot-cle/:id', async (req, res) => {
    const { id } = req.params;
    const { mot_cle } = req.body;
  
    try {
      const balade = await Balade.findById(id);
      if (!balade) {
        return res.status(404).json({ message: "Balade introuvable" });
      }
  
      if (!mot_cle) {
        return res.status(400).json({ message: "Le mot clé est obligatoire" });
      }
  
      if (balade.mot_cle.includes(mot_cle)) {
        return res.status(400).json({ message: "Le mot clé existe déjà pour cette balade" });
      }
  
      balade.mot_cle.push(mot_cle);
      await balade.save();
      
      res.json(balade);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  
  