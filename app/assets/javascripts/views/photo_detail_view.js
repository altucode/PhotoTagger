function PhotoDetailView(photo) {
  this.$el = $("<div>");
  this.photo = photo;
}

PhotoDetailView.prototype.render = function() {
  this.$el.empty();
  console.log(this.photo);
  var template = JST["photo_detail"]( { photo: this.photo });
  console.log(template);
  this.$el.append(template);
  console.log(this.$el);

  return this;
}