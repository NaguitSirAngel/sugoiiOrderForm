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

    if(document.getElementById("idGimbox40").checked){
      document.getElementById("idGimboxQty40").disabled = false;
      document.getElementById("idGimboxQty40").value = 1;

      document.getElementById("idSelect40").disabled = false;


      }else{
        document.getElementById("idGimboxQty40").disabled = true;
        document.getElementById("idGimboxQty40").value = "";

        document.getElementById("idSelect40").disabled = true;
      }

      if(document.getElementById("idGimbox80").checked){
        document.getElementById("idGimboxQty80").disabled = false;
        document.getElementById("idGimboxQty80").value = 1;
  
        document.getElementById("idSelect80").disabled = false;
  
  
        }else{
          document.getElementById("idGimboxQty80").disabled = true;
          document.getElementById("idGimboxQty80").value = "";
  
          document.getElementById("idSelect80").disabled = true;
        }


}