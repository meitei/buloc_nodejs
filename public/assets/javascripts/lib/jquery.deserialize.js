/**
 * jQuery deserialize plugin
 * public domain
 *
 * 使用例:
 * $('form').deserialize('checkbox[]=1&checkbox[]=2&checkbox[]=3');
 * $('form').deserialize(location.search);
 */
(function($){
  $.fn.deserialize = function(model){
    // var opts = $.extend({}, $.fn.deserialize.defaults, options);
    var data = model.attributes;
  
    return this.each(function(){
      var self = this;
      // var parts = s.replace(/^\?/, '').split('&');
      // var data = {};

      // $.each(parts, function(i, part){
      //   var pair = part.split('=');
      //   var name = decodeURIComponent(pair[0]);
      //   var value = decodeURIComponent(pair[1]);
        
      //   if (opts.filter && !opts.filter.call(self, name, value)) return;

      //   if (!(name in data)) data[name] = [];
      //   data[name].push(value);
      // });
      
      $.each(data, function(name, value){
        if((typeof value) === 'number') value = String(value);
        // var str = model.name + '[' + name + ']';
        // console.debug(name + "->" + value);
        var element = $('[id="' + name + '"]', self);
        if(element.length > 0) {
          // console.debug("name:"+name)
          // console.debug(element);
          var valList = ['INPUT','SELECT','TEXTAREA'];
          if(_.contains(valList, element[0].tagName)) {
            // console.debug('type => ' + element.attr('type'));
            // console.debug('element.val() => ' + element.val());
            // console.debug('value => ' + value + "(" + (typeof value) + ")" );
            if (element.attr('type') === 'checkbox') {
              element.attr('checked', (element.val() === value));
            } else {
              element.val(value);              
            }
          } else {
            element.html(value);
          }
        }
      });
    });
  };
  // $.fn.deserialize.defaults = {
  //   filter: function(name, value){
  //     if ($('[name="' + name + '"]:input', this).is(':submit')) return false;
  //     return true;
  //   }
  // };
})(jQuery);