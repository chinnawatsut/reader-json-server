const db = require('../db')()

exports.getReviews = (req, res, next) => {
    const reviews = db
        .defaults({
            reviews: []
        })
        .get('reviews')
        .value()

    if (reviews) {
        res.json(reviews)
    } else {
        next({
            code: 404,
            data: new Error('review is not found.')
        })
    }
};

exports.getReview = (req, res, next) => {
    const review = db
        .defaults({
            reviews: []
        })
        .get('reviews')
        .find({
            _id: req.params.id
        })
        .value()

    if (review) {
        res.json(review)
    } else {
        next({
            code: 404,
            data: new Error('review is not found.')
        })
    }
};

exports.createReview = (req, res, next) => {
    const review = {
        title: req.body.title,
        context: req.body.context,
        imgUrl: req.body.imgUrl,
        score: req.body.score,
        date: req.body.date,
    }

    const lastReview = db
        .defaults({
            reviews: []
        })
        .get('reviews')
        .last()
        .value()
    let nextId = 1;

    if (lastReview) {
        nextId = parseInt(lastReview._id, 10) + 1
    }

    review._id = "" + nextId;

    db.defaults({
            reviews: []
        })
        .get('reviews')
        .push(review)
        .write()

    res.status(201)
    res.json({
        message: "review has been created."
    })
};

exports.updateReview = (req, res, next) => {
    const review = db.get('reviews')
        .defaults({
            reviews: []
        })
        .find({
            _id: req.params.id
        })
        .value()

    if (!!req.body.title) {
        review.title = req.body.title;
    }
    if (!!req.body.context) {
        review.context = req.body.context;
    }
    if (!!req.body.imgUrl) {
        review.imgUrl = req.body.imgUrl;
    }
    if (!!req.body.score) {
        review.score = req.body.score;
    }
    if (!!req.body.date) {
        review.date = req.body.date;
    }
 
    db.get('reviews')
        .defaults({
            reviews: []
        })
        .find({
            _id: req.params.id
        })
        .assign(review)
        .write()
    res.json({
        message: "review has been updated."
    })
};


exports.deleteReview = (req, res, next) => {
    db.defaults({
            reviews: []
        })
        .get('reviews')
        .remove({
            _id: req.params.id
        })
        .write()
    res.json({
        message: "review has been updated."
    })
};