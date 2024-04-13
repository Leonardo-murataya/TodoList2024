let btn = document.querySelector('.menu-btn');
let maximoNotas = 5;
var contadorNotas = 1;

function btnAñdir(){
  document.querySelector('#subMenu').innerHTML = `
  <div class="Sub-añadir">
  <label for="Lista">Titulo de su lista</label>
  <input type="text" id="Lista" required>

  <div class="Notas">
      <label for="Notas">Nota 1</label>
      <input type="text" id="mianNota" required>

      <button class="añadirNota" onclick="añadirNota()">Añadir</button>

          <div class="notas-añadidas" style="display: none;">
          
          </div>
      
  </div>
  <button class="guardar" type="submit" onclick="GuardarNota()">Crear</button>
  <button class="eliminar" onclick="CancelarList()">Cancelar</button>
</div>`
  contadorNotas = 1; 
}

function añadirNota() {
    if (contadorNotas >= maximoNotas) {
        alert("No puedes añadir más notas");
        return;
    }
    var notasAñadidas = document.querySelector(".notas-añadidas");
    var nuevaNota = document.createElement("input");
    var etiquetaNota = document.createElement("label");

    contadorNotas++;

    etiquetaNota.textContent = "Nota " + contadorNotas;
    nuevaNota.setAttribute("type", "text");
    notasAñadidas.appendChild(etiquetaNota);
    notasAñadidas.appendChild(nuevaNota);
    notasAñadidas.style.display = "block";
    
}

function CancelarList(){
  document.querySelector('#subMenu').innerHTML = '';
}

function GuardarNota(){
  let titulo = document.querySelector('#Lista').value;
  let nota = document.querySelector('#mianNota').value;
  let notasA = document.querySelectorAll('.notas-añadidas input'); 

  let lista = {
    titulo: titulo,
    nota: nota,
    notaAñadida: [] 
  }

  function notasBasicas(lista) {
    if (titulo.trim() === '') {
      alert('Por favor ingrese un título válido');
      return false;
    }
    if (nota.trim() === '') {
      alert('Por favor ingrese una nota válida');
      return false;
    }
    return true;
  }
  if (!notasBasicas(lista)) {
    return;
  }
  notasBasicas(lista);

  notasA.forEach(notaA => {
    lista.notaAñadida.push(notaA.value); 
  });

  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  listas.push(lista);
  localStorage.setItem('listas', JSON.stringify(listas));
  CancelarList();

  let listContainer = document.querySelector('.Tareas');
  let newList = document.createElement('div');
    newList.classList.add('lista');
    newList.innerHTML = `
    <h3>${titulo}</h3>
    <p>${nota}</p>
    ${lista.notaAñadida.map(notaA => `<p>${notaA}</p>`).join('')}
    <button class="btnnneliminar btnnn" onclick="eliminarLista('${titulo}')"><i class='bx bx-message-square-x'></i></button>
  `;
  listContainer.appendChild(newList);
}


window.onload = function() {
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  let listContainer = document.querySelector('.Tareas');

  listas.forEach(lista => {
    let newList = document.createElement('div');
    newList.classList.add('lista');
    newList.innerHTML = `
      <h3>${lista.titulo}</h3>
      <p>${lista.nota}</p>
      ${lista.notaAñadida.map(notaA => `<p>${notaA}</p>`).join('')}
      <button class="btnnneliminar btnnn" onclick="eliminarLista('${lista.titulo}')"><i class='bx bx-message-square-x'></i>
      </button>
    `;
    listContainer.appendChild(newList);
  });
}

function eliminarLista(titulo) {
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  let indice = listas.findIndex(lista => lista.titulo === titulo);

  if (indice !== -1) {
    listas.splice(indice, 1);
    localStorage.setItem('listas', JSON.stringify(listas));
    location.reload();
  }
}