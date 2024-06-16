const selectedDates = firstWeek;

document.addEventListener("DOMContentLoaded", async () => {
  await createTableHeader();
  await fetchDataAndAddRows();
  await hideEmptySections();
});

async function createTableHeader() {
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
          <th class="trumpet_header">Trompeta</th>
          <th class="acousticGuitar2_header">Guitarra Acústica 2</th>
          <th class="electricGuitar2_header">Guitarra Eléctrica 2</th>
          <th>Dirección</th>
          <th>Director musical</th>
          <th>Voz 1</th>
          <th>Voz 2</th>
          <th>Voz 3</th>
          <th class="voz4_header">Voz 4</th>
          <th>Canción 1</th>
          <th>Canción 2</th>
          <th>Canción 3</th>
          <th class="song4_header">Canción 4</th>
        </tr>
      </thead>
      <tbody id="tableBody">
      </tbody>
    </table>`;
}

async function fetchDataAndAddRows() {
  const fetchedData = [];
  await Promise.all(selectedDates.map(async (date) => {
    try {
      const response = await fetch(`/api/cuadrante/${date}`);
      if (!response.ok) {
        throw new Error("No hay datos para esta fecha");
      }
      const data = await response.json();
      if (Object.keys(data).length > 0) {
        fetchedData.push(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }));

  fetchedData.sort((a, b) => parseInt(a.dia) - parseInt(b.dia));
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  fetchedData.forEach((data) => {
    const dayName = `${data.nombre_dia} ${data.dia}`;
    tableBody.innerHTML += `
      <tr>
        <td class="day-name">${dayName}</td>
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
  });
}

async function fetchDataForDates(selectedDates) {
  return Promise.all(selectedDates.map(async (selectedDate) => {
    try {
      const response = await fetch(`/api/cuadrante/${selectedDate}`);
      if (!response.ok) {
        throw new Error("No hay datos para esta fecha");
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data for date', selectedDate, ':', error);
      return {};
    }
  }));
}
async function hideEmptySections() {
  const dataArray = await fetchDataForDates(selectedDates);

  const checkAllEmpty = (className, dataKey) => {
    return dataArray.every(data => !data[dataKey] || data[dataKey].trim() === "");
  };

  const toggleElements = (className, dataKey) => {
    const header = document.querySelector(`.${className}_header`);
    const bodies = document.querySelectorAll(`.${className}_body`);

    if (checkAllEmpty(className, dataKey)) {
      header.style.display = 'none';
      bodies.forEach(body => {
        body.style.display = 'none';
      });
    } else if (window.innerWidth <= 800) {
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

  toggleElements('trumpet', 'trumpet');
  toggleElements('acousticGuitar2', 'acousticGuitar2');
  toggleElements('electricGuitar2', 'electricGuitar2');
  toggleElements('voz4', 'voz4');
  toggleElements('song4', 'song4');
}
