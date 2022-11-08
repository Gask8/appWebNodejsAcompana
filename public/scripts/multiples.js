var indexC = 0;
var x = document.querySelectorAll(".nonact");
var atr = document.querySelector("#atr");
var adl = document.querySelector("#adl");
var falt = 0;

function agregarHorario(){
	
	var cantidad = $('#horariosCantidad').val();
  	var inputs = $('#multiples').empty();
  	for(i = 0; i < cantidad; i++) {
    	inputs.append('<div class="form-group"><label for="horaComienzo">Hora Comienzo:</label><input type="time" class="form-control" id="horaComienzo" name="hora_comienzo' + i + '"></div><div class="form-group"><label for="horaTermino">Hora término:</label><input type="time" class="form-control" id="horaTermino" name="hora_termino' + i + '"></div><div class="form-group"><label for="diaSemana">Dia de la semana:</label><select name="dia_semana' + i + '" id="diaSemana" class="form-control"><option disabled selected value> -- Elije un Día -- </option><option value="lunes"> Lunes </option><option value="martes"> Martes </option><option value="miercoles"> Miercoles </option><option value="jueves"> Jueves </option><option value="viernes"> Viernes </option><option value="sabado"> Sabado </option><option value="domingo"> Domingo </option></select></div>');
  	}
	
}
