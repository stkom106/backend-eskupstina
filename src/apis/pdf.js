const express = require("express");
const azure = require("azure-storage");
const fs = require("fs");
const controllers = require("../controllers");

const azureStorageConnectionString =
  process.env.AZURE_STORAGE_ACCOUNT_STORAGE_STRING;
const blobService = azure.createBlobService(azureStorageConnectionString);

const get_pdf_blob = async (req, res, next) => {
  try {
    const agendaId = req.query.agenda;
    if (!agendaId) {
      res.status(400).json({ error: "agenda parameter is missing" });
      return;
    }
    const agenda = await controllers.Agenda.findOne({ filter: agendaId });

    const containerName = "mainpdf";
    const blobName = agenda.pdf_path;

    blobService.getBlobToStream(containerName, blobName, res, (err) => {
      if (err) {
        console.error("Error fetching blob:", err);
        res.status(500).send("Error fetching blob");
      }
    });
  } catch (error) {
    console.error("Error fetching PDF blob:", error);
    res.status(500).send("Error fetching PDF blob");
  }
};

module.exports = { get_pdf_blob };
