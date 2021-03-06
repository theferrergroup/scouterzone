$(document).on("pageshow","#inicio",function(event,ui){
    
    $('#tUsuario').val(localStorage.getItem("usuario"));
    $('#tClave').val(localStorage.getItem("clave"));
    
    $('#btNuevo').click(function(){
        localStorage.setItem("idUsuario","");
        $.mobile.changePage("configcuenta.html",{ transition : "fade" });
    });
    
    $('#btnIngresarUser').click(function(){
        var sUsuario = $('#tUsuario').val();
        var sClave = $('#tClave').val();

        if(sUsuario!='' && sClave!=''){
            $.ajax({
                data:{
                    sUsuarioPhp:sUsuario, sClavePhp:sClave, Mandato:'IngresarCuenta'
                },
                url:'http://condominioagil.com/scouterzone/appmovil/ajaxService.php',
                method:'POST',
                beforeSend:function(){
                    $('.cargando').fadeIn();
                },success:function(respuesta){
                    var aUsuario = JSON.parse(respuesta);
                    var sTipo=0;
                    var sIdentificador=0;
                    $.each( aUsuario, function( i, value ) {
                        sIdentificador=value['IDUsuario'];
                        localStorage.setItem("idUsuario",sIdentificador);
                        sTipo=value['IDCategoria'];
                        localStorage.setItem("iEstatus",sTipo);
                    });
                    if(sTipo==100){
                        $.mobile.changePage("paneladmin.html",{ transition : "fade" });
                    }else{
                        localStorage.setItem("tipoUsuario",sTipo);
                        localStorage.setItem("usuario",sUsuario);
                        localStorage.setItem("clave", sClave);
                        switch(sTipo){
                            case "1":
                                $.mobile.changePage("prospect.html",{ transition : "fade" });  //Player
                                break;
                            case "2":
                                $.mobile.changePage("finder.html",{ transition : "fade" });  //Scout
                                break;
                            case "3":
                                $.mobile.changePage("staff.html",{ transition : "fade" });  //Trainer
                                break;
                            default:
                                alert("Wrong Data");
                        }
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        };
    });
});