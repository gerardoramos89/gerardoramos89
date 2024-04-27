let localStream;
let remoteStream;
let peer;

// Función para iniciar el chat
function startChat() {
    // Obtener el idioma seleccionado
    const language = document.getElementById("languageSelect").value;
    // Aquí puedes realizar acciones adicionales según el idioma seleccionado
    
    // Lógica para obtener acceso a la cámara del usuario
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            localStream = stream;
            const localVideo = document.getElementById("localVideo");
            localVideo.srcObject = stream;
            
            // Iniciar PeerJS
            startPeer();
        })
        .catch(function(error) {
            console.error('Error al acceder a la cámara: ', error);
        });
}

// Función para iniciar PeerJS
function startPeer() {
    // Crear un nuevo objeto Peer
    peer = new Peer();

    // Manejar la conexión entrante
    peer.on('call', function(call) {
        // Contestar la llamada y enviar nuestro stream local
        call.answer(localStream);
        // Cuando recibamos el stream remoto, mostrarlo
        call.on('stream', function(remoteStream) {
            showRemoteVideo(remoteStream);
        });
    });

    // Mostrar el ID único del usuario
    peer.on('open', function(id) {
        const userIdSpan = document.getElementById("userId");
        userIdSpan.textContent = id;
    });

    // Manejar errores
    peer.on('error', function(err) {
        console.error('Error de PeerJS:', err);
    });
}

// Función para llamar a otro usuario
function callUser() {
    const remoteUserId = document.getElementById("remoteUserId").value;
    // Establecer una llamada a otro usuario con nuestro stream local
    const call = peer.call(remoteUserId, localStream);
    // Cuando recibamos el stream remoto, mostrarlo
    call.on('stream', function(remoteStream) {
        showRemoteVideo(remoteStream);
    });
}

// Función para mostrar el video del otro usuario
function showRemoteVideo(stream) {
    remoteStream = stream;
    const remoteVideo = document.getElementById("remoteVideo");
    remoteVideo.srcObject = stream;
}
