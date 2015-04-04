import Ember from "ember";

export default Ember.Route.extend({
  beforeModel: function(){
    var sessionUser = this.get("session.currentUser");
    if(sessionUser && sessionUser.get('isNewAccount')) {
      this.transitionTo('profile');
    }
  }, 
  model: function(){
    return Ember.RSVP.hash({
      sessionUser: this.get("session.currentUser"),
      users: this.store.filter('user', { // live array
        orderBy: 'first'
      }, function () { return true; })
    });
  },
  setupController: function(controller, hash){
    controller.set('sessionUser', hash.sessionUser);
    
    var users = hash.users;
    controller.set('users', users);
  }
});
