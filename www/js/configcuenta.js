$(document).on("pageshow","#configcuenta",function(event, ui){
    var sIdentificador=localStorage.getItem("idUsuario");
    var sEstatus=localStorage.getItem("iEstatus");

    $.ajax({
        data:{
            sCodigoWebPhp:sIdentificador,Mandato:'PerfilUsuario'
        },
        url:'http://condominioagil.com/scouterzone/appmovil/ajaxService.php',
        method:'POST',
        beforeSend:function(){
            $('.cargando').fadeIn();
        },success:function(respuesta){
            var aPerfil = JSON.parse(respuesta);
            $.each( aPerfil, function( i, value ) {
                $("#tUsuario").val(value["Nombre"]);
                $("#tEmail").val(value["Email"]);
                $("#tClave1").val(value["Password"]);
            });
        },error:function(jqXHR, textStatus, errorThrown){
            ajax_error(jqXHR, textStatus, errorThrown,true);
        }
    });


    $("#btModificar").click(function(){
        var sUsuario=document.formContacto.tUsuario.value;
        var sClave1=document.formContacto.tClave1.value;
        var sClave2=document.formContacto.tClave2.value;
        var sEmail=document.formContacto.tEmail.value;
        var sTipo=document.formContacto.slcTipo.value;
        var sCategoria=document.formContacto.slcCategory.value;
        if (sClave1==sClave2){
            $("#btModificar").html("<span class='icon-hour-glass'></span> Wait for answer");
            $("#btModificar").css("background-color","orange");
            $.ajax({
                data:{
                    sCodigoWebPhp:sIdentificador, sEmailPhp:sEmail, sUsuarioPhp:sUsuario, sClavePhp:sClave1, sTipoPhp:sTipo, sCategoriaPhp:sCategoria, Mandato:'RegistrarCuenta'
                },
                url:'http://condominioagil.com/scouterzone/appmovil/ajaxService.php',
                method:'POST',
                beforeSend:function(){
                    $('.cargando').fadeIn();
                },success:function(respuesta){  
                    alert(respuesta);
                    if(respuesta=="A+++"){
                        $("#btModificar").html('<span class="icon-checkmark"></span> Update <span class="icon-happy"></span>');
                        $("#btModificar").css("background-color","green");
                    }else{
                        alert(respuesta);
                        $("#btModificar").html("<span class='icon-sad'></span> try again");
                        $("#btModificar").css("background-color","red");
                    }
                },error:function(jqXHR, textStatus, errorThrown){
                    ajax_error(jqXHR, textStatus, errorThrown,true);
                }
            });
        }else{
            alert("Wrong Data :(");
        }
    });
    $("#btRubi").click(function(){
        $.mobile.changePage("perfilrubi.html",{ transition : "fade" });
    });
    $("#btZafiro").click(function(){
        $.mobile.changePage("perfilzafiro.html",{ transition : "fade" });
    });

   /* $("#liConfigAtras").click(function(){
        $.mobile.changePage("index.html",{ transition : "fade" });
        /*var sExiste=localStorage.getItem("idUsuario");
        var sTipo=localStorage.getItem("tipoUsuario");
        if(parseInt(sExiste,10)>0){

            switch(sTipo){
                case "1":
                    $.mobile.changePage("perfil.html",{ transition : "fade" });
                    break;
                case "2":
                    $.mobile.changePage("finder.html",{ transition : "fade" });
                    break;
                case "3":
                    $.mobile.changePage("staff.html",{ transition : "fade" });
                    break;
                default:
                    alert("Wrong Data");
            }
        }else{
            $.mobile.changePage("inicio.html",{ transition : "fade" });
        }  
    });*/
});
