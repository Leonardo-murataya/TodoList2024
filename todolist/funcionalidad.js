let btn = document.querySelector('.menu-btn');
let maximoNotas = 5;
var contadorNotas = 1;

// Función para mostrar el menú de añadir lista
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

// Función para añadir una nota
function añadirNota() {
  if (contadorNotas >= maximoNotas) {
    alert("No puedes añadir más notas");
    return;
  }
  var notasAñadidas = document.querySelector('.notas-añadidas');
  notasAñadidas.innerHTML += `
    <label for="Notas">Nota ${++contadorNotas}</label>
    <input type="text">
  `;
  notasAñadidas.style.display = "block";
}

// Función para cancelar la lista
function CancelarList(){
  document.querySelector('#subMenu').innerHTML = '';
}

// Función para guardar la lista
function GuardarNota(){
  let titulo = document.querySelector('#Lista').value;
  let nota = document.querySelector('#mianNota').value;
  let notasA = document.querySelectorAll('.notas-añadidas input'); 

  let lista = {
    titulo: titulo,
    nota: nota,
    notaAñadida: [] 
  }

  // Validación de los campos de la lista de que no estén vacíos
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

  // Guarda la lista en el localStorage
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  listas.push(lista);
  localStorage.setItem('listas', JSON.stringify(listas));
  CancelarList();

  //
  let listContainer = document.querySelector('.Tareas');
  let newList = document.createElement('div');
    newList.classList.add('lista');
    newList.innerHTML = `
    <h3>${titulo}</h3>
    <p>${nota}</p>
    ${lista.notaAñadida.map(notaA => `<p>${notaA}</p>`).join('')}
    <button class="btnnneliminar btnnn" onclick="eliminarLista('${titulo}')"><i class='bx bx-message-square-x'></i></button>
    <button class="btnnneditar btnnn" onclick="editarLista('${lista.titulo}')"><i class='bx bx-message-square-edit'></i></button>
    <button class="btnnnexpandir btnnn" onclick="expandirContenedores('${lista.titulo}')"><i class='bx bx-expand-alt'></i></button>
  `;
  listContainer.appendChild(newList);
}

// Función para cargar las listas guardadas en el localStorage
window.onload = function() {
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  let listContainer = document.querySelector('.Tareas');

  listas.forEach((lista, index) => {
    let newList = document.createElement('div');
    newList.classList.add('lista');
    newList.innerHTML = `
      <h3>${lista.titulo}</h3>
      <p>${lista.nota}</p>
      ${lista.notaAñadida.map(notaA => `<p>${notaA}</p>`).join('')}
      <button class="btnnneliminar btnnn" onclick="eliminarLista('${lista.titulo}')"><i class='bx bx-message-square-x'></i></button>
      <button class="btnnneditar btnnn" onclick="editarLista('${lista.titulo}')"><i class='bx bx-message-square-edit'></i></button>
      <button id="btnExpandir${index}" class="btnnnexpandir btnnn"><i class='bx bx-expand-alt'></i></button>
    `;
    listContainer.appendChild(newList);

    // Configura el controlador de eventos para el botón de expansión
    document.getElementById(`btnExpandir${index}`).addEventListener('click', expandirContenedor);
  });
}

// Función para eliminar una lista
function eliminarLista(titulo) {
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  let indice = listas.findIndex(lista => lista.titulo === titulo);

  if (indice !== -1) {
    listas.splice(indice, 1);
    localStorage.setItem('listas', JSON.stringify(listas));
    location.reload();
  }
}
  // Función para editar una lista
function editarLista(titulo){
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  let indice = listas.findIndex(lista => lista.titulo === titulo);
  let lista = listas[indice];

  // Actualiza el contador de notas con la cantidad de notas existentes
  contadorNotas = lista.notaAñadida.length + 1;
  
  document.querySelector('#subMenu').innerHTML = `
  <div class="Sub-añadir">
  <label for="Lista">Titulo de su lista</label>
  <input type="text" id="Lista" value="${lista.titulo}" required>

  <div class="Notas">
      <label for="Notas">Nota 1</label>
      <input type="text" id="mianNota" value="${lista.nota}" required>

      <button class="añadirNota" onclick="añadirNota()">Añadir</button>

          <div class="notas-añadidas">
          ${lista.notaAñadida.map((notaA, index) => `
            <label for="Notas">Nota ${index + 2}</label> // Start from 2
            <input type="text" value="${notaA}">
          `).join('')}
          </div>

  </div>
  <button class="guardar" type="submit" onclick="GuardarEdit()">Guardar</button>
  <button class="eliminar" onclick="CancelarList()">Cancelar</button>
</div>`
}

// Función para guardar la lista editada y actualizarla en el localStorage
function GuardarEdit() {
  let titulo = document.querySelector('#Lista').value;
  let nota = document.querySelector('#mianNota').value;
  let notasA = document.querySelectorAll('.notas-añadidas input');

  let lista = {
    titulo: titulo,
    nota: nota,
    notaAñadida: []
  }

  // Validación de los campos de la lista de que no estén vacíos
  // En proceso por mejorar para que no se pueda guardar si no hay notas o si no hay título
  // Y si eliminina una nota, que se actualice el contador de notas elimine el campo y se refleje en el contador de notas
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

  // Actualiza la lista en el localStorage
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
  eliminarLista(titulo);
}

// Función para expandir los contenedores de las listas
function expandirContenedor() {
  // Encuentra el css más cercano con la clase 'lista' o 'expandido'
  let contenedor = this.closest('.lista, .expandido');

  // Cambia entre la clase 'lista' y 'expandido'
  contenedor.classList.toggle('lista');
  contenedor.classList.toggle('expandido');

  // Cambia el icono del botón de expansión a 'bx-collapse-alt' o 'bx-expand-alt' cuando se expande o contrae
  this.innerHTML = contenedor.classList.contains('expandido') ? '<i class="bx bx-collapse-alt"></i>' : '<i class="bx bx-expand-alt"></i>';
}
