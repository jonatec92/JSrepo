var prom = 0

function promedio(nota1, nota2, nota3) {

    prom = (nota1 + nota2 + nota3) / 3;

    return prom;
    
}
    
alert( "Este sistema devuelve el promedio de 3 notas, para saber su promedio porfavor continue..");
let nota1 = parseInt(prompt ("Ingrese la primer nota"));
let nota2 = parseInt(prompt ("Ingrese la segunda nota"));
let nota3 = parseInt(prompt ("Ingrese la tercer nota"));

promedio(nota1, nota2, nota3);

alert("Su promedio es de " + prom)



