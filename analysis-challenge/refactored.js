

//Enables users to invite other users to their personal shops
//Req and res are express request and response objects

exports.inviteUser = function(req, res) {
  var invitationBody = req.body;
  var shopId = req.params.shopId;
  var authUrl = 'https://url.to.auth.system.com/invitation';

  //Post request to specified invitaton url
  superagent
    .post(authUrl)    
    //Specifying content type
    .set('Content-Type', 'application/json')
    .send(invitationBody)
    
    //Using promise to catch errors
    .then((invitationResponse) => {
      
      //Checks if new record has been created and calls updateUser function
      if (invitationResponse.status === 201) {
        
        updateUser(
          invitationBody.email,
          invitationResponse.body.authId,
          (err, createdUser) => {
            
            Shop.findById(shopId).exec((err, shop) => {
              if (err || !shop) {
                return res.status(500).send(err || {message: 'No shop found'});
              } else {
                updateShop(
                  shop,
                  createdUser,
                  invitationResponse.body.invitationId
                );
              }
            });
          }
        );
        
      } else if (invitationResponse.status === 200) {
        //Checks if user has already been invited to the shop
        res.status(400).json({
          error: true,
          message: 'User already invited to this shop',
        });
        return;
        
      res.json(invitationResponse);
    });
    
    //Error handling
    .catch((err) => {
      res.status(400).json({
        error: true,
        message: 'Something went wrong',
      });
      return;
    })
};

updateUser(email, authId, callback) => {
  
  //Checks that callback is a function
  if (typeof callback !== 'function') {
    return new Error('Callback must be a function');
  }
  
  //Updates user
  User.findOneAndUpdate(
    {
      authId: authId,
    },
    {
      authId: authId,
      email: email,
    },
    {
      upsert: true,
      new: true,
    },
    callback
  );
}

//Adds user id to shop.users and shop.invitations arrays
updateShop(shop, user, invitationId) => {
  
  //Changing the verification whether invitationId is in invitations array to be more precise.
  if (shop.invitations.indexOf(invitationId === -1)) {
    shop.invitations.push(invitationId);
  }
  if (shop.users.indexOf(user._id) === -1) {
    shop.users.push(user);
  }
  shop.save();
}
