App = Ember.Application.create();

App.Router.map ->
  print 'test'

App.IndexRoute = Ember.Route.extend(
  model: ->
    return ['red','blue', 'green']
)