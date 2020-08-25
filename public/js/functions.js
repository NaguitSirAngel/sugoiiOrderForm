function togg(){
  // wrote 08/17/2020
  if(document.getElementById("idPorkGimbap").checked){
  document.getElementById("idPorkQty").disabled = false;
  document.getElementById("idPorkQty").value = 1;
  }else{
    document.getElementById("idPorkQty").disabled = true;
    document.getElementById("idPorkQty").value = "";
  }

  if(document.getElementById("idVeganGimbap").checked){
    document.getElementById("idVeganQty").disabled = false;
    document.getElementById("idVeganQty").value = 1;
    }else{
      document.getElementById("idVeganQty").disabled = true;
      document.getElementById("idVeganQty").value = "";
    }

    if(document.getElementById("idGimbox").checked){
      document.getElementById("idGimboxQty").disabled = false;
      document.getElementById("idGimboxQty").value = 1;

      document.getElementById("idSelect").disabled = false;


      }else{
        document.getElementById("idGimboxQty").disabled = true;
        document.getElementById("idGimboxQty").value = "";

        document.getElementById("idSelect").disabled = true;
      }


}