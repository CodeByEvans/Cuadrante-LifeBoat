const selectedDates = secondWeek;
const days = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

function getDayName(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    return `${days[date.getDay()]} ${day}`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Crear el encabezado de la tabla
    const cuadranteDiv = document.getElementById("cuadrante");
    cuadranteDiv.innerHTML = `
      <table class="styled-table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Guitarra Acústica</th>
            <th>Guitarra Eléctrica</th>
            <th>Bajo</th>
            <th>Batería</th>
            <th>Piano</th>
            <th class = "trumpet_header">Trompeta</th>
            <th class = "acousticGuitar2_header">Guitarra Acústica 2</th>
            <th class = "electricGuitar2_header">Guitarra Eléctrica 2</th>
            <th>Dirección</th>
            <th>Director musical</th>
            <th>Voz 1</th>
            <th>Voz 2</th>
            <th>Voz 3</th>
            <th class = "voz4_header">Voz 4</th>
            <th>Canción 1</th>
            <th>Canción 2</th>
            <th>Canción 3</th>
            <th class = "song4_header">Canción 4</th>
          </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
      </table>`;
  
    // Almacena los datos recibidos del servidor en un array
    const fetchedData = [];
  
    // Función para agregar filas de datos a la tabla en el orden correcto
    function addRowsToTable() {
      // Ordena los datos por fecha antes de agregar las filas a la tabla
      fetchedData.sort((a, b) => (a.day > b.day ? 1 : -1));
  
      // Obtén el cuerpo de la tabla
      const tableBody = document.getElementById("tableBody");
  
      // Limpia el contenido existente en el cuerpo de la tabla
      tableBody.innerHTML = "";
  
      // Itera sobre los datos ordenados y agrega las filas a la tabla
      fetchedData.forEach((data) => {
        const dayName = getDayName(data.day);
        tableBody.innerHTML += `
  <tr>
    <td> <p class="day-name">${dayName}</p></td>
    <td>${data.acousticGuitar || ""}</td>
    <td>${data.electricGuitar || ""}</td>
    <td>${data.bass || ""}</td>
    <td>${data.drums || ""}</td>
    <td>${data.piano || ""}</td>
    <td class = "trumpet_body">${data.trumpet || ""}</td>
    <td class = "acousticGuitar2_body">${data.acousticGuitar2 || ""}</td>
    <td class = "electricGuitar2_body">${data.electricGuitar2 || ""}</td>
    <td>${data.direccion || ""}</td>
    <td>${data.director || ""}</td>
    <td>${data.voz1 || ""}</td>
    <td>${data.voz2 || ""}</td>
    <td>${data.voz3 || ""}</td>
    <td class ="voz4_body">${data.voz4 || ""}</td>
    <td>${data.song1 || ""}</td>
    <td>${data.song2 || ""}</td>
    <td>${data.song3 || ""}</td>
    <td class ="song4_body">${data.song4 || ""}</td>
  </tr>`;
      });
    }
  
    selectedDates.forEach((date) => {
        fetch(`/api/cuadrante/${date}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("No hay datos para esta fecha");
            }
            return response.json();
          })
          .then((data) => {
            // Verificar si los datos son válidos antes de agregarlos
            if (Object.keys(data).length > 0) {
              fetchedData.push(data);
              addRowsToTable(); // Llama a esta función cada vez que se recibe un nuevo conjunto de datos
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
  });
  
  function actualizarColumnas(numDias) {
    // Genera el estilo CSS para el número de columnas especificado
    const style = document.getElementById("dynamic-styles");
    let css = ".styled-table tbody { display: grid; grid-template-columns: ";
    for (let i = 0; i < numDias; i++) {
      css += "1fr ";
    }
    css += "; }";
    style.textContent = css;
  }
  
  
  document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth <= 800) {
      let totalDias = -1;
  
      // Almacena los datos recibidos del servidor en un array
      const fetchedData = [];
  
      // Función para agregar filas de datos a la tabla en el orden correcto
      function addRowsToTable() {
        // Ordena los datos por fecha antes de agregar las filas a la tabla
        fetchedData.sort((a, b) => (a.day > b.day ? 1 : -1));
  
        // Obtén el cuerpo de la tabla
        const tableBody = document.getElementById("tableBody");
  
        // Limpia el contenido existente en el cuerpo de la tabla
        tableBody.innerHTML = "";
  
        // Itera sobre los datos ordenados y agrega las filas a la tabla
        fetchedData.forEach((data) => {
          const dayName = getDayName(data.day);
          tableBody.innerHTML += `
              <tr>
                <td class="day-name-mobile">${dayName}</td>
                <td>${data.acousticGuitar || ""}</td>
                <td>${data.electricGuitar || ""}</td>
                <td>${data.bass || ""}</td>
                <td>${data.drums || ""}</td>
                <td>${data.piano || ""}</td>
                <td class="trumpet_body">${data.trumpet || ""}</td>
                <td class="acousticGuitar2_body">${data.acousticGuitar2 || ""}</td>
                <td class="electricGuitar2_body">${data.electricGuitar2 || ""}</td>
                <td>${data.direccion || ""}</td>
                <td>${data.director || ""}</td>
                <td>${data.voz1 || ""}</td>
                <td>${data.voz2 || ""}</td>
                <td>${data.voz3 || ""}</td>
                <td class="voz4_body">${data.voz4 || ""}</td>
                <td>${data.song1 || ""}</td>
                <td>${data.song2 || ""}</td>
                <td>${data.song3 || ""}</td>
                <td class="song4_body">${data.song4 || ""}</td>
              </tr>`;
          totalDias++;
        });
  
        // Llama a esta función para actualizar las columnas con el número total de días
        actualizarColumnas(totalDias);
      }
  
      selectedDates.forEach((date) => {
        fetch(`/api/cuadrante/${date}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("No hay datos para esta fecha");
            }
            return response.json();
          })
          .then((data) => {
            // Verificar si los datos son válidos antes de agregarlos
            if (Object.keys(data).length > 0) {
              fetchedData.push(data);
              addRowsToTable(); // Llama a esta función cada vez que se recibe un nuevo conjunto de datos
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  });

  // Función para obtener los datos asociados a las fechas seleccionadas
function fetchDataForDates(selectedDates) {
  return Promise.all(selectedDates.map(selectedDate => {
      return fetch(`/api/cuadrante/${selectedDate}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error("No hay datos para esta fecha");
              }
              return response.json();
          })
          .catch(error => {
              console.error('Error fetching data for date', selectedDate, ':', error);
              return {}; // Devuelve un objeto vacío en caso de error para que no afecte el proceso
          });
  }));
}
  
document.addEventListener('DOMContentLoaded', () => {
  // Realizar la solicitud al servidor para obtener datos asociados a las fechas seleccionadas
  fetchDataForDates(selectedDates)
      .then(dataArray => {
          // Función para verificar si todos los elementos de un tipo están vacíos
          const checkAllEmpty = (className, dataKey) => {
              return dataArray.every(data => !data[dataKey] || data[dataKey].trim() === "");
          };

          // Función para mostrar u ocultar los elementos basado en la ventana interna y la vacuidad de los datos
          const toggleElements = (className, dataKey) => {
              const header = document.querySelector(`.${className}_header`);
              const bodies = document.querySelectorAll(`.${className}_body`);

              if (checkAllEmpty(className, dataKey)) {
                  header.style.display = 'none';
                  bodies.forEach(body => {
                      body.style.display = 'none';
                  });
              } else if (innerWidth <= 800) {
                  header.style.display = 'block';
                  bodies.forEach(body => {
                      body.style.display = '';
                  });
              } else {
                  header.style.display = 'table-cell';
                  bodies.forEach(body => {
                      body.style.display = '';
                  });
              }
          };

          // Llamar a la función para mostrar/u ocultar los elementos .trumpet
          toggleElements('trumpet', 'trumpet');

          // Llamar a la función para mostrar/u ocultar los elementos .acousticGuitar2
          toggleElements('acousticGuitar2', 'acousticGuitar2');

          // Llamar a la función para mostrar/u ocultar los elementos .electricGuitar2
          toggleElements('electricGuitar2', 'electricGuitar2');

          // Llamar a la función para mostrar/u ocultar los elementos .voz4
          toggleElements('voz4', 'voz4');

          // Llamar a la función para mostrar/u ocultar los elementos .song4
          toggleElements('song4', 'song4');
      })
      .catch(error => {
          console.error('Error:', error);
      });
});