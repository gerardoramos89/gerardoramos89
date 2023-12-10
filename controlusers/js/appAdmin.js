// Initial config
// This is not "real security", API Keys are
// able to authenticate users, anything else :D
const firebaseConfig = {
  apiKey: "AIzaSyCX8I5cz8h2xghGF_DpAGpmqvPPRndmT80",
  authDomain: "utilidades-1ef52.firebaseapp.com",
  projectId: "utilidades-1ef52",
  storageBucket: "utilidades-1ef52.appspot.com",
  messagingSenderId: "729836506449",
  appId: "1:729836506449:web:0cb053af97046bdd1e5770",
  measurementId: "G-YFN1MH6M8L"
};

firebase.initializeApp(firebaseConfig);


// Connect application with firebase
const form = document.forms['loginForm'];
firebase.auth().onAuthStateChanged(handleAuthState);


// Application defs
function handleAuthState(user) {
  if (user) {
    showPrivateInfo()
    return console.log('Conectado 🎉');
  }

  showLoginForm()
  return console.log('No habemus user 😭');
}

// Application Utils
function showPrivateInfo(user) {
  const btnLogout = document.getElementById('btnLogoutAdmin');
  btnLogout.addEventListener('click', signoutUser);
}

function showLoginForm() {
  var path = window.location.origin;
  window.location.href = path + '/controlusers/sign-in.html';
}

// Firebase defs
function createUser({ email, password }) {
  console.log('Creating user ' + email);

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('¡Creamos el user, bro! Huepaje!');
    })
    .catch(function (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('Ya existe el usuario');
        const soLogin = confirm(
          `Ya te habias registrado con este email, bro 😝.
          ¿Quieres iniciar sesión ✨?`
        );
        return !!soLogin ? loginUser({ email, password }) : alertTryAgain(error);;
      }

      return alertTryAgain(error);
    });
}

function loginUser({ email, password }) {
  console.log('Loging user ' + email);

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (user) {
      console.log('Credenciales correctas, brother, bienvenido.');
    })
    .catch(function (error) {
      console.log(error);
      alertTryAgain(error);
    });
}

function signoutUser() {
  alert("signoutUser")
  firebase.auth().signOut();
}

function cerrarSesion() {
  firebase.auth().signOut().then(() => {
    // Cierre de sesión exitoso
    console.log("Sesión cerrada correctamente.");
  }).catch((error) => {
    // Manejo de errores
    console.error("Error al cerrar sesión:", error);
  });
}

// General Utils
function alertTryAgain(error) {
  console.log(error);
  return alert('Error, intenta de nuevo ⛈');
}
