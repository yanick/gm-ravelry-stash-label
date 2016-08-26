import jquery from 'jquery';
import kjua from 'kjua';

    let $label = jquery('<a href="#" />');
    $label
     .addClass('button')
     .append( '<span>print label</span>');
    jquery('#stash_owner_button_set div.c_d').before($label);
  $label.on( 'click', show_label);

function show_label() {
 console.log("yo!"); 
 let info = gather_info();
  let template = `<div class='label_strip'>
                    <div style='display: flex; flex-direction: row;'>
                        <div class='label_info' style='text-align: left'>
                        <div id='stash_name'>${ info.stash.name }</div>
                        <div>${ info.yarn.yarn_name } ${ info.yarn.yarn_company }</div>
                        <div>${ info.yarn.fiber_and_weight }, ${ info.yarn.fibers }</div> 
                        <div>${ info.yarn.yardage }</div> 
                        <div>colorway: ${ info.stash.colorway }, dye lot: ${ info.stash.dye_lot }</div> 
                    </div>
                    <div id='qrcode' />
                </div>`;

  console.log(template);
   
  jquery('body').html( template )
   .attr('class', '')
  .append( "<style>@media print { @page { orientation: landscape } }</style>" ) 
  ;
  
  jquery('#qrcode').qrcode({
    text: window.location.toString(),
    size: 100
  });
  
  jquery('.label_strip').css({ 
    'padding-left': '25%',
    'margin-top': '3cm',
    'border': '1px solid black',
    'margin': '0.3cm',
    'padding-top': '0.3cm',
    'padding-bottom': '0.3cm'
  });
  
  jquery('.label_info').css({
    'margin-right': '0.5cm'
  })
  
  jquery('#stash_name').css({
    'font-size': 'large',
    'font-weight': 'bold'
  })
  
}

function gather_info() {
  var yarn_name =
      jquery('#content .heading h2').contents().map(function(){
        return this.nodeType == 3 ? this.nodeValue : undefined;
      }).get().join('');
  
  var fields = { "name": yarn_name };
  
    jquery('.core_item_inner .fields div.field').each(function(){
      console.log('hi');
      var l = jquery(this).children('label').text().toLowerCase().replace(/ /g,'_');
      var val = jquery(this).children('.value').html();
      fields[l] = val;
    });
  
    var yarn_info = {};
  
    jquery('#yarn_summary .yarn_summary .yarn_summary_content div' ).each(function(){
      var l = jquery(this).attr('class');
      var val = jquery(this).html();
      yarn_info[l] = val;
    });
  

  var info = { stash: fields, yarn: yarn_info };
  
  return info;
  
}

