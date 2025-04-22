module.exports = function (api) {
<<<<<<< HEAD
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
=======
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
      plugins: ["nativewind/babel"],
    };
  };
>>>>>>> 517003294b8693b95218c3339774deb7f918c215
