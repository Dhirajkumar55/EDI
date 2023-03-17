export default function isLoggedIn(req, res, next){
    if (req.user) {
        next();
    } else {
        res.send({status: false, privilege: -1});
    }
}