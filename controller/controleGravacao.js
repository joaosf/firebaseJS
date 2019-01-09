
  
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBkWiEdFSXp3X1DCjJMIuEYqtwyubnQWQM",
      authDomain: "cadastro-bumper-gm.firebaseapp.com",
      databaseURL: "https://cadastro-bumper-gm.firebaseio.com",
      projectId: "cadastro-bumper-gm",
      storageBucket: "cadastro-bumper-gm.appspot.com",
      messagingSenderId: "595010236952"
    };
    firebase.initializeApp(config);

  

    function aoCarregar(){
    //firebase.database().ref('bumpers/'+ "TraseiroOnixJoy_cinza" + '/estoque').on('value', function(snapshot){
     // estoqueAtual = parseInt(snapshot.val());
    ///  
   // }); 
  }

 


function salvarBumper() {
  
var quantidade = 1;
quantidade = parseInt($("#quantidade").val());
var cores = $("#cores").val();
var area = $("#areas").val();
var modelo = $("#modelo").val();
var areas =  $("#areas").val();
var bumperAtualizar = modelo + '_' + cores;
var estoqueNovo = "";
var estoqueAntigo = ""; 
var estoqueAtual = "" ;
firebase.database().ref('bumpers/'+ bumperAtualizar + '/estoque').once('value', function(snapshot){
  estoqueAtual = parseInt(snapshot.val());
 }).then(function() {estoqueAntigo = estoqueAtual;
  if(estoqueAtual == 0){
    window.alert("Tente novamente");
    console.log("Tente novamente");
  }
  else{
  if(areas == "Entrada"){
  estoqueAtual += quantidade;
  }
  else{
    estoqueAtual -= quantidade;
  }                     
  var updates = {};
  estoqueNovo = estoqueAtual;
  updates['/bumpers/' + bumperAtualizar + "/estoque"] = estoqueAtual;
  firebase.database().ref().update(updates);
  salvaTransacao(estoqueAntigo, estoqueAtual, areas);
}});
//estoqueAtual = atualizaEstoque(bumperAtualizar);


          }
  
function mostrarFotoBumper(bumperSelecionado){
  var img = document.getElementById('imgbumper');
  img.src = 'imagens/' + bumperSelecionado + '.png' ;

}

function trocaTextoEntradaSaida(textoSelecionado){
  var txt = document.getElementById('TextoEntradaSaida');
  txt.innerText = textoSelecionado ;

}

function salvaTransacao(estoqueAntigo, estoqueNovo, areas){
  now = new Date;
  var mes = now.getMonth()  + 1;
    firebase.database().ref('movimentacao_estoque/').push({
      estoqueAntigo: estoqueAntigo,
      estoqueNovo: estoqueNovo,
      areas : areas,
      dataHora: now.getDate() + "/" + mes + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()

    });
  }

  function atualizaEstoque(bumperAtualizar){
    var estoqueAtual = "" ;
    firebase.database().ref('bumpers/'+ bumperAtualizar + '/estoque').on('value', function(snapshot){
     estoqueAtual = parseInt(snapshot.val());
    }); 
    return estoqueAtual;
  }