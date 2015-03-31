function get_elapsed_time_string(total_seconds) {
      function pretty_time_string(num) {
        return ( num < 10 ? "0" : "" ) + num;
      }

      var hours = Math.floor(total_seconds / 3600);
      total_seconds = total_seconds % 3600;

      var minutes = Math.floor(total_seconds / 60);
      total_seconds = total_seconds % 60;

      var seconds = Math.floor(total_seconds);

      // Pad the minutes and seconds with leading zeros, if required
      hours = pretty_time_string(hours);
      minutes = pretty_time_string(minutes);
      seconds = pretty_time_string(seconds);

      // Compose the string for display
      var currentTimeString = hours + ":" + minutes + ":" + seconds;

      return currentTimeString;
    }
var timer;

jQuery(function($) {
    var orderId = $('#box_header').data('orderid');
    function myStopFunction() {
        clearInterval(timer);
    }

    $('#displayName').click(function() {
        $('body').css('overflow', 'hidden');
        $('.nameDisplay').fadeIn();
    });

    $('.nameDisplay').click(function() {
        $('body').css('overflow', 'visible');
        $('.nameDisplay').fadeOut();
    });

    var start = $('#startTime');
    var stopt = $('#stopTime');
    elapsed_seconds = $('#box_header').data('seconds');
    $('#startTime').bind('click', function() {
        $(this).hide();
        stopt.fadeIn();
        console.log(elapsed_seconds);
        timer = setInterval(function() {
          elapsed_seconds = elapsed_seconds + 1;
          $('#box_header').text(get_elapsed_time_string(elapsed_seconds));
        }, 1000);
        $.post( "http://"+window.location.host + "/order/"+orderId, { status: 'in progress'} );
    });


    $('.ec-complete li button').click(function() {
        theid = $(this).attr('id');
        var status;
        if(theid == 'didnotshow') {
            status = 'did not show up';
        } else {
            status = 'delivered';
        }
        $('#stopTime').hide();
        $('#startTime').fadeIn();
        myStopFunction();
        console.log(window.location.host + orderId);
        $.post( "http://"+window.location.host + "/order/"+orderId, { timelogged: elapsed_seconds, status: status} );
    });


    $('select.order-rate').change(function() {
        orderId = $(this).data('orderid');
        rate = $(this).val();
       $.post( "http://"+window.location.host + "/order/"+orderId, {ratetype: rate} );
    });

    $('#saveMuch').click(function() {
        var invoiceid = $(this).data('invoiceid');
        var content = $('.snapshot-save').html();
        $(this).text('updating...')
        $.post( "http://"+window.location.host + "/invoice/"+invoiceid, {snapshot: content} )
        .done(function() {
            $('#saveMuch').text('Update');
        });
    });

    $('#resetMuch').click(function() {
        var invoiceid = $(this).data('invoiceid');
        $(this).text('reseting...')
        $.post( "http://"+window.location.host + "/invoice/"+invoiceid, {snapshot: ''} )
        .done(function() {
            location.reload();
        });
    });

    $('#printMuch').click(function() {
         window.print();
    });

    $('#clientInvoice').find('.contedit').attr('contenteditable', false);

    if($('#checkbox-validate')){
        console.log($('#checkbox-validate').find('.ckbox').length);
        $('.ckbox input[type="checkbox"][name="orders"]').change(function () {
            if (this.checked) {
              $(this).attr('data-pushed', 'pushed');
              $('#geninvsub').attr('disabled', false);
            } else {
              $(this).attr('data-pushed', 'notpushed');
              var pshd = $('#checkbox-validate').find('.ckbox input[data-pushed="pushed"][name="orders"]').length;
              if(pshd == 0) {
                $('#geninvsub').attr('disabled', true);
              }
            }
        });
    }
});