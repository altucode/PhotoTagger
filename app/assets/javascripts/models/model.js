(function() {
  if (typeof PT === "undefined") {
    window.PT = {};
  }

  var Model = PT.Model = function(attributes) {
    if (attributes[this.className()]) {
      attributes = attributes[this.className()];
    }

    this.attributes = _.extend({}, attributes);
  };

  Model.prototype.get = function(attr) {
    return this.attributes[attr];
  }

  Model.prototype.set = function(attr, val) {
    return this.attributes[attr] = val;
  };

  Model.prototype.className = function() {
    return this.constructor.name.toLowerCase();
  }

  Model.prototype.create = function(callback) {
    if (this.get('id')) {
      return;
    } else {
      var that = this;
      var data = {};
      data[this.className()] = this.attributes;

      $.ajax({
        url: this.constructor.urlRoot,
        type: "POST",
        data: data,
        success: function(obj) {
          _.extend(that.attributes, obj);
          that.constructor.all.push(that);
          callback(obj);
          that.constructor.trigger('add');
        }
      });
    }
  }

  Model.prototype.save = function(callback) {
    if (this.get('id')) {
      var that = this;
      var data = {};
      data[this.className()] = this.attributes;

      $.ajax({
        url: this.constructor.urlRoot,
        type: "PATCH",
        data: data,
        success: function(obj) {
          _.extend(that.attributes, obj);
          callback(obj);
        }
      });
    } else {
      this.create(callback);
    }
  }

  Model.on = function (eventType, callback) {
    if (!this._events[eventType]) {
      this._events[eventType] = [];
    }
    this._events[eventType].push(callback);
  }

  Model.trigger = function (eventType) {
    if (this._events[eventType]) {
      for (var i = 0; i < this._events[eventType].length; i++) {
        this._events[eventType][i]();
      }
    }
  }

  Model.extendTo = function(Class, url) {
    Class.prototype = Object.create(Model.prototype);
    Class.prototype.constructor = Class;
    Class.urlRoot = url;
    Class._events = {};
    Class.on = Model.on;
    Class.trigger = Model.trigger;
  }


})();