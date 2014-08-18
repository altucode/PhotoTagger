(function() {
  if (typeof PT === "undefined") {
    window.PT = {};
  }

  var Photo = PT.Photo = function Photo(attributes) {
    PT.Model.call(this, attributes);
  };

  Photo.all = [];

  PT.Model.extendTo(Photo, 'api/photos/');

  Photo.fetchByUserID = function(id, callback) {
    $.ajax({
      url: "api/users/" + id + "/photos",
      type: "GET",
      dataType: "json",
      success: function(obj) {
        obj = obj.map(function(photo) {
          var newPhoto = new Photo(photo);
          Photo.all.unshift(newPhoto);
          return newPhoto;
        });

        callback(obj);
      }
    });
  }

})();