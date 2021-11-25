exports.uploadFile = async (req, res) => {
  console.log(req.files)
  try {
    if (!req.files) {
      res.status(400).send({
        message: 'Brak pliku!'
      });
    } else {
      let img = req.files.image;
      img.mv('./../src/assets/images/' + img.name);

      res.send({
        status: true,
        message: 'Plik został wgrany.',
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
