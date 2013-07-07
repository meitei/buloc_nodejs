/*
 * serializeForm
 * https://github.com/danheberden/serializeForm
 *
 * Copyright (c) 2012 Dan Heberden
 * Licensed under the MIT, GPL licenses.
 */
(function( $ ){
  $.fn.serializeForm = function() {

    // don't do anything if we didn't get any elements
    if ( this.length < 1) { 
      return false; 
    }

    var data = {};
    var lookup = data; //current reference of data
    // var selector = ':input[type!="checkbox"][type!="radio"], input:checked, span';
    var selector = ':input, span';
    var parse = function() {

      // console.debug(this);
      // console.debug(this.name);
      // console.debug(this.id);
      // data[a][b] becomes [ data, a, b ]
      // [modified] this.name -> this.id
      var named = this.id.replace(/\[([^\]]+)?\]/g, ',$1').split(',');
      var cap = named.length - 1;
      var $el = $( this );

      // Ensure that only elements with valid `name` properties will be serialized
      if ( named[ 0 ] ) {
        for ( var i = 0; i < cap; i++ ) {
          // move down the tree - create objects or array if necessary
          lookup = lookup[ named[i] ] = lookup[ named[i] ] ||
            ( named[ i + 1 ] === "" ? [] : {} );
        }

        // at the end, push or assign the value
        var valList = ['INPUT','SELECT','TEXTAREA'];
        var type = $el.attr('type');
        var value = null;
        if (type === 'checkbox') {
          value = ($el.is(':checked')) ? parseInt($el.val(), 10) : 0;
        } else {
          value = _.contains(valList, $el[0].tagName) ? $el.val() : $el.html();
        }
        console.debug("value(" + $el[0].tagName + ") = > " + value);
        // if ( lookup.length !==  undefined ) {
        if ( $.isArray(lookup) ) {
          lookup.push( value );
        }else {
          lookup[ named[ cap ] ]  = value;
        }

        // assign the reference back to root
        lookup = data;
      }
    };

    // first, check for elements passed into this function
    this.filter( selector ).each( parse );

    // then parse possible child elements
    this.find( selector ).each( parse );

    // return data
    return data;
  };
}( jQuery ));
