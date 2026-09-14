// server.js - Phusion Passenger + Next.js 16 Standalone belépési pont
// webdude.hu | cPanel deployment entry point
"use strict";

process.env.NODE_ENV = "production";

// Hibakezelés – Passenger log-ba kerülnek
process.on("uncaughtException", function (err) {
  console.error("[webdude server.js] Kezeletlen kivétel:", err.message);
  console.error(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", function (reason) {
  console.error("[webdude server.js] Kezeletlen Promise elutasítás:", reason);
  process.exit(1);
});

var path = require("path");

// A Next.js standalone server abszolút útvonala
// FIGYELEM: require() az __dirname-ből old fel relatív utakat, NEM a CWD-ből!
var standaloneServerPath = path.join(
  __dirname,
  ".next",
  "standalone",
  "server.js",
);

console.log(
  "[webdude server.js] Standalone szerver betöltése:",
  standaloneServerPath,
);
console.log(
  "[webdude server.js] PORT:",
  process.env.PORT || "3000 (alapértelmezett)",
);

require(standaloneServerPath);
