exports.paginate = async (req, res, next) => {
    const { page } = req.query

    if (page) {
        req.page = page
    } else {
        req.page = 0
    }

    delete req.query.page

    next()
}
