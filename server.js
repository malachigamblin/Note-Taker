const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));