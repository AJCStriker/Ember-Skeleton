(function() {
  var App;

  App = Ember.Application.create();

  App.Router.map(function() {
    return print('test');
  });

  App.IndexRoute = Ember.Route.extend({
    model: function() {
      return ['red', 'blue', 'green'];
    }
  });

}).call(this);
