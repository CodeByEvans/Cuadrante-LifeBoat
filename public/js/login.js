const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button");
// iterar sobre todos los inputs
inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    // Este código obtiene el elemento input actual y lo almacena en la variable currentInput
    // Este código obtiene el siguiente elemento hermano del elemento input actual y lo almacena en la variable nextInput
    // Este código obtiene el elemento hermano anterior del elemento input actual y lo almacena en la variable prevInput
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;
    // si el valor tiene más de un carácter, entonces límpialo
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }
    // si el siguiente input está deshabilitado y el valor actual no está vacío
    // habilita el siguiente input y enfócate en él
    if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }
    // si se presiona la tecla de retroceso (Backspace)
    if (e.key === "Backspace") {
      // iterar sobre todos los inputs nuevamente
      inputs.forEach((input, index2) => {
        // si el índice1 del input actual es menor o igual al índice2 del input en el bucle exterior
        // y el elemento anterior existe, establece el atributo disabled en el input y enfócate en el elemento anterior
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }
    // si el cuarto input (cuyo número de índice es 3) no está vacío y no tiene el atributo disabled entonces
    // añade la clase activo (active) si no, elimina la clase activo (active).
    if (!inputs[3].disabled && inputs[0].value === "1" && inputs[1].value === "9" && inputs[2].value === "3" && inputs[3].value === "4") {
      button.classList.add("active");
      return;
    }
    button.classList.remove("active");
    // desactivar el submit con el boton enter
  });
});
// enfocar el primer input cuyo índice es 0 cuando se carga la ventana
window.addEventListener("load", () => inputs[0].focus());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !button.classList.contains('active')) {
      e.preventDefault();
    }
  });
