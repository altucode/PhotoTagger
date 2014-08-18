function PhotoFormView() {
  this.$el = $("<div>");
  this.$el.on("submit", "form", this.submit.bind(this));
}

PhotoFormView.prototype.render = function() {
  var jstForm = JST["photo_form"]();
  this.$el.append(jstForm);

  return this;
};

PhotoFormView.prototype.submit = function(event) {
  event.preventDefault();
  var photo = new PT.Photo($("form").serializeJSON());
  photo.create(function() {
    $(".photo_form").val("");
  });
}