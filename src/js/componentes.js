import '../css/components.css'; // Para lograr que webpack reconozca que se esta llamadno un archivo de estilos o css, se debera tomar en cuenta los siguientes paquetes: https://webpack.js.org/loaders/style-loader/ y https://webpack.js.org/loaders/css-loader/
// import webpacklogo from '../assests/img/webpack-logo.png';

export const saludar = (nombre) => {
    console.log('Creando etiqueta h1');
    const h1 = document.createElement('h1');
    h1.innerText = `Hola ${nombre}!!`;
    document.body.append(h1);

    // IMG
    // const img = document.createElement('img');
    // img.src = webpacklogo;
    // document.body.append(img);

}