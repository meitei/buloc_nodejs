define([
  'underscore',
  'commons/helper',
  'views/pc/AbstractDialogView'
], function(_, Helper, AbstractDialogView) {
  var AttributeDialogView = AbstractDialogView.extend({
    el: '#dialog_attribute',
    render: function() {
      console.debug('AttributeDialogView#render');
      // setting of choices.
      var items = {1: 'string', 2: 'integer', 3: 'binary'};
      // var sel_options = window.JST['select']({items: items});
      // console.debug(sel_options);
      // var helper = new Helper();
      // data_type list.
      this.helper.createSelect(this, 'select#data_type', items);
      // var select = this.$('select#data_type');
      // select.empty();
      // $.each(items, function(id, value){
      //   var option = $('<option>').html(value).val(id);
      //   select.append(option);
      // });
    }    
  });
  return AttributeDialogView;
});
