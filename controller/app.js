var config = {
apiKey: "AIzaSyATRVUOy2ml3p0Yk2tCoaRH4TH4ebt3v8o",
authDomain: "aulavirtual-f5514.firebaseapp.com",
databaseURL: "https://aulavirtual-f5514.firebaseio.com",
projectId: "aulavirtual-f5514",
storageBucket: "aulavirtual-f5514.appspot.com",
messagingSenderId: "704830864328"
};
firebase.initializeApp(config);

firebase.auth().createUserWithEmailAndPassword("joaosf96@gmail.com", "abc123").catch(function(error) {
    console.log(error);
  var errorCode = error.code;
  var errorMessage = error.message;
});

firebase.auth().signInWithEmailAndPassword("joaosf96@gmail.com", "abc123").catch(function(error) {
  console.log(error)
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().signOut().then(function() {
  console.log("Delogou com sucesso!");
}).catch(function(error) {
  console.log("Não deslogou.");
});

firebase.database().ref('Categorias').on('value', function (snapshot) {
    var table = document.getElementById("myTable").getElementsByTagName("tbody")[0];

    var tableRows = table.getElementsByTagName('tr');
    var rowCount = tableRows.length;

    for (var x=rowCount-1; x>=0; x--) {
       table.removeChild(tableRows[x]);
    }

    snapshot.forEach(function(childSnapshot) {
        var row = table.insertRow(table.rows.length);
        row.insertCell(0).innerText = childSnapshot.key;
        row.insertCell(1).innerText = childSnapshot.val();
    });


    function onRowClick(tableId, callback) {
        var table = document.getElementById(tableId), rows = table.getElementsByTagName("tr");
        for (var i = 0; i < rows.length; i++) {
            table.rows[i].onclick = function (row) {
                return function () {
                    callback(row);
                };
            }(table.rows[i]);
        }
    };

    onRowClick("myTable", function (row){
        var rowsValue = row.getElementsByTagName("td"),
                value = [];
        for (var i = 0; i < rowsValue.length; i++) {
            value.push(rowsValue[i].innerHTML);
        }
        document.getElementById("campoDescricao").value = value[0];
        document.getElementById("campoAtivo").checked = (/true/i).test(value[1]);
    });
});

function salvar() {
    campoDescricao = document.getElementById("campoDescricao").value;
    campoAtivo = document.getElementById("campoAtivo").checked;
    firebase.database().ref('Categorias/' + campoDescricao).set(campoAtivo);
}
