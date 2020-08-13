module.exports = {
    toggleOne: function togglePorkQty() {
        if(document.getElementsByName("porkGimbap")){
            document.getElementsByName("porkQty").disabled = false;
        }else{
          document.getElementsByName("porkQty").disabled = true;
        }
      },
      toggleTwo: function togglePorkQty() {
        if(document.getElementsByName("porkGimbap")){
            document.getElementsByName("porkQty").disabled = false;
        }else{
          document.getElementsByName("porkQty").disabled = true;
        }
      },
}