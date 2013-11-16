window.App = Ember.Application.create();

App.Router.map ->


App.IndexRoute = Ember.Route.extend(
  model: ->
    return ['red','blue', 'green']
)