module.exports = {
    presets:[
        "@babel/preset-env", //transforma tudo que é novo em velho de js
        "@babel/preset-react", ////transforma tudo que é novo em velho de jsx
    ],
    plugins:[
        "@babel/plugin-proposal-class-properties"
    ]
};