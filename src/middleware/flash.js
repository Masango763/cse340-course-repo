const flash = (req, res, next) => {
    if (!req.session.flashMessages) {
        req.session.flashMessages = {};
    }
    req.flash = (type, message) => {
        if (!req.session.flashMessages[type]) {
            req.session.flashMessages[type] = [];
        }
        req.session.flashMessages[type].push(message);
    };
    res.locals.messages = req.session.flashMessages;
    req.session.flashMessages = {};
    next();
};

export default flash;
