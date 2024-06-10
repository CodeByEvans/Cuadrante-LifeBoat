const pin = "5656";

document.getElementById("Pin").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        return false;
    }
});

document.getElementById("Pin").addEventListener("input", function(){
    let input = this.value;
    if (input.length === 4) {
        checkPin();
    }
})

function checkPin() {
    let input = document.getElementById("Pin").value;
    if (input === pin) {
        window.location.href = "/gestion";
    } else {
        document.getElementById("Pin").value = "";
        document.getElementById("pin_incorrecto").textContent = "Pin incorrecto";
        document.getElementById("pin_incorrecto").style.display = "block";
        setTimeout(() => {
            // Oculta el mensaje después de 3 segundos
            document.getElementById('pin_incorrecto').style.display = 'none';
          }, 1000);
    }
}