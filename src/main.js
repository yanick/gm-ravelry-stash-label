import jquery from 'jquery';
import kjua   from 'kjua';

jquery('<a href="#" />')
    .addClass('button')
    .append( '<span>&#9113; print label</span>')
    .on( 'click', show_label)
    .insertBefore('#stash_owner_button_set div.c_d');

function show_label() {
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

  jquery('body').html( template )
   .attr('class', '')
  .append( "<style>@media print { @page { orientation: landscape } }</style>" ) 
  ;
  
  document.querySelector('#qrcode').appendChild(
        kjua({
            text: window.location.toString(),
            size: 100,
            crisp: true
        })
    );
  
  jquery('.label_strip').css({ 
    'padding-left':   '25%',
    'margin-top':     '3cm',
    'border':         '1px solid black',
    'margin':         '0.3cm',
    'padding-top':    '0.3cm',
    'padding-bottom': '0.3cm'
  });
  
  jquery('.label_info').css({
    'margin-right': '0.5cm'
  })
  
  jquery('#stash_name').css({
    'font-size':   'large',
    'font-weight': 'bold'
  })
  
}

function gather_info() {
    let info = {};

    let stash = info.stash = {};

    stash.name = jquery('#content .heading h2').contents().map(function(){
        return this.nodeType == 3 ? this.nodeValue : undefined;
    }).get().join('');
  
    jquery('.core_item_inner .fields div.field').each(function(){
      stash[
          jquery(this).children('label').text().toLowerCase().replace(/ /g,'_')
      ] = jquery(this).children('.value').html();
    });
  
    let yarn = info.yarn = {};
  
    jquery('#yarn_summary .yarn_summary .yarn_summary_content div' ).each(function(){
      yarn[ jquery(this).attr('class') ] = jquery(this).html();
    });
  
  return info;
}

