let villeChoisie;//variable goobale
//est ce que la fonction geolocation est disponible dans le navigateur ?
if ('geolocation' in navigator) {
  //on cherche les coordonné de l'utilisateur 
  navigator.geolocation.watchPosition((position) => {
    //watch permet de réactualiser la temperature(success, error , options)
    // console.log(position.coords.latitude);
    // console.log(position.coords.longitude);
    //nous avons la localisation de notre utilisateur
    //unerequete ajax qui appele l'api avec les coordonnées géographiques
    const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
  console.log(url);
    let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
    requete.open('GET', url); // Nous récupérons juste des données
    requete.responseType = 'json'; // Nous attendons du JSON
    requete.send(); // Nous envoyons notre requête

    // Dès qu'on reçoit une réponse, cette fonction est executée
    requete.onload = function () {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let reponse = requete.response;
          // console.log(reponse);
          let temperature = reponse.main.temp;
          let ville = reponse.name;
          // console.log(temperature);
          document.querySelector('#temperature_label').textContent = temperature;
          document.querySelector('#ville').textContent = ville;
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }


  }, erreur, options);//si l'utilisateur a desacativé la géolocalisation de son navigateur on affiche une ville par default(on creer un fonction erreur)
  //on rajoute une option pour affiner 
}
else {
  villeChoisie = "Brest";//sinon on choisi une ville par défaut
  recevoirTemperature(villeChoisie);
}
var options = {//objet littreal 
  enableHightAccuracy:true //augmente la précision de la géolocalisation
}


let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
  villeChoisie = prompt('Quelle ville souhaitez-vous voir ?');
  recevoirTemperature(villeChoisie);
});

function erreur(){
  villeChoisie="Brest";//la fonction affichera paris par default
  recevoirTemperature(villeChoisie);
}

function recevoirTemperature(ville) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=0e81e5ba3934101e44c241eb5e313808&units=metric';
 
  let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
  requete.open('GET', url); // Nous récupérons juste des données
  requete.responseType = 'json'; // Nous attendons du JSON
  requete.send(); // Nous envoyons notre requête

  // Dès qu'on reçoit une réponse, cette fonction est executée
  requete.onload = function () {
    if (requete.readyState === XMLHttpRequest.DONE) {
      if (requete.status === 200) {
        let reponse = requete.response;
        // console.log(reponse);
        let temperature = reponse.main.temp;
        let ville = reponse.name;
        // console.log(temperature);
        document.querySelector('#temperature_label').textContent = temperature;
        document.querySelector('#ville').textContent = ville;
      }
      else {
        alert('Un problème est intervenu, merci de revenir plus tard.');
      }
    }
  }
}