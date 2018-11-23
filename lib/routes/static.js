import users from '../controllers/users-controller'

module.exports = (app, express, router, path) => {

  app.route('/')
    .get((req, res) => {
      res.json({
        'status': "worked"
      })
    })

    /**
     * @api {get} /users/ Request Users information
     * @apiName GetUser
     * @apiGroup User
     *
     *
     * @apiSuccess {String} _update  last update date.
     * @apiSuccess {String} email  email of the User.
     * @apiSuccess {String} password  password of the User.
     * @apiSuccess {String} company  company of the User.
     * @apiSuccess {String} firstName  First name of the User.
     * @apiSuccess {String} secondName Second name of the User.
     * @apiSuccess {String} lastname  Lastname of the User.
     * @apiError Error if error send 400 or other status http.
     */
     //simple default information for documentation


  app.route('/users')
    .get(users.get_users)
    .post(users.add_user)
    .delete(users.delete_user)

  app.route('/users/:id')
    .delete(users.delete_user)

  app.route('/session')
    .post(users.session_user)

}
