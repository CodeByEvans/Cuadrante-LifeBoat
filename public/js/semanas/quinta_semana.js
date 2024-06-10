function getDayName(dateString) {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
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
  
    fifthWeek.forEach((date) => {
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
  
  function getDayName(dateString) {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const date = new Date(dateString);
    const day = date.getDate();
    return `${days[date.getDay()]} ${day}`;
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
  
      fifthWeek.forEach((date) => {
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

  document.addEventListener('DOMContentLoaded', () => {
    // Realizar la solicitud al servidor para obtener datos asociados a las fechas seleccionadas
    const selectedDates = fifthWeek;
    const promises = selectedDates.map(selectedDate => {
        return fetch(`/api/cuadrante/${selectedDate}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data for date', selectedDate, ':', error);
                return {}; // Devuelve un objeto vacío en caso de error para que no afecte el proceso
            });
    });

    Promise.all(promises)
        .then(dataArray => {
            const allVoz4Empty = dataArray.every(data => !data.trumpet || data.trumpet.trim() === "");

            const voz4Header = document.querySelector('.trumpet_header');
            const voz4Bodies = document.querySelectorAll('.trumpet_body');

            if (allVoz4Empty) {
                voz4Header.style.display = 'none';
                voz4Bodies.forEach(body => {
                    body.style.display = 'none'; 
                });
            } else if (innerWidth <= 800) {
                voz4Header.style.display = 'block'; 
                voz4Bodies.forEach(body => {
                    body.style.display = ''; 
                });
            } else {
                voz4Header.style.display = 'table-cell'; 
                voz4Bodies.forEach(body => {
                    body.style.display = ''; 
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    // Realizar la solicitud al servidor para obtener datos asociados a las fechas seleccionadas
    const selectedDates = fifthWeek;
    const promises = selectedDates.map(selectedDate => {
        return fetch(`/api/cuadrante/${selectedDate}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data for date', selectedDate, ':', error);
                return {}; // Devuelve un objeto vacío en caso de error para que no afecte el proceso
            });
    });

    Promise.all(promises)
        .then(dataArray => {
            const allVoz4Empty = dataArray.every(data => !data.acousticGuitar2 || data.acousticGuitar2.trim() === "");

            const voz4Header = document.querySelector('.acousticGuitar2_header');
            const voz4Bodies = document.querySelectorAll('.acousticGuitar2_body');

            if (allVoz4Empty) {
                voz4Header.style.display = 'none';
                voz4Bodies.forEach(body => {
                    body.style.display = 'none'; 
                });
            } else if (innerWidth <= 800) {
                voz4Header.style.display = 'block'; 
                voz4Bodies.forEach(body => {
                    body.style.display = ''; 
                });
            } else {
                voz4Header.style.display = 'table-cell'; 
                voz4Bodies.forEach(body => {
                    body.style.display = ''; 
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    // Realizar la solicitud al servidor para obtener datos asociados a las fechas seleccionadas
    const selectedDates = fifthWeek;
    const promises = selectedDates.map(selectedDate => {
        return fetch(`/api/cuadrante/${selectedDate}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data for date', selectedDate, ':', error);
                return {}; // Devuelve un objeto vacío en caso de error para que no afecte el proceso
            });
    });

    Promise.all(promises)
        .then(dataArray => {
            const allVoz4Empty = dataArray.every(data => !data.electricGuitar2 || data.electricGuitar2.trim() === "");

            const voz4Header = document.querySelector('.electricGuitar2_header');
            const voz4Bodies = document.querySelectorAll('.electricGuitar2_body');

            if (allVoz4Empty) {
                voz4Header.style.display = 'none';
                voz4Bodies.forEach(body => {
                    body.style.display = 'none'; 
                });
            } else if (innerWidth <= 800) {
                voz4Header.style.display = 'block'; 
                voz4Bodies.forEach(body => {
                    body.style.display = ''; 
                });
            } else {
                voz4Header.style.display = 'table-cell'; 
                voz4Bodies.forEach(body => {
                    body.style.display = ''; 
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    // Realizar la solicitud al servidor para obtener datos asociados a las fechas seleccionadas
    const selectedDates = fifthWeek;
    const promises = selectedDates.map(selectedDate => {
        return fetch(`/api/cuadrante/${selectedDate}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data for date', selectedDate, ':', error);
                return {}; // Devuelve un objeto vacío en caso de error para que no afecte el proceso
            });
    });

    Promise.all(promises)
        .then(dataArray => {
            // Verificar si todos los apartados voz4 están vacíos para todas las fechas seleccionadas
            const allVoz4Empty = dataArray.every(data => !data.voz4 || data.voz4.trim() === "");

            // Seleccionar el encabezado con la clase voz4_header
            const voz4Header = document.querySelector('.voz4_header');
            // Selecciona todos los elementos con la clase voz4_body
            const voz4Bodies = document.querySelectorAll('.voz4_body');

            // Si todos los apartados voz4 están vacíos, ocultar el encabezado y los elementos voz4_body
            if (allVoz4Empty) {
                voz4Header.style.display = 'none'; // Ocultar el encabezado
                voz4Bodies.forEach(body => {
                    body.style.display = 'none'; // Ocultar los elementos voz4_body
                });
            } else if (innerWidth <= 800) {
                voz4Header.style.display = 'block'; // Mostrar el encabezado
                voz4Bodies.forEach(body => {
                    body.style.display = ''; // Volver al estilo predeterminado de los elementos voz4_body
                });
            } else {
                voz4Header.style.display = 'table-cell'; // Mostrar el encabezado
                voz4Bodies.forEach(body => {
                    body.style.display = ''; // Volver al estilo predeterminado de los elementos voz4_body
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.addEventListener('DOMContentLoaded', () => {
    // Realizar la solicitud al servidor para obtener datos asociados a las fechas seleccionadas
    const selectedDates = fifthWeek;
    const promises = selectedDates.map(selectedDate => {
        return fetch(`/api/cuadrante/${selectedDate}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data for date', selectedDate, ':', error);
                return {}; // Devuelve un objeto vacío en caso de error para que no afecte el proceso
            });
    });

    Promise.all(promises)
        .then(dataArray => {
            const allSong4Empty = dataArray.every(data => !data.song4 || data.song4.trim() === "");
            const song4Header = document.querySelector('.song4_header');
            const song4Bodies = document.querySelectorAll('.song4_body');

            if (allSong4Empty) {
                song4Header.style.display = 'none'; // Ocultar el encabezado
                song4Bodies.forEach(body => {
                    body.style.display = 'none'; // Ocultar los elementos song4_body
                });
            } else if (innerWidth <= 800) {
                song4Header.style.display = 'block'; // Mostrar el encabezado
                song4Bodies.forEach(body => {
                    body.style.display = ''; // Volver al estilo predeterminado de los elementos song4_body
                });
            } else {
                song4Header.style.display = 'table-cell'; // Mostrar el encabezado
                song4Bodies.forEach(body => {
                    body.style.display = ''; // Volver al estilo predeterminado de los elementos song4_body
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

  