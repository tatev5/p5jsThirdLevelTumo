var socket = io();

var side = 50;

function setup() {
    frameRate(5);
    createCanvas(15 * side, 15 * side);
}

function preload() {
    human = loadImage("https://www.graphicsfactory.com/clip-art/image_files/image/7/1680217-man-laughing-at-his-phone-vector-clipart.jpg");
    corona = loadImage('https://thumbs.dreamstime.com/b/coronavirus-evil-virus-cartoon-character-face-mask-against-covid-vector-illustration-isolated-white-coronavirus-covid-evil-175340881.jpg')
    doc = loadImage('https://thumbs.dreamstime.com/b/cartoon-doctor-fighting-big-green-virus-cure-coronavirus-fight-covid-concept-flat-vector-illustration-corona-isolated-white-177241588.jpg')
    hospital = loadImage('https://c8.alamy.com/comp/2BAPCT4/medical-character-vector-concept-design-doctor-and-nurse-characters-monitoring-giving-treatment-and-medicine-to-corona-virus-infected-patient-2BAPCT4.jpg')
    healthy = loadImage('https://thumbs.dreamstime.com/b/recovered-185475535.jpg');
    bed=loadImage('https://thumbs.dreamstime.com/b/hospital-bed-white-background-illustration-176792828.jpg')
}


function nkarel(matrix) {
    console.log(matrix)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            let obj=matrix[y][x]
            if ( obj== 1) {
                fill(0, 0, 0);
                image(bed, x * side, y * side, side, side);
            } else if (obj == 0) {
                fill(0, 0, 0);
                image(human, x * side, y * side, side, side);
            } else if (obj == 2) {
                fill(0, 0, 0);
                image(corona, x * side, y * side, side, side);
            } else if (obj== 8) {
                fill(0, 0, 0);
                image(doc, x * side, y * side, side, side);
            } else if (obj == 7) {
                fill(0, 0, 0);
                image(hospital, x * side, y * side, side, side);
            } else if (obj== 5) {
                fill(0, 0, 0);
                image(healthy, x * side, y * side, side, side);
            }


        }
    }

}
setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)


function kill() {
    socket.emit("kill")
}