module.exports = {
    parser: "babel-eslint",
    "rules": {
        "no-unused-vars": "off",
        "indent": [
            2,
            "tab"
        ],
        "quotes": [
            2,
            "single"
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "semi": [
            2,
            "never"
        ]
    },
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended"
};