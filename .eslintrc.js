module.exports = {
    'env': {
        'browser': true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
      'max-len': 'off',
      "jsx-a11y/anchor-is-valid": ["error", {
        "components": ["Link"],
        "specialLink": ["to", "hrefLeft", "hrefRight"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }],
      "jsx-a11y/label-has-for": [ 2, {
        "components": [ "Label" ],
        "required": {
          "every": [ "nesting", "id" ]
        },
        "allowChildren": true
      }],
      "jsx-a11y/alt-text": "off",
      "arrow-parens": [2, "as-needed"],
      // NOTE: I am allowing log here but really should not.
      // I don't want to focus on them right now though
      "no-console": [ "error", { allow: ["warn","error","log"]}],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    }
};
