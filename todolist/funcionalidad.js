let menu = document.querySelector('.menu');
let btn = document.querySelector('.menu-btn');

btn.addEventListener('click', () => {
  menu.classList.toggle('activo');
});

function btnAñdir(){
  document.querySelector('#subMenu').innerHTML = `
  <div class="Sub-añadir">
  <label for="Lista">Titulo de su lista</label>
  <input type="text" id="Lista">

  <div class="Notas">
      <label for="Notas">Nota 1</label>
      <input type="text" id="mianNota">

      <button class="añadirNota" onclick="añadirNota()">Añadir</button>

          <div class="notas-añadidas" style="display: none;">
          
          </div>
      
  </div>
  <button class="guardar" type="submit" onclick="GuardarNota()">Crear</button>
  <button class="eliminar" onclick="CancelarList()">Cancelar</button>
</div>`
}

var contadorNotas = 1;

function añadirNota() {
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
    <button class="btnnneditar btnnn" onclick="editarLista('${titulo}')"><i class='bx bx-message-square-edit'></i>
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
      <button class="btnnneditar btnnn" onclick="editarLista('${lista.titulo}')"><i class='bx bx-message-square-edit'></i>
    `;
    listContainer.appendChild(newList);
  });
}

btn.addEventListener('click', () => {
  Eliminar();
  function Eliminar(){
    let btnEl = document.getElementById('BBtnEliminar');
    let botonEliminar = document.querySelectorAll('.btnnneliminar');
  
    btnEl.addEventListener('click', () => {
        botonEliminar.forEach((boton) => {
            boton.classList.toggle('activo');
        });
    });
  }
});

document.addEventListener('click', () => {
  Editar();
  function Editar(){
    let btnEd = document.getElementById('BBtnEditar');
    let botonEditar = document.querySelectorAll('.btnnneditar');
  
    btnEd.addEventListener('click', () => {
        botonEditar.forEach((boton) => {
            boton.classList.toggle('activo');
        });
    });
  }
});

//para que el btn de eliminar funcione cuando el menu esta cerrado
function Eliminar(){
  let btnEl = document.getElementById('BBtnEliminar');
  let botonesEliminar = document.querySelectorAll('.btnnneliminar');

  btnEl.addEventListener('click', () => {
      botonesEliminar.forEach((boton) => {
          boton.classList.toggle('activo');
      });
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

function editarLista(titulo) {
  let listas = JSON.parse(localStorage.getItem('listas')) || [];
  let indice = listas.findIndex(lista => lista.titulo === titulo);
  let lista = listas[indice];

  document.querySelector('#subMenu').innerHTML = `
  <div class="Sub-añadir">
  <label for="Lista">Titulo de su lista</label>
  <input type="text" id="Lista" value="${lista.titulo}">
  <div class="Notas">
      <label for="Notas">Nota 1</label>
      <input type="text" id="mianNota" value="${lista.nota}">
      <button class="añadirNota" onclick="añadirNota()">Añadir</button>
          <div class="notas-añadidas" style="display: block;">
          ${lista.notaAñadida.map(notaA => `
            <label for="Notas">${notaA}</label>
            <input type="text" value="${notaA}">
          `).join('')}
          </div>
  </div>
  <button class="guardar" type="submit" onclick="GuardarNotaEditada('${titulo}')">Editar</button>
  <button class="eliminar" onclick="CancelarList()">Cancelar</button>
</div>`

}