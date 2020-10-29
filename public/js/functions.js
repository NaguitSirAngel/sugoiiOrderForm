function toggPork() {
  // wrote 08/17/2020
  if (document.getElementById("idPorkGimbap").checked) {
    document.getElementById("idPorkQty").disabled = false;
    document.getElementById("idPorkQty").value = 1;
  } else {
    document.getElementById("idPorkQty").disabled = true;
    document.getElementById("idPorkQty").value = "";
  }
}

function toggVegan() {
  if (document.getElementById("idVeganGimbap").checked) {
    document.getElementById("idVeganQty").disabled = false;
    document.getElementById("idVeganQty").value = 1;
  } else {
    document.getElementById("idVeganQty").disabled = true;
    document.getElementById("idVeganQty").value = "";
  }
}

function toggBulgogi() {
  if (document.getElementById("idBulgogiGimbap").checked) {
    document.getElementById("idBulgogiQty").disabled = false;
    document.getElementById("idBulgogiQty").value = 1;
  } else {
    document.getElementById("idBulgogiQty").disabled = true;
    document.getElementById("idBulgogiQty").value = "";
  }
}

function toggSpam() {
  if (document.getElementById("idSpamGimbap").checked) {
    document.getElementById("idSpamQty").disabled = false;
    document.getElementById("idSpamQty").value = 1;
  } else {
    document.getElementById("idSpamQty").disabled = true;
    document.getElementById("idSpamQty").value = "";
  }
}

function toggGimbox40() {
  if (document.getElementById("idGimbox40").checked) {
    document.getElementById("idGimboxQty40").disabled = false;
    document.getElementById("idGimboxQty40").value = 1;

    document.getElementById("idSelect40").disabled = false;
  } else {
    document.getElementById("idGimboxQty40").disabled = true;
    document.getElementById("idGimboxQty40").value = "";

    document.getElementById("idSelect40").disabled = true;
  }
}

function toggGimbox80() {
  if (document.getElementById("idGimbox80").checked) {
    document.getElementById("idGimboxQty80").disabled = false;
    document.getElementById("idGimboxQty80").value = 1;

    document.getElementById("idSelect80").disabled = false;
  } else {
    document.getElementById("idGimboxQty80").disabled = true;
    document.getElementById("idGimboxQty80").value = "";

    document.getElementById("idSelect80").disabled = true;
  }
}
