document.addEventListener("DOMContentLoaded", function () {
    const socket = io();

    /* Chat */
    const msj = document.querySelector("#mensaje");
    const email = document.querySelector('#email');
    const envio = document.querySelector('#enviar-msg');
    const tipo = document.querySelector('#tipo');
    let mensajes = [];
    const chat = document.querySelector("#mailHidden").innerHTML;
    let hayUsuario = false;
    let hayMensajes = false;

    if(chat !== 'true'){ hayUsuario = true};

    socket.on("mensaje-inicial", (data) => {
        if (hayUsuario){
            const filtro = data.mensajes.filter(mensaje => mensaje.message.email == chat);
            if (filtro.length > 1){
                mensajes = filtro;
                hayMensajes = true;
            } else {
                $('#chat').html('No hay mensajes que correspondan al correo ingresado.')
            }
        }
        else {
            hayMensajes = true;
            mensajes = data.mensajes;    
        }
        if (hayMensajes){
            $('#chat').html('');    
            mensajes.forEach(e =>{
                $('#chat').append(
                    `<div class="mensaje">
                        <p class="mensaje-datos"><span class="mensaje-email">${e.message.email}</span> <span class="mensaje-fecha">${e.message.dateStr}</span></p>
                        <p class="mensaje-texto">${e.message.value}</p>
                    </div>`
                );
            });   
        }                 
    });

    // Recibo el mensajo del servidor y lo renderizo
    socket.on("actualizar-chat", (data) => {  
        console.log(hayUsuario)
        if (hayUsuario){  
            if (data.message.email == chat){
                mensajes.push(data);    
            }
        }
        else {
            mensajes.push(data);
        }
        $('#chat').html('');    
        mensajes.forEach(e =>{
            $('#chat').append(
                `<div class="mensaje">
                    <p class="mensaje-datos"><span class="mensaje-email">${e.message.email}</span> <span class="mensaje-fecha">${e.message.dateStr}</span></p>
                    <p class="mensaje-texto">${e.message.value}</p>
                </div>`
            );
        });   
    });

    //Envio el mensaje al servidor
    envio.addEventListener("click", (e) => {
        let date = new Date();
        let dateStr =
        ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
        ("00" + date.getDate()).slice(-2) + "/" +
        date.getFullYear() + " " +
        ("00" + date.getHours()).slice(-2) + ":" +
        ("00" + date.getMinutes()).slice(-2) + ":" +
        ("00" + date.getSeconds()).slice(-2);

        $(email).removeClass('required');
        if (email.value == '') {
            $(email).addClass('required');
        }else{
            socket.emit("mensaje-nuevo", { value: msj.value, email: email.value, tipo: tipo.value, dateStr });
            msj.value = "";
        }
    });
});
  
