const firebaseConfig = {
    apiKey: "AIzaSyDe39HU3jUUIO26ctfF7boFRHgcqBd6SiM",
    authDomain: "fir-29d89.firebaseapp.com",
    projectId: "fir-29d89",
    storageBucket: "fir-29d89.appspot.com",
    messagingSenderId: "298227296407",
    appId: "1:298227296407:web:f9dae0cc7ddd6b9c65e1d2"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  let nombre = document.getElementById("name");
let cel = document.getElementById("cellphone");
let save_btn = document.getElementById("save-btn");
let lista = document.getElementById("lista");
save_btn.addEventListener("click", () => {
  let data = {
    nombre: nombre.value,
    celular: cel.value,
  };
  save_data_firebase(data);
});

const save_data_firebase = (d) => {
  db.collection("contactos")
    .add(d)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      get_data_firebase();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

let contactos_arr = [];

const get_data_firebase = () => {
  contactos_arr = [];
  db.collection("contactos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        contactos_arr.push(doc.data());
      });
      buildList();
    });
};

const buildList = () => {
  lista.innerHTML = "";
  contactos_arr.forEach((e) => {
    lista.insertAdjacentHTML(
      "beforeend",
      `
     <li>${e.nombre} - ${e.celular}</li>
    `
    );
  });
};

get_data_firebase();