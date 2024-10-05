const selectedDates = Octubre;
let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
  dom: '<"top"fi>rt<"bottom"lp>',
  responsive: true,
  autoWidth: false,
  language: {
    search: "",
    searchPlaceholder: "Buscar..."
  },
  paging: false,
  pagingType: "simple",
  info: false,
  ordering: false,
  columnDefs: [
    { width: "100%", targets: '_all' },
  ],
  }


async function initDataTable(){
  if (dataTableIsInitialized) {
    dataTable.destroy();
  }

  await listTable();

  dataTable = $('#dataTable').DataTable(dataTableOptions);

  dataTableIsInitialized = true;

  console.log(dataTable);
  console.log(dataTableIsInitialized);
}

async function listTable() {
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
    const dayName = `${data.nombre_dia} ${data.dia}` 
    let classDay = "";

    if (dayName.includes("Jueves")) {
      classDay = "jueves";
    } else if (dayName.includes("Sábado")) {
      classDay = "sabado";
    } else if (dayName.includes("Domingo")) {
      classDay = "domingo";
    }
    tableBody.innerHTML += `
      <tr>
        <td> <span class="${classDay}">${dayName}</td>
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

window.addEventListener('load', async () => {
  await initDataTable();
});

