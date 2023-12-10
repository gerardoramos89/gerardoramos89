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
form.addEventListener('submit', handleFormSubmit);


// Application defs
function handleAuthState(user) {
  if (user) {
    showPrivateInfo()
    return console.log('Habemus user 🎉');
  }

  showLoginForm()
  return console.log('No habemus user 😭');
}

function handleFormSubmit(event) {
  event.preventDefault();

  const email = form['email'].value;
  const password = form['password'].value;
  const isLoginOrSignup = form['isLoginOrSignup'].value;

  if (isLoginOrSignup === 'isLogin') {
    return loginUser({ email, password });
  }

  return createUser({ email, password });
}


// Application Utils
function showPrivateInfo(user) {
  const loginForm = document.getElementById('loginFormUI');
  loginForm.style.display = 'none';

  const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
  hiddenPrivateInfo.style.display = 'block';
  hiddenPrivateInfo.innerHTML = `
    <p><button id="btnLogout" class="btn bg-gradient-primary w-100 my-4 mb-2">Cerrar Sesion</button></p>
  `;

  const btnLogout = document.getElementById('btnLogout');
  btnLogout.addEventListener('click', signoutUser);
  var path = window.location.origin;
  window.location.href = path + '/admin/index.html';
}

function showLoginForm() {
  const loginForm = document.getElementById('loginFormUI');
  loginForm.style.display = 'block';

  const hiddenPrivateInfo = document.getElementById('hiddenPrivateInfo');
  hiddenPrivateInfo.style.display = 'block';
  hiddenPrivateInfo.innerHTML = `
    <p><h4 class="text-white font-weight-bolder text-center mt-2 mb-0">Iniciar Sesion</h4></p>
  `;
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
  firebase.auth().signOut();
}


// General Utils
function alertTryAgain(error) {
  console.log(error);
  return alert('Error, intenta de nuevo ⛈');
}
