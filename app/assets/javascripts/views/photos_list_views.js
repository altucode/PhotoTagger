function PhotosListView() {
  this.$el = $("<div>");

  PT.Photo.on("add", this.render.bind(this));
}

PhotosListView.prototype.render = function() {
  // while (this.$el.firstChild) {
  //     this.$el.removeChild(this.$el.firstChild);
  // }
  this.$el.empty();

  var $ul = $("<ul>");

  PT.Photo.all.forEach(function(photo) {
    var li = "<li>" + photo.get("title") + "</li>";
    $ul.append(li);
  });

  this.$el.append($ul);

  return this;
};