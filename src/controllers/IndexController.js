const IndexController = {};

IndexController.Index = (req, res) => {
    res.render('index');
};

IndexController.About = (req, res) => {
    res.render('about');
};

module.exports = IndexController;