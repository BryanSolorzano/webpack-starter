const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true //Limpia todo dentro de la carpeta dist y lo vuelve a crear
    },

    module: {
        rules: [
            // Esta es la regla para la parte del html o pagina principal
            {
                // Expresiones regulares
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }

            },
            // Ahora esta ocnfiguración es necesaria para cargan archivos de estilos o css
            // Aquí se evalua todos los archivos con extensión css
            {
                test: /\.css$/,
                exclude: /style.css$/, // Sin esta exclude no podremos evaluar un archivo css despues, puesto que en este bloque se los esta evaluando todos 
                use: ['style-loader', 'css-loader']
            },
            // Es necesario instalar una nueva dependencia: https://webpack.js.org/plugins/mini-css-extract-plugin/
            {
                // Evaluar un archivo especificametne 
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], // Lo ultimo es para que lo pueda cargar
            },
            // Lo siguiente sera necesario para cargar una imagen, e incluso poder moverla entre directorios: https://v4.webpack.js.org/loaders/file-loader/
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            title: 'Mi webpack App', //Tan poderososson estas confiuraciones que hasta podemos cambiar el titulo de la app
            filename: 'index.html', //Se pude cambiar el nombre de salida del archivo, aquí es importante el output para que me borre aquellos archivos viejos
            template: './src/index.html', //Archivo de cual se quiere que tome como referencia -> Con esto toods los elementos creados o codigo JS llmado en ese archivo pasara al direcotiro disc para ser puesto en distribución 
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css', // Se hace el fullhash (me pondra una combinación de caracteres distintos cada vez que haga un npm run build) hara que los navegadores de los usuarios no guarden en cache ese archivo 
            ignoreOrder: false
        }),
        // Para copiar y mover recursos: https://webpack.js.org/plugins/copy-webpack-plugin/
        new CopyPlugin({ // COnfiguración necesaria para agregar archivos estaticos a nuestra carpeta dist
            patterns: [
                { from: 'src/assests/', to: 'assets/' },
            ]
        }),
    ]
};
